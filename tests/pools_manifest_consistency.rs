//! Cross-validates the embedded pools_manifest.json against the rest of
//! the adrena-abi shipped artifacts:
//!
//!   * Every autonom-pool `feedIds` entry must lie in the Autonom provider
//!     range (30..=141) as declared by `feed_metadata.providers`.
//!   * Every sessioned feed_id that appears in an autonom-pool's feedIds
//!     must correspond to a symbol that is `sessioned=true` in
//!     `feed_metadata.sessioned`.
//!   * Pool names are unique (also enforced by the loader, but belt-and-
//!     suspenders at artifact level).
//!
//! These invariants are what MrAutonom / adrena-data / services rely on at
//! runtime. If the embedded manifest references a feed that adrena-abi
//! didn't actually register, the service would boot with an invalid
//! runtime shape. This test makes that failure mode impossible to ship.

use adrena_abi::{
    feed_maps::{AUTONOM_MAINNET_JSON, FEED_METADATA_JSON, POOLS_MANIFEST_JSON},
    pools_manifest,
};
use std::collections::{BTreeMap, HashMap, HashSet};

#[test]
fn embedded_manifest_parses_via_public_loader() {
    // Smoke test: the public loader works on the embedded bytes.
    let m = pools_manifest::load_embedded_pools_manifest()
        .expect("embedded pools_manifest must parse + validate");
    assert!(
        !m.pools.is_empty(),
        "embedded pools_manifest must have at least one pool"
    );
}

#[test]
fn autonom_pool_feed_ids_lie_in_autonom_provider_range() {
    let metadata: serde_json::Value =
        serde_json::from_str(FEED_METADATA_JSON).expect("feed_metadata.json parses");
    let autonom_range = metadata["providers"]["autonom"]["range"]
        .as_array()
        .expect("feed_metadata.providers.autonom.range is array");
    let min = autonom_range[0].as_u64().unwrap() as u8;
    let max = autonom_range[1].as_u64().unwrap() as u8;

    let manifest: serde_json::Value =
        serde_json::from_str(POOLS_MANIFEST_JSON).expect("pools_manifest.json parses");
    let pools = manifest["pools"].as_array().expect("pools is array");
    let mut errors = Vec::new();
    for pool in pools {
        let name = pool["name"].as_str().unwrap_or("<unknown>");
        let type_ = pool["type"].as_str().unwrap_or("");
        if type_ != "autonom" {
            continue;
        }
        let feed_ids = pool["feedIds"]
            .as_array()
            .map(|a| {
                a.iter()
                    .filter_map(|v| v.as_u64().map(|n| n as u8))
                    .collect::<Vec<_>>()
            })
            .unwrap_or_default();
        for fid in feed_ids {
            if fid < min || fid > max {
                errors.push(format!(
                    "autonom pool `{name}` feedIds contains {fid}, outside Autonom range {min}..={max}"
                ));
            }
        }
    }
    assert!(
        errors.is_empty(),
        "pools_manifest references feed IDs outside the Autonom provider range:\n{}",
        errors.join("\n")
    );
}

