use {
    crate::{math, oracle_price::OraclePrice},
    anchor_lang::prelude::*,
    anyhow::{anyhow, Result},
    bytemuck::{Pod, Zeroable},
};

pub const HOURS_PER_DAY: i64 = 24;
pub const SECONDS_PER_HOURS: i64 = 3600;

pub const MAX_RESOLVED_ROUNDS: usize = 32;
pub const ROUND_MIN_DURATION_HOURS: i64 = 6;
pub const ROUND_MIN_DURATION_SECONDS: i64 = ROUND_MIN_DURATION_HOURS * SECONDS_PER_HOURS;
pub const SECONDS_PER_MONTH: i64 = 30 * SECONDS_PER_HOURS * 24;
pub const MAX_ROUNDS_PER_MONTH: u64 = SECONDS_PER_MONTH as u64 / ROUND_MIN_DURATION_SECONDS as u64;

pub const MAX_CUSTODIES: usize = 8;

pub const MAX_STABLE_CUSTODY: usize = 2;
pub const MIN_INITIAL_LEVERAGE: u32 = 11_000; // BPS

pub const MAX_LOCKED_STAKE_COUNT: usize = 32;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy)]
pub struct ClosePositionLongParams {
    pub price: Option<u64>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy)]
pub struct ClosePositionShortParams {
    pub price: Option<u64>,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct LiquidateLongParams {}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct LiquidateShortParams {}

#[derive(AnchorSerialize, AnchorDeserialize, Copy, Clone)]
pub struct FinalizeLockedStakeParams {
    pub locked_stake_id: u64,
    pub early_exit: bool,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct ClaimStakesParams {
    pub locked_stake_indexes: Option<Vec<u8>>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, Debug, Default, Pod, Zeroable)]
#[repr(C)]
pub struct LimitedString {
    pub value: [u8; 31],
    pub length: u8,
}

#[derive(
    Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Default, Debug, Pod, Zeroable,
)]
#[repr(C)]
pub struct TradingStats {
    pub opened_position_count: u64,
    pub liquidated_position_count: u64,
    pub opening_average_leverage: u64,
    pub opening_size_usd: u64,
    pub profits_usd: u64,
    pub losses_usd: u64,
    pub fee_paid_usd: u64,
}

#[account(zero_copy)]
#[derive(Default, Debug)]
#[repr(C)]
pub struct UserProfile {
    pub bump: u8,
    pub _padding: [u8; 7],
    pub nickname: LimitedString,
    pub created_at: i64,
    pub owner: Pubkey,
    pub swap_count: u64,
    pub swap_volume_usd: u64,
    pub swap_fee_paid_usd: u64,
    pub short_stats: TradingStats,
    pub long_stats: TradingStats,
}

#[derive(
    Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Default, Debug, Pod, Zeroable,
)]
#[repr(C)]
pub struct StakingRound {
    pub start_time: i64,
    pub end_time: i64,
    pub rate: u64,
    pub total_stake: u64,
    pub total_claim: u64,
    pub lm_rate: u64,
    pub lm_total_stake: u64,
    pub lm_total_claim: u64,
}

#[account(zero_copy)]
#[derive(Default, Debug)]
#[repr(C)]
pub struct Staking {
    pub staking_type: u8,
    pub bump: u8,
    pub staked_token_vault_bump: u8,
    pub reward_token_vault_bump: u8,
    pub lm_reward_token_vault_bump: u8,
    pub reward_token_decimals: u8,
    pub staked_token_decimals: u8,
    pub initialized: u8,
    pub nb_locked_tokens: u64,
    pub nb_liquid_tokens: u64,
    pub staked_token_mint: Pubkey,
    pub resolved_reward_token_amount: u64,
    pub resolved_staked_token_amount: u64,
    pub resolved_lm_reward_token_amount: u64,
    pub resolved_lm_staked_token_amount: u64,
    pub current_staking_round: StakingRound,
    pub next_staking_round: StakingRound,
    pub resolved_staking_rounds: [StakingRound; MAX_RESOLVED_ROUNDS],
    pub registered_resolved_staking_round_count: u8,
    pub _padding: [u8; 3],
    pub lm_emission_potentiometer_bps: u16,
    pub months_elapsed_since_inception: u16,
    pub _padding_unsafe: [u8; 8],
    pub emission_amount_per_round_last_update: i64,
    pub current_month_emission_amount_per_round: u64,
}

