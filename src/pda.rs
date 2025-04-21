use {
    crate::{Side, GOVERNANCE_PROGRAM_ID},
    anchor_lang::prelude::*,
};

#[constant]
pub const SEED_CONFIG: &[u8] = b"config";

pub fn get_transfer_authority_pda() -> (Pubkey, u8) {
    Pubkey::find_program_address(&["transfer_authority".as_ref()], &crate::id())
}

pub fn get_cortex_pda() -> (Pubkey, u8) {
    Pubkey::find_program_address(&["cortex".as_ref()], &crate::id())
}

pub fn get_vest_registry_pda() -> (Pubkey, u8) {
    Pubkey::find_program_address(&["vest_registry".as_ref()], &crate::id())
}

pub fn get_genesis_lock_pda(pool_pda: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(&["genesis_lock".as_ref(), pool_pda.as_ref()], &crate::id())
}

pub fn get_lm_token_mint_pda() -> (Pubkey, u8) {
    Pubkey::find_program_address(&["lm_token_mint".as_ref()], &crate::id())
}

pub fn get_governance_token_mint_pda() -> (Pubkey, u8) {
    Pubkey::find_program_address(&["governance_token_mint".as_ref()], &crate::id())
}

pub fn get_user_staking_pda(owner: &Pubkey, staking_pda: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[
            "user_staking".as_ref(),
            owner.as_ref(),
            staking_pda.as_ref(),
        ],
        &crate::id(),
    )
}

pub fn get_staking_pda(staked_token_mint: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &["staking".as_ref(), staked_token_mint.as_ref()],
        &crate::id(),
    )
}

pub fn get_staking_staked_token_vault_pda(staking_pda: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &["staking_staked_token_vault".as_ref(), staking_pda.as_ref()],
        &crate::id(),
    )
}

pub fn get_staking_reward_token_vault_pda(staking_pda: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &["staking_reward_token_vault".as_ref(), staking_pda.as_ref()],
        &crate::id(),
    )
}

pub fn get_user_profile_pda(user: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(&["user_profile".as_ref(), user.as_ref()], &crate::id())
}

pub fn get_staking_lm_reward_token_vault_pda(staking_pda: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[
            "staking_lm_reward_token_vault".as_ref(),
            staking_pda.as_ref(),
        ],
        &crate::id(),
    )
}

pub fn get_program_data_pda() -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[crate::id().as_ref()],
        &anchor_lang::solana_program::bpf_loader_upgradeable::id(),
    )
}

pub fn get_pool_pda(name: &String) -> (Pubkey, u8) {
    Pubkey::find_program_address(&["pool".as_ref(), name.as_bytes()], &crate::id())
}

pub fn get_vest_pda(owner: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(&["vest".as_ref(), owner.as_ref()], &crate::id())
}

pub fn get_lp_token_mint_pda(pool_pda: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(&["lp_token_mint".as_ref(), pool_pda.as_ref()], &crate::id())
}

pub fn get_custody_pda(pool_pda: &Pubkey, custody_token_mint: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[
            "custody".as_ref(),
            pool_pda.as_ref(),
            custody_token_mint.as_ref(),
        ],
        &crate::id(),
    )
}

pub fn get_position_pda(
    owner: &Pubkey,
    pool_pda: &Pubkey,
    custody_pda: &Pubkey,
    side: Side,
) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[
            "position".as_ref(),
            owner.as_ref(),
            pool_pda.as_ref(),
            custody_pda.as_ref(),
            &[side as u8],
        ],
        &crate::id(),
    )
}

pub fn get_custody_token_account_pda(
    pool_pda: &Pubkey,
    custody_token_mint: &Pubkey,
) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[
            "custody_token_account".as_ref(),
            pool_pda.as_ref(),
            custody_token_mint.as_ref(),
        ],
        &crate::id(),
    )
}

pub fn get_referrer_reward_token_vault_pda(fee_redistribution_mint: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[
            "referrer_reward_token_vault".as_ref(),
            fee_redistribution_mint.as_ref(),
        ],
        &crate::id(),
    )
}

