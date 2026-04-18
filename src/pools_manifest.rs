//! Canonical pool manifest loader for Rust Adrena offchain services
//! (MrSablier, MrSablierStaking, any future consumers).
//!
//! The manifest itself ships embedded at compile time via `include_str!`
//! (see `POOLS_MANIFEST_JSON` in `feed_maps.rs`). Consumers read the
//! embedded default at startup; an operator may override with a disk file
//! via the standard `--manifest-path` CLI flag on each service.
//!
//! Every consumer should pin `adrena-abi` at the commit that carries both
//! the on-chain state changes and the manifest it expects. Drift between
//! the embedded manifest and any override is visible via the service's
//! startup banner (both should print matching pool names + feed IDs).
//!
//! Responsibilities split:
//!   * `PoolsManifestFile` / `PoolManifestEntry` — raw deserialized JSON.
//!     Pubkey fields stay as `String` to keep the JSON contract
//!     pubkey-validation-free. Services that need typed pubkeys pay the
//!     parse cost once via `validate_and_build_pool_context`.
//!   * `PoolContext` — service-facing fully-resolved runtime context
//!     (typed pubkeys + derived PDAs + on-chain Pool snapshot). Built
//!     AFTER on-chain state is fetched, because we also cross-validate
//!     manifest claims against the deployed Pool account.
//!   * Resolver helpers (e.g. `resolve_lp_staking_pool`) live here so
//!     every service uses the same logic — MrSablier and MrSablierStaking
//!     both need LP-staking pool resolution.

use {
    crate::{feed_maps::POOLS_MANIFEST_JSON, pda, types::Pool},
    anyhow::{anyhow, Context},
    serde::Deserialize,
    solana_program::pubkey::Pubkey,
    std::{collections::HashMap, fs, str::FromStr},
};

// ─── Manifest JSON schema ────────────────────────────────────────────────────