#[test]
fn autonom_pool_feed_ids_have_registered_symbols() {
    // Every feed_id in an autonom pool's feedIds list must exist in
    // autonom.mainnet.json (i.e. the Autonom backend knows how to sign it).
    let autonom: serde_json::Value =
        serde_json::from_str(AUTONOM_MAINNET_JSON).expect("autonom.mainnet.json parses");
    let autonom_map: HashMap<u8, String> = autonom["autonom_feed_map"]
        .as_array()
        .expect("autonom_feed_map is array")
        .iter()
        .map(|entry| {
            let id = entry["adrena_feed_id"].as_u64().unwrap() as u8;
            let sym = entry["symbol"].as_str().unwrap().to_string();
            (id, sym)
        })
        .collect();

    let manifest: serde_json::Value =
        serde_json::from_str(POOLS_MANIFEST_JSON).expect("pools_manifest.json parses");
    let pools = manifest["pools"].as_array().unwrap();
    let mut errors = Vec::new();
    for pool in pools {
        let name = pool["name"].as_str().unwrap_or("<unknown>");
        let type_ = pool["type"].as_str().unwrap_or("");
        if type_ != "autonom" {
            continue;
        }
        for v in pool["feedIds"].as_array().cloned().unwrap_or_default() {
            let fid = v.as_u64().unwrap() as u8;
            if !autonom_map.contains_key(&fid) {
                errors.push(format!(
                    "autonom pool `{name}` feedIds carries {fid} but autonom.mainnet.json has no matching adrena_feed_id"
                ));
            }
        }
    }
    assert!(
        errors.is_empty(),
        "pools_manifest references Autonom feed IDs not present in autonom.mainnet.json:\n{}",
        errors.join("\n")
    );
}

#[test]
fn sessioned_autonom_feeds_referenced_by_pools_are_marked_sessioned() {
    // Any feed the pool declares (and that isn't the shared USDC pricing
    // slot) should have a sessioned flag in feed_metadata. Crypto feeds
    // (USDC/SOL/etc) are unsessioned; commodities (XAU etc) are sessioned.
    // MrAutonom filters by the sessioned flag — if a pool lists a feed the
    // metadata doesn't know about, MrAutonom would silently drop it.
    let metadata: serde_json::Value =
        serde_json::from_str(FEED_METADATA_JSON).expect("feed_metadata.json parses");
    let sessioned = metadata["sessioned"]
        .as_object()
        .expect("feed_metadata.sessioned is object");
    let sessioned_symbols: HashSet<String> = sessioned.keys().cloned().collect();

    let autonom: serde_json::Value =
        serde_json::from_str(AUTONOM_MAINNET_JSON).expect("autonom.mainnet.json parses");
    let autonom_map: BTreeMap<u8, String> = autonom["autonom_feed_map"]
        .as_array()
        .unwrap()
        .iter()
        .map(|entry| {
            let id = entry["adrena_feed_id"].as_u64().unwrap() as u8;
            let sym = entry["symbol"].as_str().unwrap().to_string();
            (id, sym)
        })
        .collect();

    let manifest: serde_json::Value =
        serde_json::from_str(POOLS_MANIFEST_JSON).expect("pools_manifest.json parses");
    let pools = manifest["pools"].as_array().unwrap();
    let mut errors = Vec::new();
    for pool in pools {
        let name = pool["name"].as_str().unwrap_or("<unknown>");
        let type_ = pool["type"].as_str().unwrap_or("");
        if type_ != "autonom" {
            continue;
        }
        for v in pool["feedIds"].as_array().cloned().unwrap_or_default() {
            let fid = v.as_u64().unwrap() as u8;
            let sym = match autonom_map.get(&fid) {
                Some(s) => s,
                None => continue, // covered by the other test
            };
            if !sessioned_symbols.contains(sym) {
                errors.push(format!(
                    "autonom pool `{name}` feedIds={fid} symbol={sym} has no sessioned flag in feed_metadata.sessioned"
                ));
            }
        }
    }
    assert!(
        errors.is_empty(),
        "pools_manifest references feeds whose symbols aren't classified in feed_metadata.sessioned:\n{}",
        errors.join("\n")
    );
}

#[test]
fn pool_names_are_unique() {
    let manifest: serde_json::Value =
        serde_json::from_str(POOLS_MANIFEST_JSON).expect("pools_manifest.json parses");
    let pools = manifest["pools"].as_array().unwrap();
    let mut seen = HashSet::new();
    for pool in pools {
        let name = pool["name"].as_str().unwrap().to_string();
        assert!(
            seen.insert(name.clone()),
            "duplicate pool name `{name}` in pools_manifest.json"
        );
    }
}