#[account(zero_copy)]
#[derive(Default, Debug)]
#[repr(C)]
pub struct Cortex {
    pub bump: u8,
    pub transfer_authority_bump: u8,
    pub lm_token_bump: u8,
    pub governance_token_bump: u8,
    pub initialized: u8,
    pub fee_conversion_decimals: u8,
    pub _padding: [u8; 2],
    pub lm_token_mint: Pubkey,
    pub inception_time: i64,
    pub admin: Pubkey,
    pub fee_redistribution_mint: Pubkey,
    pub protocol_fee_recipient: Pubkey,
    pub pools: [Pubkey; 4],
    pub user_profiles_count: u64,
    pub governance_program: Pubkey,
    pub governance_realm: Pubkey,
    pub core_contributor_bucket_allocation: u64,
    pub foundation_bucket_allocation: u64,
    pub ecosystem_bucket_allocation: u64,
    pub core_contributor_bucket_vested_amount: u64,
    pub core_contributor_bucket_minted_amount: u64,
    pub foundation_bucket_vested_amount: u64,
    pub foundation_bucket_minted_amount: u64,
    pub ecosystem_bucket_vested_amount: u64,
    pub ecosystem_bucket_minted_amount: u64,
    pub genesis_liquidity_alp_amount: u64,
    pub unique_position_id_counter: u64,
}

impl Cortex {
    // BPS
    pub const BPS_DECIMALS: u8 = 4;
    pub const BPS_POWER: u128 = 10u64.pow(Self::BPS_DECIMALS as u32) as u128;
    // RATE
    pub const RATE_POWER: u128 = 10u64.pow(Self::RATE_DECIMALS as u32) as u128;
    pub const RATE_DECIMALS: u8 = 9;
    pub const PRICE_DECIMALS: u8 = 10;
    pub const USD_DECIMALS: u8 = 6;
    pub const LP_DECIMALS: u8 = Self::USD_DECIMALS;
    pub const LM_DECIMALS: u8 = Cortex::USD_DECIMALS;
    pub const GOVERNANCE_SHADOW_TOKEN_DECIMALS: u8 = Cortex::USD_DECIMALS;

    pub fn is_empty_account(account_info: &AccountInfo) -> Result<bool> {
        Ok(account_info.try_data_is_empty()? || account_info.try_lamports()? == 0)
    }
}

#[derive(
    Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Default, Debug, Pod, Zeroable,
)]
#[repr(C)]
pub struct TokenRatios {
    pub target: u16,
    pub min: u16,
    pub max: u16,
    pub _padding: [u8; 2],
}

#[derive(
    Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Default, Debug, Pod, Zeroable,
)]
#[repr(C)]
pub struct U128Split {
    pub high: u64,
    pub low: u64,
}

#[account(zero_copy)]
#[derive(Default, Debug)]
#[repr(C)]
pub struct Pool {
    pub bump: u8,
    pub lp_token_bump: u8,
    pub nb_stable_custody: u8,
    pub initialized: u8,
    pub allow_trade: u8,
    pub allow_swap: u8,
    pub liquidity_state: u8,
    pub registered_custody_count: u8,
    pub name: LimitedString,
    pub custodies: [Pubkey; MAX_CUSTODIES],
    pub _padding1: [u8; 32],
    pub whitelisted_swapper: Pubkey,
    pub ratios: [TokenRatios; MAX_CUSTODIES],
    pub _padding2: [u8; 16],
    pub aum_usd: U128Split,
    pub inception_time: i64,
    pub aum_soft_cap_usd: u64,
}

