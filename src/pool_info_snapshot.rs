// Ported from adrena/programs/adrena/src/state/pool_info_snapshot.rs (release/39).
// These PDAs are periodically refreshed on-chain; off-chain consumers read them
// to avoid recomputing per-custody stats themselves (stats dashboards, indexers).

use {
    crate::types::{MAX_CUSTODIES, MAX_SYNTHETIC_CUSTODIES},
    anchor_lang::prelude::*,
    bytemuck::{Pod, Zeroable},
};

#[derive(
    Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Default, Debug, Zeroable, Pod,
)]
#[repr(C)]
pub struct CustodyInfoSnapshotPda {
    pub assets_value_usd: u64,
    pub owned: u64,
    pub locked: u64,
    pub price: u64,
    pub trade_price: u64,
    pub short_pnl: i64,
    pub long_pnl: i64,
    pub open_interest_long_usd: u64,
    pub open_interest_short_usd: u64,
    pub cumulative_profit_usd: u64,
    pub cumulative_loss_usd: u64,
    pub cumulative_swap_fee_usd: u64,
    pub cumulative_liquidity_fee_usd: u64,
    pub cumulative_close_position_fee_usd: u64,
    pub cumulative_liquidation_fee_usd: u64,
    pub cumulative_borrow_fee_usd: u64,
    pub cumulative_trading_volume_usd: u64,
    pub _padding1: [u64; 4],
}

#[derive(
    Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Default, Debug, Zeroable, Pod,
)]
#[repr(C)]
pub struct SyntheticCustodyInfoSnapshotPda {
    pub trade_price: u64,
    pub short_pnl: i64,
    pub long_pnl: i64,
    pub open_interest_long_usd: u64,
    pub open_interest_short_usd: u64,
    pub cumulative_profit_usd: u64,
    pub cumulative_loss_usd: u64,
    pub cumulative_swap_fee_usd: u64,
    pub cumulative_liquidity_fee_usd: u64,
    pub cumulative_close_position_fee_usd: u64,
    pub cumulative_liquidation_fee_usd: u64,
    pub cumulative_borrow_fee_usd: u64,
    pub cumulative_trading_volume_usd: u64,
    pub _padding1: [u64; 4],
}

#[account(zero_copy)]
#[derive(Debug)]
#[repr(C)]
pub struct PoolInfoSnapshotPda {
    pub bump: u8,
    pub _padding: [u8; 7],
    pub current_time: i64,
    pub aum_usd: u64,
    pub lp_token_price: u64,
    pub custodies_info_snapshot: [CustodyInfoSnapshotPda; MAX_CUSTODIES],
    pub synthetic_custodies_info_snapshot:
        [SyntheticCustodyInfoSnapshotPda; MAX_SYNTHETIC_CUSTODIES],
    pub lp_circulating_supply: u64,
    pub cumulative_referrer_fee_usd: u64,
    pub _padding2: [u8; 120],
}

impl PoolInfoSnapshotPda {
    // 8 bytes for anchor discriminator
    pub const LEN: usize = 8 + std::mem::size_of::<PoolInfoSnapshotPda>();
}