///
///

/// Seed prefix for Governance  PDAs
/// Note: This prefix is used for the initial set of PDAs and shouldn't be used
/// for any new accounts All new PDAs should use a unique prefix to guarantee
/// uniqueness for each account
pub const PROGRAM_AUTHORITY_SEED: &[u8] = b"governance";

/// Returns Realm PDA seeds
fn get_realm_address_seeds(name: &str) -> [&[u8]; 2] {
    [PROGRAM_AUTHORITY_SEED, name.as_bytes()]
}

/// Returns Realm Token Holding PDA seeds
fn get_governing_token_holding_address_seeds<'a>(
    realm: &'a Pubkey,
    governing_token_mint: &'a Pubkey,
) -> [&'a [u8]; 3] {
    [
        PROGRAM_AUTHORITY_SEED,
        realm.as_ref(),
        governing_token_mint.as_ref(),
    ]
}

/// Returns RealmConfig PDA seeds
fn get_realm_config_address_seeds(realm: &Pubkey) -> [&[u8]; 2] {
    [b"realm-config", realm.as_ref()]
}

/// Returns TokenOwnerRecord PDA seeds
fn get_token_owner_record_address_seeds<'a>(
    realm: &'a Pubkey,
    governing_token_mint: &'a Pubkey,
    governing_token_owner: &'a Pubkey,
) -> [&'a [u8]; 4] {
    [
        PROGRAM_AUTHORITY_SEED,
        realm.as_ref(),
        governing_token_mint.as_ref(),
        governing_token_owner.as_ref(),
    ]
}

/// Returns Realm PDA address
pub fn get_realm_pda(name: &str) -> Pubkey {
    Pubkey::find_program_address(&get_realm_address_seeds(name), &GOVERNANCE_PROGRAM_ID).0
}

/// Returns Realm Token Holding PDA address
pub fn get_governing_token_holding_pda(realm: &Pubkey, governing_token_mint: &Pubkey) -> Pubkey {
    Pubkey::find_program_address(
        &get_governing_token_holding_address_seeds(realm, governing_token_mint),
        &GOVERNANCE_PROGRAM_ID,
    )
    .0
}

/// Returns RealmConfig PDA address
pub fn get_realm_config_pda(realm: &Pubkey) -> Pubkey {
    Pubkey::find_program_address(
        &get_realm_config_address_seeds(realm),
        &GOVERNANCE_PROGRAM_ID,
    )
    .0
}

/// Returns TokenOwnerRecord PDA address
pub fn get_token_owner_record_pda(
    realm: &Pubkey,
    governing_token_mint: &Pubkey,
    governing_token_owner: &Pubkey,
) -> Pubkey {
    Pubkey::find_program_address(
        &get_token_owner_record_address_seeds(realm, governing_token_mint, governing_token_owner),
        &GOVERNANCE_PROGRAM_ID,
    )
    .0
}

pub fn get_limit_order_book_pda(pool_pda: &Pubkey, owner: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[
            "limit_order_book".as_ref(),
            owner.as_ref(),
            pool_pda.as_ref(),
        ],
        &crate::id(),
    )
}

pub fn get_collateral_escrow_pda(pool_pda: &Pubkey, owner: &Pubkey, mint: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[
            "escrow_account".as_ref(),
            owner.as_ref(),
            pool_pda.as_ref(),
            mint.as_ref(),
        ],
        &crate::id(),
    )
}

pub fn get_referrer_reward_token_vault(fee_redistribution_mint: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[
            "referrer_reward_token_vault".as_ref(),
            fee_redistribution_mint.as_ref(),
        ],
        &crate::id(),
    )
}

// The Oracle is now the onchain entity that aggregate prices from multiple sources
pub fn get_oracle() -> (Pubkey, u8) {
    Pubkey::find_program_address(&["oracle".as_ref()], &crate::id())
}