#[derive(Debug, Clone, Deserialize)]
pub struct PoolsManifestFile {
    pub pools: Vec<PoolManifestEntry>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct PoolManifestEntry {
    pub name: String,
    #[serde(rename = "type")]
    pub pool_type: String, // "gmx" | "autonom"
    #[serde(rename = "oracleProviders")]
    pub oracle_providers: Vec<String>,
    pub custodies: Vec<String>, // pubkey strings
    #[serde(rename = "syntheticCustodies")]
    pub synthetic_custodies: Vec<String>, // pubkey strings
    #[serde(rename = "lpMint")]
    pub lp_mint: String, // pubkey string (may be "" pre-deploy)
    #[serde(rename = "feedIds", default)]
    pub feed_ids: Vec<u8>,
    pub automation: AutomationFlags,
}

#[derive(Debug, Clone, Deserialize)]
pub struct AutomationFlags {
    pub liquidations: bool,
    #[serde(rename = "slTp")]
    pub sl_tp: bool,
    #[serde(rename = "limitOrders")]
    pub limit_orders: bool,
    #[serde(rename = "marketOpening")]
    pub market_opening: bool,
    #[serde(rename = "distributeFees")]
    pub distribute_fees: bool,
    #[serde(rename = "resolveStakingRound")]
    pub resolve_staking_round: bool,
}

// ─── Resolved runtime context ────────────────────────────────────────────────

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum PoolType {
    Gmx,
    Autonom,
}

/// Per-pool runtime context, resolved from manifest + on-chain state.
#[derive(Debug, Clone)]
pub struct PoolContext {
    pub name: String,
    pub pubkey: Pubkey,
    pub pool_type: PoolType,
    pub pool: Pool,
    pub lp_mint: Pubkey,
    pub genesis_lock: Pubkey,
    pub custodies: Vec<Pubkey>,
    pub synthetic_custodies: Vec<Pubkey>,
    /// custodies followed by synthetic_custodies — the exact order every
    /// adrena ix expects in `remaining_accounts` for pool-wide operations.
    pub all_custodies_ordered: Vec<Pubkey>,
    pub feed_ids: Vec<u8>,
    pub automation: AutomationFlags,
}

pub type PoolMap = HashMap<Pubkey, PoolContext>;

// ─── Loaders ─────────────────────────────────────────────────────────────────

/// Returns the adrena-abi-embedded default manifest. This is what every
/// service gets at startup when no `--manifest-path` override is provided.
pub fn load_embedded_pools_manifest() -> anyhow::Result<PoolsManifestFile> {
    parse_and_validate(POOLS_MANIFEST_JSON, "<embedded adrena-abi>")
}

/// Reads + validates an override manifest from disk. Use only when the
/// operator explicitly passes `--manifest-path`.
pub fn load_pools_manifest(path: &str) -> anyhow::Result<PoolsManifestFile> {
    let raw = fs::read_to_string(path)
        .with_context(|| format!("read pools manifest from `{path}`"))?;
    parse_and_validate(&raw, path)
}

/// Preferred startup entrypoint for services with a `--manifest-path` flag.
/// Returns the embedded default unless `override_path` is `Some(non-empty)`.
pub fn load_pools_manifest_with_override(
    override_path: Option<&str>,
) -> anyhow::Result<PoolsManifestFile> {
    match override_path {
        Some(p) if !p.is_empty() => load_pools_manifest(p),
        _ => load_embedded_pools_manifest(),
    }
}

fn parse_and_validate(raw: &str, source: &str) -> anyhow::Result<PoolsManifestFile> {
    let manifest: PoolsManifestFile = serde_json::from_str(raw)
        .with_context(|| format!("parse pools manifest at `{source}`"))?;

    if manifest.pools.is_empty() {
        return Err(anyhow!(
            "pools manifest at `{source}` has no pools — refusing to boot"
        ));
    }

    let mut names = std::collections::HashSet::new();
    for entry in &manifest.pools {
        if entry.name.is_empty() {
            return Err(anyhow!("pools manifest entry has empty name"));
        }
        if !names.insert(&entry.name) {
            return Err(anyhow!(
                "duplicate pool name `{}` in {source}",
                entry.name
            ));
        }
        match entry.pool_type.as_str() {
            "gmx" | "autonom" => {}
            other => {
                return Err(anyhow!(
                    "pool `{}` has unknown type `{}` in {source}",
                    entry.name,
                    other
                ))
            }
        }
        if entry.pool_type == "autonom" && entry.feed_ids.is_empty() {
            return Err(anyhow!(
                "autonom pool `{}` in {source} has no feedIds — required for MrAutonom market opening + adrena-data filtering",
                entry.name
            ));
        }
    }

    Ok(manifest)
}

// ─── PDA + pubkey helpers ────────────────────────────────────────────────────

fn parse_pubkey(s: &str, context: &str) -> anyhow::Result<Pubkey> {
    Pubkey::from_str(s).with_context(|| format!("invalid pubkey `{s}` in {context}"))
}

fn parse_pubkey_vec(strings: &[String], context: &str) -> anyhow::Result<Vec<Pubkey>> {
    strings.iter().map(|s| parse_pubkey(s, context)).collect()
}

/// Derive PDAs (pool pubkey + genesis_lock) from each manifest entry's name.
/// Does NOT fetch on-chain state. Use as the first pass at startup, then
/// fetch each pool account and call `validate_and_build_pool_context`.
pub fn build_pool_contexts_from_manifest(
    manifest: &PoolsManifestFile,
) -> anyhow::Result<Vec<(Pubkey, PoolManifestEntry)>> {
    let mut result = Vec::new();
    for entry in &manifest.pools {
        let pool_pubkey = pda::get_pool_pda(&entry.name).0;
        result.push((pool_pubkey, entry.clone()));
    }
    Ok(result)
}

/// Validate a single pool's manifest config against on-chain state.
/// Returns a fully resolved `PoolContext` on success, or an error describing
/// the mismatch. Every service should call this at startup for every manifest
/// pool — drift between config and chain is fatal.
pub fn validate_and_build_pool_context(
    entry: &PoolManifestEntry,
    pool_pubkey: Pubkey,
    on_chain_pool: Pool,
) -> anyhow::Result<PoolContext> {
    let pool_type = match entry.pool_type.as_str() {
        "gmx" => PoolType::Gmx,
        "autonom" => PoolType::Autonom,
        _ => return Err(anyhow!("unknown pool type `{}`", entry.pool_type)),
    };

    let expected_type: u8 = match pool_type {
        PoolType::Gmx => 0,
        PoolType::Autonom => 1,
    };
    if on_chain_pool.pool_type != expected_type {
        return Err(anyhow!(
            "pool `{}` manifest type={:?} but on-chain pool_type={}",
            entry.name,
            pool_type,
            on_chain_pool.pool_type
        ));
    }

    let manifest_custodies = parse_pubkey_vec(
        &entry.custodies,
        &format!("pool `{}` custodies", entry.name),
    )?;
    let manifest_synthetic = parse_pubkey_vec(
        &entry.synthetic_custodies,
        &format!("pool `{}` syntheticCustodies", entry.name),
    )?;
    let lp_mint = parse_pubkey(&entry.lp_mint, &format!("pool `{}` lpMint", entry.name))?;

    let on_chain_custodies: Vec<Pubkey> = on_chain_pool
        .custodies
        .iter()
        .filter(|k| **k != Pubkey::default())
        .copied()
        .collect();
    if manifest_custodies != on_chain_custodies {
        return Err(anyhow!(
            "pool `{}` custody mismatch:\n  manifest: {:?}\n  on-chain: {:?}",
            entry.name,
            manifest_custodies,
            on_chain_custodies
        ));
    }

    let on_chain_synthetic: Vec<Pubkey> = on_chain_pool
        .synthetic_custodies
        .iter()
        .filter(|k| **k != Pubkey::default())
        .copied()
        .collect();
    if manifest_synthetic != on_chain_synthetic {
        return Err(anyhow!(
            "pool `{}` synthetic custody mismatch:\n  manifest: {:?}\n  on-chain: {:?}",
            entry.name,
            manifest_synthetic,
            on_chain_synthetic
        ));
    }

    let genesis_lock = pda::get_genesis_lock_pda(&pool_pubkey).0;

    let mut all_custodies_ordered = manifest_custodies.clone();
    all_custodies_ordered.extend_from_slice(&manifest_synthetic);

    Ok(PoolContext {
        name: entry.name.clone(),
        pubkey: pool_pubkey,
        pool_type,
        pool: on_chain_pool,
        lp_mint,
        genesis_lock,
        custodies: manifest_custodies,
        synthetic_custodies: manifest_synthetic,
        all_custodies_ordered,
        feed_ids: entry.feed_ids.clone(),
        automation: entry.automation.clone(),
    })
}

// ─── LP staking pool resolution ──────────────────────────────────────────────

/// Resolve which pool a UserStaking account belongs to, for LP staking.
///
/// Each pool has its own LP token mint and therefore its own Staking PDA.
/// A UserStaking PDA is derived from (owner, staking_pda). To find the
/// correct pool for a given user_staking_account, we derive the expected
/// UserStaking PDA for each pool's LP mint and compare.
///
/// Returns a reference to the matching PoolContext, or None if no pool matches.
pub fn resolve_lp_staking_pool<'a>(
    pool_contexts: &'a [PoolContext],
    owner: &Pubkey,
    user_staking_account_key: &Pubkey,
) -> Option<&'a PoolContext> {
    pool_contexts.iter().find(|ctx| {
        let staking_pda = pda::get_staking_pda(&ctx.lp_mint).0;
        let expected_user_staking = pda::get_user_staking_pda(owner, &staking_pda).0;
        expected_user_staking == *user_staking_account_key
    })
}