#[test]
fn pool_custodies_synthetic_lp_mint_pinned_to_onchain_truth() {
    // Last-mile drift gate. The runtime validator
    // `validate_and_build_pool_context` does a strict `Vec<Pubkey>` equality
    // between manifest and on-chain pool accounts. Order is part of the
    // equality. This test pins the canonical on-chain order so a manifest
    // edit without a corresponding constant update fails CI before any
    // service quarantines a pool at boot.
    //
    // ── Why this exists ──────────────────────────────────────────────────
    // 2026-04-29 incident: XAG and WTI were added to commodities-pool via
    // two separate Realms proposals. We wrote pools_manifest.json with
    // syntheticCustodies in "code intent" order [XAU, XAG, WTI], but
    // on-chain landed [XAU, WTI, XAG] because the WTI proposal executed
    // first. Every consumer that called validate_and_build_pool_context
    // quarantined commodities-pool — MrSablier, MrSablierStaking,
    // MrOracle (Stage-2 AUM stopped firing for commodities-pool entirely).
    // Resolution required pushing a new abi commit + bumping every
    // consumer pin. This test would have caught it before the manifest PR
    // ever merged.
    //
    // ── How to update ────────────────────────────────────────────────────
    // When adding/removing a custody (real or synthetic), in the SAME PR:
    //   1. Update pools_manifest.json with the new pubkey.
    //   2. Run `solana account <pool-pda>` (or
    //      `adrena/cli get-pool <name>`) AFTER the on-chain proposal has
    //      executed to read the actual `pool.custodies[]` /
    //      `pool.synthetic_custodies[]` order. Order is determined by
    //      transaction landing order, NOT proposal authoring order.
    //   3. Bump the constant below to match.

    struct ExpectedPool<'a> {
        custodies: &'a [&'a str],
        synthetic_custodies: &'a [&'a str],
        lp_mint: &'a str,
    }

    let expected: BTreeMap<&str, ExpectedPool> = BTreeMap::from([
        (
            "main-pool",
            ExpectedPool {
                // Read 2026-04-21 from on-chain pool.custodies[] at offset 48.
                // Order: USDC, BONK, jitoSOL, WBTC.
                custodies: &[
                    "Dk523LZeDQbZtUwPEBjFXCd2Au1tD7mWZBJJmcgHktNk",
                    "8aJuzsgjxBnvRhDcfQBD7z4CUj7QoPEpaNwVd7KqsSk5",
                    "GZ9XfWwgTRhkma2Y91Q9r1XKotNXYjBnKKabj19rhT71",
                    "GFu3qS22mo6bAjg4Lr5R7L8pPgHq6GvbjJPKEHkbbs2c",
                ],
                synthetic_custodies: &[],
                lp_mint: "4yCLi5yWGzpTWMQ1iWHG5CrGYAdBkhyEdsuSugjDUqwj",
            },
        ),
        (
            "commodities-pool",
            ExpectedPool {
                // Read 2026-04-29 from on-chain pool.custodies[] at offset 48.
                // Single stable: USDC.
                custodies: &["woVG8fmrUzFJhWa6mRjiYC2qFCY73oAnQeioYK1m1JX"],
                // Read 2026-04-29 from on-chain pool.synthetic_custodies[].
                // Order is execution order: XAU bootstrap, then WTI proposal
                // landed before XAG proposal. DO NOT REORDER without
                // re-reading on-chain — a Vec<Pubkey> equality check in
                // validate_and_build_pool_context will quarantine the pool.
                synthetic_custodies: &[
                    "JB86ouHXGYgF4UbPs8yxYdaHudrdsintf5EbBfMydzYt", // XAU
                    "De21TFyUPHkvFsWAt6xJLBBXGp636VuL5cKk2DvfbHiR", // WTI
                    "PexsCkkxpVmY4HNxUjT3U9PEg69kYScc8GukUwn6Q3Q", // XAG
                ],
                lp_mint: "GMZ7hCGeHyDr1giM4dyP2eTkj9GQ2T1G9cBDridLz5Cx",
            },
        ),
    ]);

    let manifest: serde_json::Value =
        serde_json::from_str(POOLS_MANIFEST_JSON).expect("pools_manifest.json parses");
    let pools = manifest["pools"].as_array().expect("pools is array");

    let manifest_by_name: BTreeMap<String, &serde_json::Value> = pools
        .iter()
        .map(|p| (p["name"].as_str().unwrap().to_string(), p))
        .collect();

    // Pools listed in the manifest but missing from `expected` => unpinned.
    // We force every pool to be pinned, otherwise this test is a no-op for
    // any future pool added without test discipline.
    for name in manifest_by_name.keys() {
        assert!(
            expected.contains_key(name.as_str()),
            "pools_manifest.json contains pool `{name}` but no pinned entry exists in \
             pool_custodies_synthetic_lp_mint_pinned_to_onchain_truth(). Add an entry \
             with the on-chain custody/synthetic/lpMint truth — this test must remain \
             exhaustive or it stops catching drift."
        );
    }

    // For every pinned pool, fail if it's missing or any field differs.
    let mut errors = Vec::new();
    for (name, expected_pool) in &expected {
        let Some(pool) = manifest_by_name.get(*name) else {
            errors.push(format!(
                "pinned pool `{name}` is not in pools_manifest.json — was it removed without removing the pinned entry?"
            ));
            continue;
        };

        // custodies: ordered Vec<String> equality.
        let manifest_custodies: Vec<String> = pool["custodies"]
            .as_array()
            .map(|a| {
                a.iter()
                    .filter_map(|v| v.as_str().map(|s| s.to_string()))
                    .collect()
            })
            .unwrap_or_default();
        let expected_custodies: Vec<String> =
            expected_pool.custodies.iter().map(|s| s.to_string()).collect();
        if manifest_custodies != expected_custodies {
            errors.push(format!(
                "pool `{name}` custodies mismatch:\n  expected (on-chain): {:?}\n  manifest:            {:?}",
                expected_custodies, manifest_custodies
            ));
        }

        // syntheticCustodies: ordered Vec<String> equality.
        let manifest_synthetic: Vec<String> = pool["syntheticCustodies"]
            .as_array()
            .map(|a| {
                a.iter()
                    .filter_map(|v| v.as_str().map(|s| s.to_string()))
                    .collect()
            })
            .unwrap_or_default();
        let expected_synthetic: Vec<String> = expected_pool
            .synthetic_custodies
            .iter()
            .map(|s| s.to_string())
            .collect();
        if manifest_synthetic != expected_synthetic {
            errors.push(format!(
                "pool `{name}` syntheticCustodies mismatch (Vec<Pubkey> equality with strict order):\n  expected (on-chain): {:?}\n  manifest:            {:?}\n  HINT: read on-chain order via `solana account <pool-pda>` or \
                 `adrena/cli get-pool {name}` after every proposal lands.",
                expected_synthetic, manifest_synthetic
            ));
        }

        // lpMint: exact string match.
        let manifest_lp = pool["lpMint"].as_str().unwrap_or("");
        if manifest_lp != expected_pool.lp_mint {
            errors.push(format!(
                "pool `{name}` lpMint mismatch:\n  expected: {}\n  manifest: {}",
                expected_pool.lp_mint, manifest_lp
            ));
        }
    }

    assert!(
        errors.is_empty(),
        "pools_manifest.json drift from on-chain truth detected:\n\n{}\n\n\
         If the change is intentional (a custody/synthetic/lp was added or removed on-chain), \
         update BOTH the manifest AND this test's `expected` map in lockstep. The values must \
         reflect actual on-chain order — read it back after the proposal lands, don't guess.",
        errors.join("\n\n")
    );
}
