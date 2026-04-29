//! Strict pubkey pinning.
//!
//! Every PDA derivation in `pda.rs` is a function of:
//!   - the program ID (declare_id! in lib.rs)
//!   - the seed bytes
//!
//! If anyone changes the program ID, a seed string, or the derivation order,
//! every off-chain consumer (MrSablier, MrOracle, MrAutonom, datapi, frontend)
//! computes wrong addresses and silently breaks at startup.
//!
//! These tests pin a curated set of canonical PDAs against the same values
//! exposed as `static Pubkey` constants in `lib.rs`. Two layers of safety:
//!   1. Static constants must equal their derivation. If lib.rs's
//!      `MAIN_POOL_ID` ever drifts from `get_pool_pda("main-pool").0`, the
//!      static was edited or the derivation changed — both warrant a failing
//!      test.
//!   2. The derived addresses are also asserted against hardcoded base58
//!      strings (the on-chain truth as of release/39 mainnet) so a coordinated
//!      "edit both lib.rs and the test" change still surfaces.

use {
    adrena_abi::{
        pda::{
            get_cortex_pda, get_custody_pda, get_lp_token_mint_pda,
            get_oracle_pda, get_pool_pda, get_transfer_authority_pda, get_user_profile_pda,
            get_vest_registry_pda,
        },
        ADRENA_PROGRAM_ID, ADX_MINT, ALP_MINT, BONK_MINT, CORTEX_ID, GENESIS_LOCK_ID,
        GOVERNANCE_PROGRAM_ID, JITO_MINT, MAIN_POOL_ID, SOL_MINT, SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
        SPL_GOVERNANCE_PROGRAM_ID, SPL_TOKEN_PROGRAM_ID, SYSTEM_PROGRAM_ID, USDC_MINT, WBTC_MINT,
    },
    anchor_lang::prelude::Pubkey,
    std::str::FromStr,
};

// ── 1. Program / well-known program IDs ───────────────────────────────────
// These are mainnet immutables. Any drift = catastrophic.

#[test]
fn adrena_program_id_pinned_to_release39_mainnet() {
    assert_eq!(
        ADRENA_PROGRAM_ID,
        Pubkey::from_str("13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet").unwrap()
    );
}

#[test]
fn well_known_solana_programs_pinned() {
    assert_eq!(
        SYSTEM_PROGRAM_ID,
        Pubkey::from_str("11111111111111111111111111111111").unwrap()
    );
    assert_eq!(
        SPL_TOKEN_PROGRAM_ID,
        Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap()
    );
    assert_eq!(
        SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
        Pubkey::from_str("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL").unwrap()
    );
    assert_eq!(
        SPL_GOVERNANCE_PROGRAM_ID,
        Pubkey::from_str("GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw").unwrap()
    );
    // GOVERNANCE_PROGRAM_ID is the same crate-internal alias.
    assert_eq!(SPL_GOVERNANCE_PROGRAM_ID, GOVERNANCE_PROGRAM_ID);
}

// ── 2. Mint pinning (mainnet truth) ───────────────────────────────────────

#[test]
fn token_mints_pinned_to_mainnet_truth() {
    assert_eq!(
        SOL_MINT,
        Pubkey::from_str("So11111111111111111111111111111111111111112").unwrap()
    );
    assert_eq!(
        USDC_MINT,
        Pubkey::from_str("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v").unwrap()
    );
    assert_eq!(
        BONK_MINT,
        Pubkey::from_str("DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263").unwrap()
    );
    assert_eq!(
        JITO_MINT,
        Pubkey::from_str("J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn").unwrap()
    );
    assert_eq!(
        WBTC_MINT,
        Pubkey::from_str("3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh").unwrap()
    );
    assert_eq!(
        ADX_MINT,
        Pubkey::from_str("AuQaustGiaqxRvj2gtCdrd22PBzTn8kM3kEPEkZCtuDw").unwrap()
    );
    assert_eq!(
        ALP_MINT,
        Pubkey::from_str("4yCLi5yWGzpTWMQ1iWHG5CrGYAdBkhyEdsuSugjDUqwj").unwrap()
    );
}

// ── 3. PDA derivations match their lib.rs constants ───────────────────────
// If a seed is changed, the derivation drifts but the static doesn't (or
// vice versa). These tests catch both directions of drift.

#[test]
fn cortex_pda_derivation_matches_lib_constant() {
    let (derived, _) = get_cortex_pda();
    assert_eq!(derived, CORTEX_ID, "cortex PDA derivation drift");
    assert_eq!(
        derived,
        Pubkey::from_str("Dhz8Ta79hgyUbaRcu7qHMnqMfY47kQHfHt2s42D9dC4e").unwrap(),
        "cortex address drift from mainnet"
    );
}

