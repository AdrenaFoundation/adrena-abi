// Ported from adrena/programs/adrena/src/state/genesis_lock.rs (release/39).
// Zero-copy account — off-chain consumers decoding raw account data need the
// exact field order + repr(C). Impl blocks with on-chain logic (campaign
// state transitions, grant validation) are intentionally NOT ported.

use anchor_lang::prelude::*;

// temporary hack waiting to update Anchor. Fixed in 0.29.0
const RESERVED_GRANTS_COUNT: usize = 43;

#[account(zero_copy)]
#[derive(Debug)]
#[repr(C)]
pub struct GenesisLock {
    pub bump: u8,
    pub has_transitioned_to_fully_public: u8,
    pub has_completed_otc_in: u8,
    pub has_completed_otc_out: u8,
    pub _padding: [u8; 4],
    // Duration in second of the genesis lock campaign (during which users can deposit funds)
    pub campaign_duration: i64,
    // Duration in seconds determining how long before the reserved grants become public
    pub reserved_grant_duration: i64,
    // Timestamp of the starting date of the genesis campaign
    pub campaign_start_date: i64,
    // the amount for the public
    pub public_amount: u64,
    // the amount for insiders
    pub reserved_amount: u64,
    pub public_amount_claimed: u64,
    pub reserved_amount_claimed: u64,

    // Array containing the owners and amount for the insider allocation
    pub reserved_grant_owners: [Pubkey; RESERVED_GRANTS_COUNT],
    pub reserved_grant_amounts: [u64; RESERVED_GRANTS_COUNT],

    pub _padding_unsafe: [u8; 8],
}

impl GenesisLock {
    pub const LEN: usize = 8 + std::mem::size_of::<GenesisLock>();
}
