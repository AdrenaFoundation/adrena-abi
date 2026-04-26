// Ported verbatim from adrena/programs/adrena/src/events.rs (release/39).
// Kept as an ABI surface so off-chain consumers (MrNotification, indexers,
// dashboards) decode the exact same byte layout the program emits via
// `emit!(...)` without re-declaring structs locally.
//
// The `#[event]` macro from anchor-lang expands to:
//   #[derive(AnchorSerialize, AnchorDeserialize, Clone)]
//   impl anchor_lang::Discriminator for Self { const DISCRIMINATOR: [u8; 8] = sha256("event:<Name>")[..8]; }
//   impl anchor_lang::Event for Self { fn data(&self) -> Vec<u8> { ... } }
// which gives consumers a source-of-truth discriminator constant and
// Anchor-compatible (de)serialization without pulling in the program crate.

use anchor_lang::prelude::*;

#[event]
#[derive(Clone)]
pub struct OpenPositionEvent {
    pub owner: Pubkey,
    pub position: Pubkey,
    pub custody_mint: Pubkey,
    pub custody_seed: [u8; 32],
    pub side: u8,
    pub size_usd: u64,
    pub price: u64,
    pub collateral_amount_usd: u64,
    pub leverage: u32,
    pub position_id: u64,
    pub pool_type: u8,
}

#[event]
#[derive(Clone)]
pub struct IncreasePositionEvent {
    pub owner: Pubkey,
    pub position: Pubkey,
    pub custody_mint: Pubkey,
    pub custody_seed: [u8; 32],
    pub side: u8,
    pub size_usd: u64,
    pub price: u64,
    pub collateral_amount_usd: u64,
    pub leverage: u32,
    pub position_id: u64,
    pub pool_type: u8,
}

#[event]
#[derive(Clone)]
pub struct ClosePositionEvent {
    pub owner: Pubkey,
    pub position: Pubkey,
    pub custody_mint: Pubkey,
    pub custody_seed: [u8; 32],
    pub side: u8,
    pub size_usd: u64,
    pub price: u64,
    pub collateral_amount_usd: u64,
    pub profit_usd: u64,
    pub loss_usd: u64,
    pub borrow_fee_usd: u64,
    pub exit_fee_usd: u64,
    pub position_id: u64,
    pub percentage: u64,
    pub funding_paid_usd: u64,
    pub funding_received_usd: u64,
    pub pool_type: u8,
}

#[event]
#[derive(Clone)]
pub struct AddCollateralEvent {
    pub owner: Pubkey,
    pub position: Pubkey,
    pub custody_mint: Pubkey,
    pub custody_seed: [u8; 32],
    pub side: u8,
    pub add_amount_usd: u64,
    pub new_collateral_amount_usd: u64,
    pub leverage: u32,
    pub position_id: u64,
    pub pool_type: u8,
}

#[event]
#[derive(Clone)]
pub struct RemoveCollateralEvent {
    pub owner: Pubkey,
    pub position: Pubkey,
    pub custody_mint: Pubkey,
    pub custody_seed: [u8; 32],
    pub side: u8,
    pub remove_amount_usd: u64,
    pub new_collateral_amount_usd: u64,
    pub leverage: u32,
    pub position_id: u64,
    pub pool_type: u8,
}

#[event]
#[derive(Clone)]
pub struct LiquidateEvent {
    pub owner: Pubkey,
    pub position: Pubkey,
    pub custody_mint: Pubkey,
    pub custody_seed: [u8; 32],
    pub side: u8,
    pub size_usd: u64,
    pub price: u64,
    pub collateral_amount_usd: u64,
    pub loss_usd: u64,
    pub borrow_fee_usd: u64,
    pub exit_fee_usd: u64,
    pub position_id: u64,
    pub funding_paid_usd: u64,
    pub funding_received_usd: u64,
    pub pool_type: u8,
    pub confiscated_collateral_usd: u64,
}

#[event]
#[derive(Clone)]
pub struct AddLockedStakeEvent {
    pub owner: Pubkey,
    pub staking: Pubkey,
    pub locked_stake_id: u64,
    pub amount: u64,
    pub locked_days: u32,
}

#[event]
#[derive(Clone)]
pub struct UpgradeLockedStakeEvent {
    pub owner: Pubkey,
    pub staking: Pubkey,
    pub locked_stake_id: u64,
    pub amount: Option<u64>,
    pub locked_days: Option<u32>,
}

#[event]
#[derive(Clone)]
pub struct FinalizeLockedStakeEvent {
    pub owner: Pubkey,
    pub staking: Pubkey,
    pub locked_stake_id: u64,
    pub early_exit: bool,
}

#[event]
#[derive(Clone)]
pub struct RemoveLockedStakeEvent {
    pub owner: Pubkey,
    pub staking: Pubkey,
    pub locked_stake_id: u64,
}

#[event]
#[derive(Clone)]
pub struct SetStopLossEvent {
    pub position_id: u64,
    pub stop_loss_limit_price: u64,
    pub close_position_price: Option<u64>,
    pub position_side: u8,
}

#[event]
#[derive(Clone)]
pub struct SetTakeProfitEvent {
    pub position_id: u64,
    pub take_profit_limit_price: u64,
    pub position_side: u8,
}

#[event]
#[derive(Clone)]
pub struct CancelStopLossEvent {
    pub position_id: u64,
    pub position_side: u8,
}

#[event]
#[derive(Clone)]
pub struct CancelTakeProfitEvent {
    pub position_id: u64,
    pub position_side: u8,
}