// ─── Tests ───────────────────────────────────────────────────────────────────

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn embedded_manifest_parses_and_validates() {
        let m = load_embedded_pools_manifest().expect("embedded manifest must parse");
        assert!(!m.pools.is_empty(), "embedded manifest has at least one pool");
        for p in &m.pools {
            assert!(!p.name.is_empty());
            if p.pool_type == "autonom" {
                assert!(
                    !p.feed_ids.is_empty(),
                    "autonom pool `{}` must carry feedIds",
                    p.name
                );
            }
        }
    }

    #[test]
    fn parse_and_validate_rejects_duplicate_names() {
        let raw = r#"
        {
          "pools": [
            {"name":"p","type":"gmx","oracleProviders":[],"custodies":[],
             "syntheticCustodies":[],"lpMint":"","feedIds":[],
             "automation":{"liquidations":false,"slTp":false,"limitOrders":false,"marketOpening":false,"distributeFees":false,"resolveStakingRound":false}},
            {"name":"p","type":"gmx","oracleProviders":[],"custodies":[],
             "syntheticCustodies":[],"lpMint":"","feedIds":[],
             "automation":{"liquidations":false,"slTp":false,"limitOrders":false,"marketOpening":false,"distributeFees":false,"resolveStakingRound":false}}
          ]
        }"#;
        assert!(parse_and_validate(raw, "<test>").is_err());
    }

    #[test]
    fn parse_and_validate_rejects_autonom_without_feedids() {
        let raw = r#"
        {
          "pools": [
            {"name":"p","type":"autonom","oracleProviders":[],"custodies":[],
             "syntheticCustodies":[],"lpMint":"","feedIds":[],
             "automation":{"liquidations":false,"slTp":false,"limitOrders":false,"marketOpening":false,"distributeFees":false,"resolveStakingRound":false}}
          ]
        }"#;
        assert!(parse_and_validate(raw, "<test>").is_err());
    }

    fn make_pool_context(name: &str, lp_mint: Pubkey) -> PoolContext {
        let pubkey = pda::get_pool_pda(&name.to_string()).0;
        let genesis_lock = pda::get_genesis_lock_pda(&pubkey).0;
        PoolContext {
            name: name.to_string(),
            pubkey,
            pool_type: PoolType::Gmx,
            pool: Pool::default(),
            lp_mint,
            genesis_lock,
            custodies: vec![],
            synthetic_custodies: vec![],
            all_custodies_ordered: vec![],
            feed_ids: vec![],
            automation: AutomationFlags {
                liquidations: true,
                sl_tp: true,
                limit_orders: true,
                market_opening: false,
                distribute_fees: true,
                resolve_staking_round: true,
            },
        }
    }

    #[test]
    fn resolve_lp_staking_pool_finds_correct_pool() {
        let owner = Pubkey::new_unique();
        let lp_mint_1 = Pubkey::new_unique();
        let lp_mint_2 = Pubkey::new_unique();

        let ctx1 = make_pool_context("main-pool", lp_mint_1);
        let ctx2 = make_pool_context("commodities-pool", lp_mint_2);
        let contexts = vec![ctx1, ctx2];

        let staking_pda_2 = pda::get_staking_pda(&lp_mint_2).0;
        let user_staking_2 = pda::get_user_staking_pda(&owner, &staking_pda_2).0;
        let resolved = resolve_lp_staking_pool(&contexts, &owner, &user_staking_2);
        assert_eq!(resolved.unwrap().lp_mint, lp_mint_2);

        let staking_pda_1 = pda::get_staking_pda(&lp_mint_1).0;
        let user_staking_1 = pda::get_user_staking_pda(&owner, &staking_pda_1).0;
        let resolved_1 = resolve_lp_staking_pool(&contexts, &owner, &user_staking_1);
        assert_eq!(resolved_1.unwrap().lp_mint, lp_mint_1);
    }

    #[test]
    fn resolve_lp_staking_pool_returns_none_for_unknown() {
        let owner = Pubkey::new_unique();
        let lp_mint = Pubkey::new_unique();
        let contexts = vec![make_pool_context("main-pool", lp_mint)];
        let unrelated = Pubkey::new_unique();
        assert!(resolve_lp_staking_pool(&contexts, &owner, &unrelated).is_none());
    }

    #[test]
    fn resolve_lp_staking_pool_different_owners_dont_collide() {
        let owner_a = Pubkey::new_unique();
        let owner_b = Pubkey::new_unique();
        let lp_mint = Pubkey::new_unique();
        let contexts = vec![make_pool_context("main-pool", lp_mint)];

        let staking_pda = pda::get_staking_pda(&lp_mint).0;
        let user_staking_a = pda::get_user_staking_pda(&owner_a, &staking_pda).0;
        assert!(resolve_lp_staking_pool(&contexts, &owner_b, &user_staking_a).is_none());
        assert!(resolve_lp_staking_pool(&contexts, &owner_a, &user_staking_a).is_some());
    }
}