#[test]
fn main_pool_pda_derivation_matches_lib_constant() {
    let (derived, _) = get_pool_pda(&"main-pool".to_string());
    assert_eq!(derived, MAIN_POOL_ID);
    assert_eq!(
        derived,
        Pubkey::from_str("4bQRutgDJs6vuh6ZcWaPVXiQaBzbHketjbCDjL4oRN34").unwrap()
    );
}

#[test]
fn commodities_pool_pda_derivation_pinned() {
    let (derived, _) = get_pool_pda(&"commodities-pool".to_string());
    assert_eq!(
        derived,
        Pubkey::from_str("GN2hyBVHcUitWETeDfAoeXDMqow1x8StqdRFnGaUB2vb").unwrap(),
        "commodities-pool derivation drift",
    );
}

#[test]
fn oracle_pda_pinned_to_mainnet() {
    let (derived, _) = get_oracle_pda();
    assert_eq!(
        derived,
        Pubkey::from_str("GEm9TZP7BL8rTz1JDy6X74PL595zr1putA9BXC8ehDmU").unwrap(),
        "oracle PDA derivation drift",
    );
}

#[test]
fn alp_lp_token_mint_pda_matches_static() {
    let (derived, _) = get_lp_token_mint_pda(&MAIN_POOL_ID);
    assert_eq!(derived, ALP_MINT, "ALP mint PDA derivation drift");
}

#[test]
fn main_pool_custodies_match_static_constants() {
    use adrena_abi::main_pool::{
        BONK_CUSTODY_ID, JITOSOL_CUSTODY_ID, USDC_CUSTODY_ID, WBTC_CUSTODY_ID,
    };
    assert_eq!(get_custody_pda(&MAIN_POOL_ID, &USDC_MINT).0, USDC_CUSTODY_ID);
    assert_eq!(get_custody_pda(&MAIN_POOL_ID, &BONK_MINT).0, BONK_CUSTODY_ID);
    assert_eq!(
        get_custody_pda(&MAIN_POOL_ID, &JITO_MINT).0,
        JITOSOL_CUSTODY_ID
    );
    assert_eq!(get_custody_pda(&MAIN_POOL_ID, &WBTC_MINT).0, WBTC_CUSTODY_ID);
}

#[test]
fn genesis_lock_pda_matches_static_constant() {
    use adrena_abi::pda::get_genesis_lock_pda;
    let (derived, _) = get_genesis_lock_pda(&MAIN_POOL_ID);
    assert_eq!(derived, GENESIS_LOCK_ID, "genesis lock PDA drift");
}

// ── 4. Other PDAs pinned to mainnet truth ─────────────────────────────────

#[test]
fn transfer_authority_pda_pinned() {
    let (derived, _) = get_transfer_authority_pda();
    assert_eq!(
        derived,
        Pubkey::from_str("4o3qAErcapJ6gRLh1m1x4saoLLieWDu7Rx3wpwLc7Zk9").unwrap(),
        "transfer_authority PDA drift — change in seed `transfer_authority` or program ID",
    );
}

#[test]
fn vest_registry_pda_pinned() {
    let (derived, _) = get_vest_registry_pda();
    assert_eq!(
        derived,
        Pubkey::from_str("6ba2YksAvLSr8ya8ifA2w9HY3tvRSDR9F6bp2QFzvRVi").unwrap(),
        "vest_registry PDA drift — change in seed `vest_registry` or program ID",
    );
}

// ── 5. PDA derivation determinism ─────────────────────────────────────────
// The same input must produce the same output every call. (Should be obvious
// from a pure function but worth pinning since these are critical paths.)

#[test]
fn pool_pda_is_deterministic_across_calls() {
    let (a, bump_a) = get_pool_pda(&"main-pool".to_string());
    let (b, bump_b) = get_pool_pda(&"main-pool".to_string());
    assert_eq!(a, b);
    assert_eq!(bump_a, bump_b);
}

#[test]
fn user_profile_pda_differs_per_owner() {
    let owner_a = Pubkey::new_unique();
    let owner_b = Pubkey::new_unique();
    let (pda_a, _) = get_user_profile_pda(&owner_a);
    let (pda_b, _) = get_user_profile_pda(&owner_b);
    assert_ne!(pda_a, pda_b, "different owners must produce different PDAs");
}

#[test]
fn custody_pda_differs_per_pool_per_mint() {
    // Same mint, different pools → different PDAs.
    let pool_a = Pubkey::new_unique();
    let pool_b = Pubkey::new_unique();
    let mint = USDC_MINT;
    assert_ne!(
        get_custody_pda(&pool_a, &mint).0,
        get_custody_pda(&pool_b, &mint).0,
    );
    // Same pool, different mints → different PDAs.
    let pool = MAIN_POOL_ID;
    assert_ne!(
        get_custody_pda(&pool, &USDC_MINT).0,
        get_custody_pda(&pool, &BONK_MINT).0,
    );
}