#[account(zero_copy)]
#[derive(Default, Debug)]
#[repr(C)]
pub struct Position {
    pub bump: u8,
    pub side: u8,
    pub take_profit_is_set: u8,
    pub stop_loss_is_set: u8,
    pub _padding_unsafe: [u8; 1],
    pub _padding: [u8; 3],
    pub owner: Pubkey,
    pub pool: Pubkey,
    pub custody: Pubkey,
    pub collateral_custody: Pubkey,
    pub open_time: i64,
    pub update_time: i64,
    pub price: u64,
    pub size_usd: u64,
    pub borrow_size_usd: u64,
    pub collateral_usd: u64,
    pub unrealized_interest_usd: u64,
    pub cumulative_interest_snapshot: U128Split,
    pub locked_amount: u64,
    pub collateral_amount: u64,
    pub exit_fee_usd: u64,
    pub liquidation_fee_usd: u64,
    pub id: u64,
    pub take_profit_limit_price: u64,
    pub _padding_unsafe3: [u8; 8],
    pub stop_loss_limit_price: u64,
    pub stop_loss_close_position_price: u64,
}

impl Position {
    pub const LEN: usize = 8 + std::mem::size_of::<Position>();
    pub fn get_side(&self) -> Side {
        // Consider value in the struct always good
        Side::try_from(self.side).unwrap()
    }

    pub fn take_profit_is_set(&self) -> bool {
        self.take_profit_is_set != 0
    }

    pub fn stop_loss_is_set(&self) -> bool {
        self.stop_loss_is_set != 0
    }

    pub fn take_profit_reached(&self, price: u64) -> bool {
        if self.take_profit_limit_price == 0 {
            return false;
        }

        if self.get_side() == Side::Long {
            price >= self.take_profit_limit_price
        } else {
            price <= self.take_profit_limit_price
        }
    }

    pub fn stop_loss_reached(&self, price: u64) -> bool {
        if self.stop_loss_limit_price == 0 {
            return false;
        }

        if self.get_side() == Side::Long {
            price <= self.stop_loss_limit_price
        } else {
            price >= self.stop_loss_limit_price
        }
    }

    pub fn stop_loss_slippage_ok(&self, price: u64) -> bool {
        // 0 means no slippage
        if self.stop_loss_close_position_price == 0 {
            return true;
        }

        if self.get_side() == Side::Long {
            price >= self.stop_loss_close_position_price
        } else {
            price <= self.stop_loss_close_position_price
        }
    }
}

#[derive(
    Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Default, Debug, Pod, Zeroable,
)]
#[repr(C)]
pub struct PricingParams {
    pub max_initial_leverage: u32,
    pub max_leverage: u32,
    pub max_position_locked_usd: u64,
    pub max_cumulative_short_position_size_usd: u64,
}

#[derive(
    Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Default, Debug, Pod, Zeroable,
)]
#[repr(C)]
pub struct Fees {
    pub swap_in: u16,
    pub swap_out: u16,
    pub stable_swap_in: u16,
    pub stable_swap_out: u16,
    pub add_liquidity: u16,
    pub remove_liquidity: u16,
    pub close_position: u16,
    pub liquidation: u16,
    pub fee_max: u16,
    pub _padding: [u8; 6],
    pub _padding2: u64,
}

#[derive(
    Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Default, Debug, Pod, Zeroable,
)]
#[repr(C)]
pub struct BorrowRateParams {
    pub max_hourly_borrow_interest_rate: u64,
}

#[derive(
    Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Default, Debug, Pod, Zeroable,
)]
#[repr(C)]
pub struct FeesStats {
    pub swap_usd: u64,
    pub add_liquidity_usd: u64,
    pub remove_liquidity_usd: u64,
    pub close_position_usd: u64,
    pub liquidation_usd: u64,
    pub borrow_usd: u64,
}

