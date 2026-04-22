// Ported from adrena/programs/adrena/src/state/vest.rs + vest_registry.rs +
// instructions/admin/cortex/mint_lm_tokens_from_bucket.rs (release/39).
//
// `Vest` is a zero-copy account — off-chain consumers decoding the raw
// account data need the exact field order + repr(C) to match the on-chain
// layout byte-for-byte.
//
// On-chain impl blocks that require `math`, `Cortex`, `BPS_POWER`, or
// mutable `&mut self` logic are intentionally NOT ported — adrena-abi is a
// read/decode library, not a re-implementation of program logic.

use {
    crate::error::AdrenaError,
    anchor_lang::prelude::*,
};

pub enum VestVersion {
    V1 = 0,
    V2 = 2,
}

#[account(zero_copy)]
#[derive(Default, Debug)]
#[repr(C)]
pub struct Vest {
    pub bump: u8,
    pub origin_bucket: u8, // BucketName
    pub cancelled: u8,
    pub version: u8,

    pub vote_multiplier: u32, // In BPS

    // Note: this is the flat amount of token allocated to the vest
    pub amount: u64,
    pub unlock_start_timestamp: i64,
    pub unlock_end_timestamp: i64,

    pub claimed_amount: u64,
    pub last_claim_timestamp: i64,

    pub owner: Pubkey,

    // If delegate is set, the vest can be claimed by the delegate
    // The delegate can't change the vest's delegate
    pub delegate: Pubkey,
    pub has_delegate: u8,

    // Add unused space for further updates
    pub _padding2: [u8; 7],
    pub _padding3: [u8; 32],
}

// OLD AND DEPRECATED VERSION — kept for off-chain consumers that still need
// to decode vest accounts created before the V2 migration.
pub mod legacy {
    // The derive macros live in anchor's re-exported `borsh` crate, not the
    // prelude. Using the `anchor_lang::prelude::borsh` path keeps us locked to
    // the borsh version anchor uses (0.10.x) so the #[derive]-generated impls
    // match the `BorshDeserialize` trait consumers import from adrena-abi.
    use {
        anchor_lang::prelude::*,
        anchor_lang::prelude::borsh::{BorshDeserialize, BorshSerialize},
    };

    #[account(zero_copy)]
    #[derive(Default, Debug, BorshDeserialize, BorshSerialize)]
    #[repr(C)]
    pub struct VestV1 {
        pub bump: u8,
        pub origin_bucket: u8, // BucketName
        pub cancelled: u8,
        pub version: u8, // Added later on -> Value will be 0 for vests created before the versioning

        pub vote_multiplier: u32, // In BPS

        pub amount: u64,
        pub unlock_start_timestamp: i64,
        pub unlock_end_timestamp: i64,

        pub claimed_amount: u64,
        pub last_claim_timestamp: i64,

        pub owner: Pubkey,
    }

    impl VestV1 {
        pub const LEN: usize = 8 + std::mem::size_of::<VestV1>();
    }
}

// Source: adrena/programs/adrena/src/state/vest_registry.rs
#[account]
#[derive(Default, Debug)]
pub struct VestRegistry {
    pub bump: u8,
    pub vests: Vec<Pubkey>,
    // Currently locked up in vests
    pub vesting_token_amount: u64,
    // Claimed (stat)
    pub vested_token_amount: u64,
}

impl VestRegistry {
    pub const LEN: usize = 8 + std::mem::size_of::<u8>() + std::mem::size_of::<u64>() * 2 + 4;

    pub fn size(&self) -> usize {
        Self::LEN + self.vests.len() * std::mem::size_of::<Pubkey>()
    }
}

// Source: adrena/programs/adrena/src/instructions/admin/cortex/mint_lm_tokens_from_bucket.rs
// Hoisted into the ABI (the program keeps this enum inside an instruction
// module, but the `Vest.origin_bucket: u8` field makes it ABI-relevant).
#[derive(PartialEq, Copy, Clone, Default, Debug)]
pub enum BucketName {
    CoreContributor = 0,
    Foundation = 1,
    #[default]
    Ecosystem = 2,
}

impl From<BucketName> for u8 {
    fn from(bucket_name: BucketName) -> u8 {
        match bucket_name {
            BucketName::CoreContributor => 0,
            BucketName::Foundation => 1,
            BucketName::Ecosystem => 2,
        }
    }
}

impl TryFrom<u8> for BucketName {
    type Error = anchor_lang::error::Error;

    fn try_from(value: u8) -> std::result::Result<Self, Self::Error> {
        Ok(match value {
            0 => BucketName::CoreContributor,
            1 => BucketName::Foundation,
            2 => BucketName::Ecosystem,
            _ => Err(AdrenaError::InvalidBucketName)?,
        })
    }
}