#[derive(
    Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Default, Debug, Pod, Zeroable,
)]
#[repr(C)]
pub struct VolumeStats {
    pub swap_usd: u64,
    pub add_liquidity_usd: u64,
    pub remove_liquidity_usd: u64,
    pub open_position_usd: u64,
    pub close_position_usd: u64,
    pub liquidation_usd: u64,
}

#[derive(
    Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Default, Debug, Pod, Zeroable,
)]
#[repr(C)]
pub struct TradeStats {
    pub profit_usd: u64,
    pub loss_usd: u64,
    pub oi_long_usd: u64,
    pub oi_short_usd: u64,
}

#[derive(
    Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Default, Debug, Pod, Zeroable,
)]
#[repr(C)]
pub struct Assets {
    pub collateral: u64,
    pub owned: u64,
    pub locked: u64,
}

#[derive(
    Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Default, Debug, Pod, Zeroable,
)]
#[repr(C)]
pub struct StableLockedAmountStat {
    pub custody: Pubkey,
    pub locked_amount: u64,
    pub _padding: [u8; 8],
}

#[derive(
    Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Default, Debug, Pod, Zeroable,
)]
#[repr(C)]
pub struct PositionsAccounting {
    pub open_positions: u64,
    pub size_usd: u64,
    pub borrow_size_usd: u64,
    pub locked_amount: u64,
    pub weighted_price: U128Split,
    pub total_quantity: U128Split,
    pub cumulative_interest_usd: u64,
    pub _padding: [u8; 8],
    pub cumulative_interest_snapshot: U128Split,
    pub exit_fee_usd: u64,
    pub stable_locked_amount: [StableLockedAmountStat; MAX_STABLE_CUSTODY],
}

#[derive(
    Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Default, Debug, Pod, Zeroable,
)]
#[repr(C)]
pub struct BorrowRateState {
    pub current_rate: u64,
    pub last_update: i64,
    pub cumulative_interest: U128Split,
}

#[account(zero_copy)]
#[derive(Default, Debug, PartialEq, AnchorSerialize, AnchorDeserialize)]
#[repr(C)]
pub struct Custody {
    pub bump: u8,
    pub token_account_bump: u8,
    pub allow_trade: u8,
    pub allow_swap: u8,
    pub decimals: u8,
    pub is_stable: u8,
    pub _padding: [u8; 2],
    pub pool: Pubkey,
    pub mint: Pubkey,
    pub token_account: Pubkey,
    pub oracle: Pubkey,
    pub trade_oracle: Pubkey,
    pub pricing: PricingParams,
    pub fees: Fees,
    pub borrow_rate: BorrowRateParams,
    pub collected_fees: FeesStats,
    pub volume_stats: VolumeStats,
    pub trade_stats: TradeStats,
    pub assets: Assets,
    pub long_positions: PositionsAccounting,
    pub short_positions: PositionsAccounting,
    pub borrow_rate_state: BorrowRateState,
}

impl Custody {
    pub fn is_stable(&self) -> bool {
        self.is_stable == 1
    }

    // Returns the interest amount that has accrued since the last position cumulative interest snapshot update
    pub fn get_interest_amount_usd(
        &self,
        position: &Position,
        current_time: i64,
    ) -> anyhow::Result<u64> {
        if position.borrow_size_usd == 0 {
            return Ok(0);
        }

        let cumulative_interest = self.get_cumulative_interest(current_time)?;

        let position_interest =
            if cumulative_interest > position.cumulative_interest_snapshot.to_u128() {
                cumulative_interest - position.cumulative_interest_snapshot.to_u128()
            } else {
                return Ok(0);
            };

        math::checked_as_u64(
            (position_interest * position.borrow_size_usd as u128) / Cortex::RATE_POWER,
        )
    }

    pub fn get_cumulative_interest(&self, current_time: i64) -> anyhow::Result<u128> {
        if current_time > self.borrow_rate_state.last_update {
            let cumulative_interest = math::checked_ceil_div(
                (current_time - self.borrow_rate_state.last_update) as u128
                    * self.borrow_rate_state.current_rate as u128,
                3_600,
            )?;

            Ok(self.borrow_rate_state.cumulative_interest.to_u128() + cumulative_interest)
        } else {
            Ok(self.borrow_rate_state.cumulative_interest.to_u128())
        }
    }

    pub fn get_collective_position(&self, side: Side) -> Result<Position> {
        let accounting = if side == Side::Long {
            &self.long_positions
        } else {
            &self.short_positions
        };

        if accounting.open_positions > 0 {
            Ok(Position {
                side: side.into(),
                price: if accounting.total_quantity.to_u128() > 0 {
                    math::checked_as_u64(
                        accounting.weighted_price.to_u128() / accounting.total_quantity.to_u128(),
                    )?
                } else {
                    0
                },
                size_usd: accounting.size_usd,
                borrow_size_usd: accounting.borrow_size_usd,
                unrealized_interest_usd: accounting.cumulative_interest_usd,
                cumulative_interest_snapshot: accounting.cumulative_interest_snapshot,
                locked_amount: accounting.locked_amount,
                exit_fee_usd: accounting.exit_fee_usd,
                ..Position::default()
            })
        } else {
            Ok(Position::default())
        }
    }
}

#[derive(PartialEq, Copy, Clone, Default, Debug)]
pub enum Side {
    None = 0,
    #[default]
    Long = 1,
    Short = 2,
}

impl From<Side> for u8 {
    fn from(val: Side) -> Self {
        match val {
            Side::None => 0,
            Side::Long => 1,
            Side::Short => 2,
        }
    }
}

impl TryFrom<u8> for Side {
    type Error = anyhow::Error;

    fn try_from(value: u8) -> std::result::Result<Self, Self::Error> {
        Ok(match value {
            0 => Side::None,
            1 => Side::Long,
            2 => Side::Short,
            _ => anyhow::bail!("Invalid side value"),
        })
    }
}

#[derive(PartialEq, Copy, Clone, Debug, Default)]
pub enum StakingType {
    #[default]
    LM = 1,
    LP = 2,
}

impl From<StakingType> for u8 {
    fn from(val: StakingType) -> Self {
        match val {
            StakingType::LM => 1,
            StakingType::LP => 2,
        }
    }
}

impl TryFrom<u8> for StakingType {
    type Error = anyhow::Error;

    fn try_from(value: u8) -> std::result::Result<Self, Self::Error> {
        Ok(match value {
            1 => StakingType::LM,
            2 => StakingType::LP,
            // Return an error if unknown value
            _ => anyhow::bail!("Invalid staking type"),
        })
    }
}

#[account(zero_copy)]
#[derive(Default, Debug, PartialEq, AnchorSerialize, AnchorDeserialize)]
#[repr(C)]
pub struct UserStaking {
    pub bump: u8,
    pub _unused_unsafe: [u8; 1],
    pub staking_type: u8,
    pub _padding: [u8; 5],
    pub locked_stake_id_counter: u64,
    pub liquid_stake: LiquidStake,
    pub locked_stakes: [LockedStake; MAX_LOCKED_STAKE_COUNT],
}

impl UserStaking {
    pub fn get_staking_type(&self) -> StakingType {
        StakingType::try_from(self.staking_type).unwrap()
    }
}

#[derive(
    Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Default, Debug, Zeroable, Pod,
)]
#[repr(C)]
pub struct LiquidStake {
    pub amount: u64,
    pub stake_time: i64,
    pub claim_time: i64,
    pub overlap_time: i64,
    pub overlap_amount: u64,
}

#[derive(
    Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Default, Debug, Zeroable, Pod,
)]
#[repr(C)]
pub struct LockedStake {
    pub amount: u64,
    pub stake_time: i64,
    pub claim_time: i64,
    pub end_time: i64,
    pub lock_duration: u64,
    pub reward_multiplier: u32,
    pub lm_reward_multiplier: u32,
    pub vote_multiplier: u32,
    pub qualified_for_rewards_in_resolved_round_count: u32,
    pub amount_with_reward_multiplier: u64,
    pub amount_with_lm_reward_multiplier: u64,
    pub resolved: u8,
    pub _padding2: [u8; 7],
    // History: was a thread id before while using Sablier, now used as a unique random id for each stake
    pub id: u64,
    pub early_exit: u8,
    pub _padding3: [u8; 7],
    pub early_exit_fee: u64,
    pub is_genesis: u8,
    pub _padding4: [u8; 7],
    pub genesis_claim_time: i64,
}

/// Specific to the codebase, this struct is used to store the profit and loss of a position.
#[derive(Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Default, Debug)]
pub struct ProfitAndLoss {
    pub profit_usd: u64,
    pub loss_usd: u64,
    // Unrealized
    pub exit_fee: u64,
    pub exit_fee_usd: u64,
    pub borrow_fee_usd: u64,
}

pub struct StableCustodyInfo {
    pub custody: Pubkey,
    pub token_price: OraclePrice,
    pub decimals: u8,
}

impl LockedStake {
    pub const FEE_RATE_UPPER_CAP: u128 = 400_000_000; // 40%
    pub const FEE_RATE_LOWER_CAP: u128 = 50_000_000; // 5%

    pub fn is_initialized(&self) -> bool {
        self.amount > 0
    }

    pub fn is_genesis(&self) -> bool {
        self.is_genesis != 0
    }

    pub fn is_resolved(&self) -> bool {
        self.resolved != 0
    }

    pub fn is_early_exit(&self) -> bool {
        self.early_exit != 0
    }

    pub fn is_established(&self) -> bool {
        self.qualified_for_rewards_in_resolved_round_count >= 1
    }

    pub fn qualifies_for_rewards_from(&self, staking_round: &StakingRound) -> bool {
        self.stake_time > 0
            && self.stake_time < staking_round.start_time
            && (self.claim_time == 0 || self.claim_time < staking_round.start_time)
            && staking_round.end_time <= self.end_time
            && staking_round.start_time < self.end_time
    }

    pub fn has_ended(&self, current_time: i64) -> anyhow::Result<bool> {
        if self.stake_time == 0 {
            anyhow::bail!("Invalid stake state");
        }
        if !self.is_initialized() {
            anyhow::bail!("Invalid stake state");
        }
        Ok(self.end_time <= current_time)
    }
}

pub enum LeverageCheckStatus {
    Ok(u64),
    MaxLeverageExceeded(u64),
}

impl Pool {
    // Utility function used to avoid dealing with blank spots in custodies array
    pub fn get_custodies(&self) -> Vec<Pubkey> {
        let mut custodies: Vec<Pubkey> = vec![];

        for &custody in &self.custodies {
            if custody != Pubkey::default() {
                custodies.push(custody);
            }
        }
        custodies
    }

    #[allow(clippy::too_many_arguments)]
    pub fn get_leverage(
        &self,
        position: &Position,
        token_trade_price: &OraclePrice,
        collateral_token_price: &OraclePrice,
        collateral_custody: &Custody,
        current_time: i64,
        // true: calculate the PnL with liquidation_fee_usd
        // false: calculate the PnL with exit_fee_usd
        liquidation: bool,
    ) -> Result<u64> {
        // Do not accept 0 price
        if position.price == 0 {
            return Ok(u64::MAX);
        }

        let pnl = self.get_pnl_usd(
            position,
            token_trade_price,
            collateral_token_price,
            collateral_custody,
            current_time,
            liquidation,
        )?;

        let current_margin_usd = (|| {
            // Nor profits or losses
            if pnl.profit_usd == 0 && pnl.loss_usd == 0 {
                return position.collateral_usd;
            }

            // Profit
            if pnl.profit_usd > 0 {
                return position.collateral_usd + pnl.profit_usd;
            }

            // Partial loss
            if pnl.loss_usd <= position.collateral_usd {
                return position.collateral_usd - pnl.loss_usd;
            }

            // Total loss
            0
        })();

        if current_margin_usd > 0 {
            math::checked_as_u64(
                (position.size_usd as u128 * Cortex::BPS_POWER) / current_margin_usd as u128,
            )
        } else {
            Ok(u64::MAX)
        }
    }

    /// Checks if leverage is within the limits (and return the value for events)
    #[allow(clippy::too_many_arguments)]
    pub fn check_leverage(
        &self,
        position: &Position,
        token_trade_price: &OraclePrice,
        custody: &Custody,
        collateral_token_price: &OraclePrice,
        collateral_custody: &Custody,
        current_time: i64,
        // Every time position manually changes, use true
        initial: bool,
    ) -> Result<LeverageCheckStatus> {
        // Idea is to check the leverage considering the highest fee when not creating a new position
        // Position should always be able to pay liquidation fee
        let use_liquidation_fee_usd_for_pnl_calculation =
            !initial && position.liquidation_fee_usd > position.exit_fee_usd;

        let leverage = self.get_leverage(
            position,
            token_trade_price,
            collateral_token_price,
            collateral_custody,
            current_time,
            use_liquidation_fee_usd_for_pnl_calculation,
        )?;

        if leverage > custody.pricing.max_leverage as u64 {
            return Ok(LeverageCheckStatus::MaxLeverageExceeded(leverage));
        }

        Ok(LeverageCheckStatus::Ok(leverage))
    }

    pub fn get_liquidation_price(
        &self,
        position: &Position,
        custody: &Custody,
        collateral_custody: &Custody,
        current_time: i64,
    ) -> Result<u64> {
        // liq_price = pos_price +- (collateral + unreal_profit - unreal_loss - exit_fee - interest - size/max_leverage) * pos_price / size

        if position.size_usd == 0 || position.price == 0 {
            return Ok(0);
        }

        let total_unrealized_interest_usd = collateral_custody
            .get_interest_amount_usd(position, current_time)?
            + position.unrealized_interest_usd;
        let unrealized_loss_usd = position.liquidation_fee_usd + total_unrealized_interest_usd;

        let mut max_loss_usd = math::checked_as_u64(
            (position.size_usd as u128 * Cortex::BPS_POWER) / custody.pricing.max_leverage as u128,
        )?;

        max_loss_usd += unrealized_loss_usd;

        let margin_usd = position.collateral_usd;

        let max_price_diff = if max_loss_usd >= margin_usd {
            max_loss_usd - margin_usd
        } else {
            margin_usd - max_loss_usd
        };

        let max_price_diff = math::scale_to_exponent(
            max_price_diff,
            -(Cortex::USD_DECIMALS as i32),
            -(Cortex::PRICE_DECIMALS as i32),
        )?;

        let position_size_usd = math::scale_to_exponent(
            position.size_usd,
            -(Cortex::USD_DECIMALS as i32),
            -(Cortex::PRICE_DECIMALS as i32),
        )?;

        let max_price_diff = math::checked_as_u64(
            (max_price_diff as u128 * position.price as u128) / position_size_usd as u128,
        )?;

        if position.get_side() == Side::Long {
            if max_loss_usd >= margin_usd {
                Ok(position.price + max_price_diff)
            } else if position.price > max_price_diff {
                Ok(position.price - max_price_diff)
            } else {
                Ok(0)
            }
        } else if max_loss_usd >= margin_usd {
            if position.price > max_price_diff {
                Ok(position.price - max_price_diff)
            } else {
                Ok(0)
            }
        } else {
            Ok(position.price + max_price_diff)
        }
    }

    // Note: PnL is a unrealized PnL
    // Note that the PnL is an estimation and can be different when the position is closed due to exact fees not known until actual close (this estimation is calculated conservatively)
    #[allow(clippy::too_many_arguments)]
    pub fn get_pnl_usd(
        &self,
        position: &Position,
        token_trade_price: &OraclePrice,
        collateral_token_price: &OraclePrice,
        collateral_custody: &Custody,
        current_time: i64,
        liquidation: bool,
    ) -> Result<ProfitAndLoss> {
        if position.size_usd == 0 || position.price == 0 {
            return Ok(ProfitAndLoss::default());
        }

        // Use High/Low price to protect the pool
        let exit_price = match Side::try_from(position.side)? {
            Side::Long => token_trade_price.price,
            Side::Short => token_trade_price.price,
            Side::None => return Err(anyhow!("Invalid position state")),
        };

        let exit_fee_usd: u64 = if liquidation {
            position.liquidation_fee_usd
        } else {
            position.exit_fee_usd
        };

        // Marginal but uses low price for safety
        let exit_fee = collateral_token_price
            .low()
            .get_token_amount(exit_fee_usd, collateral_custody.decimals)?;

        let total_unrealized_interest_usd = collateral_custody
            .get_interest_amount_usd(position, current_time)?
            + position.unrealized_interest_usd;

        let unrealized_loss_usd = exit_fee_usd + total_unrealized_interest_usd;

        let (price_diff_profit, price_diff_loss) = if position.get_side() == Side::Long {
            if exit_price > position.price {
                (exit_price - position.price, 0u64)
            } else {
                (0u64, position.price - exit_price)
            }
        } else if exit_price < position.price {
            (position.price - exit_price, 0u64)
        } else {
            (0u64, exit_price - position.price)
        };

        if price_diff_profit > 0 {
            let potential_profit_usd = math::checked_as_u64(
                (position.size_usd as u128 * price_diff_profit as u128) / position.price as u128,
            )?;

            if potential_profit_usd >= unrealized_loss_usd {
                let cur_profit_usd = potential_profit_usd - unrealized_loss_usd;

                let max_profit_usd = if current_time <= position.open_time {
                    0
                } else {
                    collateral_token_price
                        .low()
                        .get_asset_amount_usd(position.locked_amount, collateral_custody.decimals)?
                };

                Ok(ProfitAndLoss {
                    profit_usd: std::cmp::min(max_profit_usd, cur_profit_usd),
                    loss_usd: 0u64,
                    exit_fee,
                    exit_fee_usd,
                    borrow_fee_usd: total_unrealized_interest_usd,
                })
            } else {
                Ok(ProfitAndLoss {
                    profit_usd: 0u64,
                    loss_usd: unrealized_loss_usd - potential_profit_usd,
                    exit_fee,
                    exit_fee_usd,
                    borrow_fee_usd: total_unrealized_interest_usd,
                })
            }
        } else {
            let mut potential_loss_usd = math::checked_as_u64(math::checked_ceil_div::<u128>(
                position.size_usd as u128 * price_diff_loss as u128,
                position.price as u128,
            )?)?;

            potential_loss_usd += unrealized_loss_usd;

            Ok(ProfitAndLoss {
                profit_usd: 0u64,
                loss_usd: potential_loss_usd,
                exit_fee,
                exit_fee_usd,
                borrow_fee_usd: total_unrealized_interest_usd,
            })
        }
    }

    pub fn get_fee_amount(fee: u16, amount: u64) -> Result<u64> {
        if fee == 0 || amount == 0 {
            return Ok(0);
        }

        math::checked_as_u64(math::checked_ceil_div::<u128>(
            amount as u128 * fee as u128,
            Cortex::BPS_POWER,
        )?)
    }
}
