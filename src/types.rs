use {
    crate::{
        limited_string::LimitedString,
        math,
        oracle::{BatchPrices, MultiBatchPrices, OraclePrice, SwitchboardUpdateParams},
    },
    anchor_lang::prelude::*,
    anyhow::Result,
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
pub const MAX_SYNTHETIC_CUSTODIES: usize = 32;
pub const MAX_AUTONOM_STOCKS_CUSTODIES: usize = 32;

pub const MAX_STABLE_CUSTODY: usize = 1;
pub const MIN_INITIAL_LEVERAGE: u32 = 11_000; // BPS

pub const MAX_LOCKED_STAKE_COUNT: usize = 32;

// When the genesis lock ends for main_pool on mainnet (used as AUM vampire breakpoint)
pub const FULLY_ALP_LIQUID_BREAKPOINT_TIMESTAMP: i64 = 1742385600;

// =============================================================================
// Instruction param structs (release/39-postaudit shape)
// =============================================================================

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct ClosePositionLongParams {
    pub price: Option<u64>,
    // Do not do that, except if you know the onchain price is fresh (i.e you did just update the price in a prior instruction or this is CPI)
    pub oracle_prices: Option<BatchPrices>,
    pub multi_oracle_prices: Option<MultiBatchPrices>,
    // Amount of size to close in bps, 10000 = 1%, 1000000 = 100%
    pub percentage: u64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct ClosePositionShortParams {
    pub price: Option<u64>,
    pub oracle_prices: Option<BatchPrices>,
    pub multi_oracle_prices: Option<MultiBatchPrices>,
    pub percentage: u64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub struct LiquidateLongParams {
    pub oracle_prices: Option<BatchPrices>,
    pub multi_oracle_prices: Option<MultiBatchPrices>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub struct LiquidateShortParams {
    pub oracle_prices: Option<BatchPrices>,
    pub multi_oracle_prices: Option<MultiBatchPrices>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Copy, Clone)]
pub struct FinalizeLockedStakeParams {
    pub locked_stake_id: u64,
    pub early_exit: bool,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct ClaimStakesParams {
    pub locked_stake_indexes: Option<Vec<u8>>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct UpdatePoolAumParams {
    pub oracle_prices: Option<BatchPrices>,
    pub multi_oracle_prices: Option<MultiBatchPrices>,
    pub switchboard_oracle_prices: Option<SwitchboardUpdateParams>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct UpdateOracleParams {
    pub oracle_prices: Option<BatchPrices>,
    pub multi_oracle_prices: Option<MultiBatchPrices>,
    pub switchboard_oracle_prices: Option<SwitchboardUpdateParams>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct AutonomMarketOpeningParams {
    pub opening_data: crate::autonom_market_opening_data::AutonomMarketOpeningData,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct DistributeFeesParams {
    pub oracle_prices: Option<BatchPrices>,
    pub multi_oracle_prices: Option<MultiBatchPrices>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct OpenPositionWithSwapParams {
    pub price: u64,
    pub collateral: u64,
    pub leverage: u32, // in BPS
    pub referrer: Option<Pubkey>,
    pub oracle_prices: Option<BatchPrices>,
    pub multi_oracle_prices: Option<MultiBatchPrices>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct ExecuteLimitOrderLongParams {
    pub id: u64,
    pub oracle_prices: Option<BatchPrices>,
    pub multi_oracle_prices: Option<MultiBatchPrices>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct ExecuteLimitOrderShortParams {
    pub id: u64,
    pub oracle_prices: Option<BatchPrices>,
    pub multi_oracle_prices: Option<MultiBatchPrices>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub struct AddLiquidityParams {
    pub amount_in: u64,
    pub min_lp_amount_out: u64,
    pub oracle_prices: Option<BatchPrices>,
    pub multi_oracle_prices: Option<MultiBatchPrices>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct RemoveLiquidityParams {
    pub lp_amount_in: u64,
    pub min_amount_out: u64,
    pub oracle_prices: Option<BatchPrices>,
    pub multi_oracle_prices: Option<MultiBatchPrices>,
}

// =============================================================================
// Deprecated legacy user profile (release/37)
// =============================================================================

#[deprecated]
#[allow(deprecated)]
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

#[deprecated]
#[allow(deprecated)]
#[account(zero_copy)]
#[derive(Default, Debug)]
#[repr(C)]
pub struct UserProfileV1 {
    pub bump: u8,
    pub version: u8,
    pub _padding: [u8; 6],
    pub nickname: LimitedString,
    pub created_at: i64,
    //
    pub owner: Pubkey,
    //
    pub swap_count: u64,
    pub swap_volume_usd: u64,
    pub swap_fee_paid_usd: u64,
    //
    pub short_stats: TradingStats,
    pub long_stats: TradingStats,
}

#[allow(deprecated)]
impl UserProfileV1 {
    pub const LEN: usize = 8 + std::mem::size_of::<UserProfileV1>();
}

// =============================================================================
// UserProfile (release/39-postaudit layout)
// =============================================================================

#[account(zero_copy)]
#[derive(Debug)]
#[repr(C)]
pub struct UserProfile {
    pub bump: u8,
    pub version: u8,
    pub profile_picture: u8, // Enum of profile pictures
    pub wallpaper: u8,       // Enum of wallpapers
    pub title: u8,           // Enum of title
    pub team: u8,
    pub continent: u8,
    pub _padding: u8,
    pub nickname: LimitedString,
    pub created_at: i64,
    pub owner: Pubkey,
    pub achievements: [u8; 256], // Enough to fit 255 achievements + be a multiple of 8 for memory alignment
    pub referrer_profile: Pubkey, // Pubkey of the referrer profile (not the wallet!)
    pub claimable_referral_fee_usd: u64, // Referral fee that can be claimed by the referrer right now
    pub total_referral_fee_usd: u64,     // Total referral fee earned by the referrer
    pub rolling_trade_window_start: i64,
    pub trades_in_window: u16,
    pub _padding2: [u8; 6],
}

impl UserProfile {
    pub const LEN: usize = 8 + std::mem::size_of::<UserProfile>();
}

// =============================================================================
// Staking rounds and Staking account
// =============================================================================

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

#[derive(
    Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Default, Debug, Pod, Zeroable,
)]
#[repr(C)]
pub struct NextStakingRound {
    pub total_stake: u64,
    pub _padding1: [u8; 16],
    pub lm_total_stake: u64,
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
    #[deprecated]
    pub current_staking_round_liquid_rewards_usd: u64,
    pub _padding1: [u8; 16],
    pub next_staking_round: NextStakingRound,
    pub _padding2: [u8; 8],
    pub resolved_staking_rounds: [StakingRound; MAX_RESOLVED_ROUNDS],
    pub registered_resolved_staking_round_count: u8,
    pub _padding3: [u8; 3],
    pub lm_emission_potentiometer_bps: u16,
    pub months_elapsed_since_inception: u16,
    pub _padding_unsafe: [u8; 8],
    pub emission_amount_per_round_last_update: i64,
    pub current_month_emission_amount_per_round: u64,
}

// =============================================================================
// Cortex (release/39-postaudit layout with admin timelock)
// =============================================================================

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
    // Two-step admin transfer with timelock (Fidesium C1)
    pub pending_admin: Pubkey,
    pub admin_transfer_request_time: i64,
    // Unused — delay is hardcoded to DEFAULT_ADMIN_TRANSFER_DELAY_SECONDS
    pub admin_transfer_min_delay_seconds: i64,
}

impl Cortex {
    pub const LEN: usize = 8 + std::mem::size_of::<Cortex>();
    // Lamports
    pub const AUTOMATION_EXECUTION_FEE: u64 = 300_000;
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
    // Admin transfer timelock (48 hours)
    pub const DEFAULT_ADMIN_TRANSFER_DELAY_SECONDS: i64 = 172800;

    pub fn is_empty_account(account_info: &AccountInfo) -> Result<bool> {
        Ok(account_info.try_data_is_empty()? || account_info.try_lamports()? == 0)
    }
}

// =============================================================================
// Shared helpers: TokenRatios, U128Split
// =============================================================================

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

// =============================================================================
// Pool-related enums (release/39 additions)
// =============================================================================

#[derive(PartialEq, Copy, Clone, Default, Debug)]
#[repr(u8)]
pub enum PoolLiquidityState {
    #[default]
    GenesisLiquidity = 0,
    Idle = 1,
    Active = 2,
}

impl From<PoolLiquidityState> for u8 {
    fn from(val: PoolLiquidityState) -> Self {
        match val {
            PoolLiquidityState::GenesisLiquidity => 0,
            PoolLiquidityState::Idle => 1,
            PoolLiquidityState::Active => 2,
        }
    }
}

impl TryFrom<u8> for PoolLiquidityState {
    type Error = anyhow::Error;

    fn try_from(value: u8) -> std::result::Result<Self, Self::Error> {
        Ok(match value {
            0 => PoolLiquidityState::GenesisLiquidity,
            1 => PoolLiquidityState::Idle,
            2 => PoolLiquidityState::Active,
            _ => anyhow::bail!("Invalid pool liquidity state: {}", value),
        })
    }
}

#[derive(PartialEq, Copy, Clone, Default, Debug)]
#[repr(u8)]
pub enum PoolType {
    #[default]
    GMX = 0,
    Autonom = 1,
}

impl From<PoolType> for u8 {
    fn from(val: PoolType) -> Self {
        match val {
            PoolType::GMX => 0,
            PoolType::Autonom => 1,
        }
    }
}

impl TryFrom<u8> for PoolType {
    type Error = anyhow::Error;

    fn try_from(value: u8) -> std::result::Result<Self, Self::Error> {
        Ok(match value {
            0 => PoolType::GMX,
            1 => PoolType::Autonom,
            _ => anyhow::bail!("Invalid pool type: {}", value),
        })
    }
}

impl PoolType {
    pub const fn supports_synthetics(&self) -> bool {
        matches!(self, PoolType::Autonom)
    }

    pub const fn has_market_hours(&self) -> bool {
        matches!(self, PoolType::Autonom)
    }

    pub const fn uses_split_fees(&self) -> bool {
        matches!(self, PoolType::Autonom)
    }
}

#[repr(u8)]
#[derive(Copy, Clone, PartialEq, Eq, Debug)]
pub enum PoolVersion {
    V1 = 0,
    V2 = 2,
}

impl PoolVersion {
    pub const fn latest() -> Self {
        PoolVersion::V2
    }
}

#[derive(Copy, Clone, PartialEq, Eq, Debug)]
pub enum LeverageCheckType {
    Initial,
    AddCollateral,
    RemoveCollateral,
    IncreasePosition,
    Liquidate,
}

// =============================================================================
// MultiOracleConfig (release/39, Fidesium H2: 16 -> 80 bytes)
// =============================================================================

#[derive(Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Debug, Pod, Zeroable)]
#[repr(C)]
pub struct MultiOracleConfig {
    // [primary, secondary, tertiary]
    pub providers: [u8; 3],
    pub min_agree: u8,
    // Price difference threshold in BPS (e.g., 100 = 1%)
    pub price_diff_threshold_bps: u16,
    // Staleness threshold in seconds
    pub staleness_seconds: u16,
    // Fidesium H2 (release/39): togglable asymmetric liquidation defense
    pub asymmetric_liquidation: u8,
    // Fidesium H2 (release/39): togglable circuit breaker defense
    pub circuit_breaker_enabled: u8,
    pub circuit_breaker_seconds: u16,
    pub _padding: [u8; 68],
}

impl Default for MultiOracleConfig {
    fn default() -> Self {
        Self::default_for_gmx_pool()
    }
}

impl MultiOracleConfig {
    pub fn default_for_gmx_pool() -> Self {
        Self {
            providers: [
                crate::oracle::OracleProvider::Switchboard as u8,
                crate::oracle::OracleProvider::ChaosLabs as u8,
                crate::oracle::OracleProvider::Autonom as u8,
            ],
            min_agree: 2,
            price_diff_threshold_bps: 100,
            staleness_seconds: 7,
            asymmetric_liquidation: 1,
            circuit_breaker_enabled: 1,
            circuit_breaker_seconds: 300,
            _padding: [0u8; 68],
        }
    }

    pub fn default_for_autonom_pool() -> Self {
        Self {
            providers: [
                crate::oracle::OracleProvider::Autonom as u8,
                crate::oracle::OracleProvider::Switchboard as u8,
                crate::oracle::OracleProvider::ChaosLabs as u8,
            ],
            min_agree: 1,
            price_diff_threshold_bps: 100,
            staleness_seconds: 7,
            asymmetric_liquidation: 0,
            circuit_breaker_enabled: 0,
            circuit_breaker_seconds: 0,
            _padding: [0u8; 68],
        }
    }

    pub fn is_valid(&self) -> bool {
        let min_agree_ok = self.min_agree >= 1 && self.min_agree <= 3;
        let providers_ok = {
            let a = self.providers[0];
            let b = self.providers[1];
            let c = self.providers[2];
            a != b && a != c && b != c
        };
        let staleness_ok = self.staleness_seconds > 0;
        let circuit_breaker_ok =
            self.circuit_breaker_enabled != 1 || self.circuit_breaker_seconds > 0;
        min_agree_ok && providers_ok && staleness_ok && circuit_breaker_ok
    }

    pub fn primary(&self) -> Result<crate::oracle::OracleProvider> {
        crate::oracle::OracleProvider::try_from(self.providers[0])
    }

    pub fn secondary(&self) -> Result<crate::oracle::OracleProvider> {
        crate::oracle::OracleProvider::try_from(self.providers[1])
    }

    pub fn tertiary(&self) -> Result<crate::oracle::OracleProvider> {
        crate::oracle::OracleProvider::try_from(self.providers[2])
    }
}

// =============================================================================
// PositionExitFeeConfig (release/38+)
// =============================================================================

#[derive(
    Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Default, Debug, Zeroable, Pod,
)]
#[repr(C)]
pub struct PositionExitFeeConfig {
    // 0 = disabled, 1 = enabled
    pub enabled: u8,
    pub _padding0: [u8; 7],

    // Hard errors when closing positions
    pub min_position_open_time_seconds: u64,
    pub min_position_update_time_before_close_seconds: u64,

    // Age thresholds for multiplier tiers (in seconds)
    pub age_tier_1_seconds: u64,
    pub age_tier_2_seconds: u64,
    pub age_tier_3_seconds: u64,

    // Fee multipliers in BPS (10_000 = 1.0x)
    pub multiplier_tier_1_bps: u32,
    pub multiplier_tier_2_bps: u32,
    pub multiplier_tier_3_bps: u32,
    pub multiplier_after_tier_3_bps: u32,
}

impl PositionExitFeeConfig {
    pub const MULTIPLIER_BPS_BASE: u32 = 10_000;

    pub fn default_for_release_38() -> Self {
        Self {
            enabled: 1,
            _padding0: [0u8; 7],
            min_position_open_time_seconds: 240,
            min_position_update_time_before_close_seconds: 120,
            age_tier_1_seconds: 7 * 60,
            age_tier_2_seconds: 15 * 60,
            age_tier_3_seconds: 30 * 60,
            multiplier_tier_1_bps: 150_000,
            multiplier_tier_2_bps: 30_000,
            multiplier_tier_3_bps: 15_000,
            multiplier_after_tier_3_bps: Self::MULTIPLIER_BPS_BASE,
        }
    }

    pub fn get_exit_fee_multiplier_bps(&self, position_age_seconds: u64) -> u32 {
        if self.enabled == 0 {
            return Self::MULTIPLIER_BPS_BASE;
        }

        if position_age_seconds <= self.age_tier_1_seconds {
            self.multiplier_tier_1_bps
        } else if position_age_seconds <= self.age_tier_2_seconds {
            self.multiplier_tier_2_bps
        } else if position_age_seconds <= self.age_tier_3_seconds {
            self.multiplier_tier_3_bps
        } else {
            self.multiplier_after_tier_3_bps
        }
    }
}

// =============================================================================
// Pool (release/39-postaudit layout)
// =============================================================================

#[account(zero_copy)]
#[derive(Debug)]
#[repr(C)]
pub struct Pool {
    pub bump: u8,
    pub lp_token_bump: u8,
    pub nb_stable_custody: u8,
    pub initialized: u8,
    pub allow_trade: u8,
    pub allow_swap: u8,
    pub liquidity_state: u8, // PoolLiquidityState
    pub registered_custody_count: u8,
    pub name: LimitedString,
    pub custodies: [Pubkey; MAX_CUSTODIES],
    pub fees_debt_usd: u64, // Doesn't include the referrers_fee_debt_usd
    pub referrers_fee_debt_usd: u64,
    pub cumulative_referrer_fee_usd: u64,
    pub lp_token_price_usd: u64,
    pub whitelisted_swapper: Pubkey,
    pub ratios: [TokenRatios; MAX_CUSTODIES],
    pub last_aum_and_lp_token_price_usd_update: i64,
    pub unique_limit_order_id_counter: u64,
    pub aum_usd: U128Split,
    pub inception_time: i64,
    pub aum_soft_cap_usd: u64,
    //
    // Exit fee multiplier for positions that are open and closed aggressively
    pub position_exit_fee_config: PositionExitFeeConfig,
    //
    // Timestamp of the last LP deposit - prevents same-second LP sandwich attacks
    pub last_lp_deposit_time: i64,
    //
    // release/39 (Autonom) fields - consumes release/38 pool reserved bytes
    pub pool_type: u8, // PoolType
    pub oracle_provider: u8, // OracleProvider
    pub registered_synthetic_custody_count: u8,
    pub version: u8, // PoolVersion
    pub _padding1: [u8; 4],
    //
    // Autonom stock market window (only relevant for Autonom pools)
    pub market_open_timestamp: i64,
    pub market_close_timestamp: i64,
    pub market_close_event_timestamp: i64,
    pub market_close_affected_feeds: [u8; MAX_AUTONOM_STOCKS_CUSTODIES],
    //
    // Autonom fee split (BPS, 10_000 = 100%)
    pub lp_fee_share_bps: u16,
    pub lm_fee_share_bps: u16,
    pub referrer_fee_share_bps: u16,
    pub protocol_fee_share_bps: u16,
    pub manager_fee_share_bps: u16,
    pub _padding2: [u8; 6],
    //
    pub manager_fee_recipient: Pubkey,
    pub manager_fee_debt_usd: u64,
    pub lm_fee_debt_usd: u64,
    pub protocol_fee_debt_usd: u64,
    //
    pub cumulative_protocol_fee_usd: u64,
    pub cumulative_lm_fee_usd: u64,
    pub cumulative_manager_fee_usd: u64,
    pub cumulative_lp_fee_usd: u64,
    //
    // release/39 multi-oracle config
    pub multi_oracle_config: MultiOracleConfig,
    //
    pub synthetic_custodies: [Pubkey; MAX_SYNTHETIC_CUSTODIES],
    //
    // Fidesium H2: reduced from 768 to 704 (MultiOracleConfig grew by 64 bytes: 16 -> 80)
    pub _reserved: [u8; 704],
}

impl Default for Pool {
    fn default() -> Self {
        // Pool is too large to derive Default without hitting array-default
        // trait-bound issues; use the zeroed form for off-chain defaulting.
        unsafe { std::mem::zeroed() }
    }
}

// =============================================================================
// Position (release/39-postaudit with VFR fields)
// =============================================================================

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
    pub paid_interest_usd: u64,
    pub stop_loss_limit_price: u64,
    pub stop_loss_close_position_price: u64,
    // Virtual Funding Rate tracking (release/39)
    pub cumulative_long_to_short_snapshot: U128Split,
    pub cumulative_short_to_long_snapshot: U128Split,
    pub unrealized_funding_paid_usd: u64,
    pub unrealized_funding_received_usd: u64,
    // Reserved space for future upgrades
    pub _reserved: [[u8; 32]; 4],
}

impl Position {
    pub const LEN: usize = 8 + std::mem::size_of::<Position>();

    pub fn get_side(&self) -> Side {
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

// =============================================================================
// Custody sub-structures (release/39-postaudit)
// =============================================================================

#[derive(
    Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Default, Debug, Pod, Zeroable,
)]
#[repr(C)]
pub struct PricingParams {
    pub max_initial_leverage: u32,
    pub max_leverage: u32,
    pub max_position_locked_usd: u64,
    pub max_cumulative_short_position_size_usd: u64,
    pub max_cumulative_long_position_size_usd: u64,
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
    // Fidesium H2: Aggregate VFR funding across all open positions on this side
    // (materialized from release/38's _padding1: [u8; 8])
    pub cumulative_funding_paid_usd: u64,
    pub collateral_usd: u64, // Stat only used for long positions
    pub cumulative_interest_snapshot: U128Split,
    pub exit_fee_usd: u64,
    pub stable_locked_amount: [StableLockedAmountStat; MAX_STABLE_CUSTODY],
    pub prepaid_interest_usd: u64,
    pub tmp_offset_end_ts: u64,
    pub tmp_offset: U128Split,
    pub unrealized_interest_usd: u64,
    // Fidesium H2: (materialized from release/38's _padding2: [u8; 8])
    pub cumulative_funding_received_usd: u64,
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

#[derive(
    Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Default, Debug, Pod, Zeroable,
)]
#[repr(C)]
pub struct VirtualFundingParams {
    // Max hourly funding rate in RATE_DECIMALS
    pub max_hourly_funding_rate: u64,
    // Below this total OI, funding is paused to avoid noise
    pub min_total_oi_usd: u64,
    // Sensitivity multiplier in BPS (10_000 = 1.0x)
    pub imbalance_sensitivity_bps: u16,
    pub _padding: [u8; 6],
}

#[derive(
    Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Default, Debug, Pod, Zeroable,
)]
#[repr(C)]
pub struct VirtualFundingState {
    // Signed: >0 means Longs pay Shorts, <0 means Shorts pay Longs.
    pub current_rate_long_to_short: i64,
    pub last_update: i64,
    pub cumulative_long_to_short: U128Split,
    pub cumulative_short_to_long: U128Split,
}

// =============================================================================
// Custody (release/39-postaudit)
// =============================================================================

#[account(zero_copy)]
#[derive(Default, Debug, PartialEq)]
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
    pub oracle: LimitedString,
    pub trade_oracle: LimitedString,
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
    // Optimal utilization in BPS for the two-slope borrow rate model
    pub optimal_utilization_bps: u64,
    // Virtual funding rate configuration and state (release/38+)
    pub virtual_funding: VirtualFundingParams,
    pub virtual_funding_state: VirtualFundingState,
    //
    // release/39 (Autonom) fields
    pub is_synthetic: u8,
    pub version: u8,
    pub oracle_feed_id: u8,
    pub trade_oracle_feed_id: u8,
    pub seed: [u8; 32],
    pub _padding_autonom0: [u8; 4],
    pub _padding_autonom1: [u8; 24],
    //
    // Remaining reserved space for future releases (release/40+)
    pub _reserved: [[u8; 32]; 6],
}

impl Custody {
    pub const LEN: usize = 8 + std::mem::size_of::<Custody>();

    pub fn is_stable(&self) -> bool {
        self.is_stable == 1
    }

    pub fn is_synthetic(&self) -> bool {
        self.is_synthetic == 1
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
                unrealized_interest_usd: accounting.unrealized_interest_usd,
                cumulative_interest_snapshot: accounting.cumulative_interest_snapshot,
                locked_amount: accounting.locked_amount,
                exit_fee_usd: accounting.exit_fee_usd,
                // Surface aggregate VFR funding so AUM includes funding obligations
                unrealized_funding_paid_usd: accounting.cumulative_funding_paid_usd,
                unrealized_funding_received_usd: accounting.cumulative_funding_received_usd,
                ..Position::default()
            })
        } else {
            Ok(Position::default())
        }
    }
}

// =============================================================================
// Side enum
// =============================================================================

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

// =============================================================================
// StakingType, UserStaking, Stake structs
// =============================================================================

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
            _ => anyhow::bail!("Invalid staking type"),
        })
    }
}

#[account(zero_copy)]
#[derive(Default, Debug, PartialEq)]
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

// =============================================================================
// LeverageCheckStatus and consumer-oriented Pool helpers
// =============================================================================

pub enum LeverageCheckStatus {
    Ok(u64),
    MaxLeverageExceeded(u64),
}

impl Pool {
    pub const LEN: usize = 8 + std::mem::size_of::<Pool>();

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

    pub fn is_autonom(&self) -> bool {
        self.pool_type == PoolType::Autonom as u8
    }

    pub fn is_gmx(&self) -> bool {
        self.pool_type == PoolType::GMX as u8
    }

    #[allow(clippy::too_many_arguments)]
    pub fn get_leverage(
        &self,
        position: &Position,
        token_trade_price: &OraclePrice,
        collateral_token_price: &OraclePrice,
        collateral_custody: &Custody,
        current_time: i64,
        liquidation: bool,
    ) -> Result<u64> {
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
            if pnl.profit_usd == 0 && pnl.loss_usd == 0 {
                return position.collateral_usd;
            }

            if pnl.profit_usd > 0 {
                return position.collateral_usd + pnl.profit_usd;
            }

            if pnl.loss_usd <= position.collateral_usd {
                return position.collateral_usd - pnl.loss_usd;
            }

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

    #[allow(clippy::too_many_arguments)]
    pub fn check_leverage(
        &self,
        position: &Position,
        token_trade_price: &OraclePrice,
        custody: &Custody,
        collateral_token_price: &OraclePrice,
        collateral_custody: &Custody,
        current_time: i64,
        initial: bool,
    ) -> Result<LeverageCheckStatus> {
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
        crate::liquidation_price::get_liquidation_price(
            position,
            custody,
            collateral_custody,
            current_time,
        )
    }

    // Note: PnL is an unrealized PnL and is an estimation
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

        let exit_price = match Side::try_from(position.side)? {
            Side::Long => token_trade_price.price,
            Side::Short => token_trade_price.price,
            Side::None => anyhow::bail!("Invalid position state"),
        };

        let exit_fee_usd: u64 = if liquidation {
            position.liquidation_fee_usd
        } else {
            position.exit_fee_usd
        };

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

            if potential_profit_usd >= (unrealized_loss_usd + position.paid_interest_usd) {
                let cur_profit_usd =
                    potential_profit_usd - (unrealized_loss_usd + position.paid_interest_usd);

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
                    borrow_fee_usd: total_unrealized_interest_usd + position.paid_interest_usd,
                })
            } else {
                Ok(ProfitAndLoss {
                    profit_usd: 0u64,
                    loss_usd: (unrealized_loss_usd + position.paid_interest_usd)
                        - potential_profit_usd,
                    exit_fee,
                    exit_fee_usd,
                    borrow_fee_usd: total_unrealized_interest_usd + position.paid_interest_usd,
                })
            }
        } else {
            let mut potential_loss_usd = math::checked_as_u64(math::checked_ceil_div::<u128>(
                position.size_usd as u128 * price_diff_loss as u128,
                position.price as u128,
            )?)?;

            potential_loss_usd += unrealized_loss_usd + position.paid_interest_usd;

            Ok(ProfitAndLoss {
                profit_usd: 0u64,
                loss_usd: potential_loss_usd,
                exit_fee,
                exit_fee_usd,
                borrow_fee_usd: total_unrealized_interest_usd + position.paid_interest_usd,
            })
        }
    }
}

// =============================================================================
// Limit order book
// =============================================================================

pub const MAX_LIMIT_ORDERS: usize = 16;

#[derive(
    Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Default, Debug, Pod, Zeroable,
)]
#[repr(C)]
pub struct LimitOrder {
    pub id: u64,
    pub trigger_price: u64,
    pub limit_price: u64, // 0 means no slippage
    pub custody: Pubkey,
    pub collateral_custody: Pubkey,
    pub side: u8,
    pub initialized: u8,
    pub is_limit_price_set: u8,
    pub _padding: [u8; 5],
    pub amount: u64,
    pub leverage: u32,
    pub _padding2: [u8; 4],
}

#[account(zero_copy)]
#[derive(Default, Debug)]
#[repr(C)]
pub struct LimitOrderBook {
    pub initialized: u8,
    pub bump: u8,
    pub registered_limit_order_count: u8,
    pub _padding: [u8; 5],
    pub owner: Pubkey,
    pub limit_orders: [LimitOrder; MAX_LIMIT_ORDERS],
    pub escrowed_lamports: u64,
}

impl LimitOrder {
    pub fn get_side(&self) -> Side {
        Side::try_from(self.side).unwrap()
    }

    pub fn is_initialized(&self) -> bool {
        self.initialized != 0
    }

    pub fn is_limit_price_set(&self) -> bool {
        self.limit_price != 0
    }

    pub fn is_executable(&self, token_trade_price: &OraclePrice, custody: &Pubkey) -> bool {
        if self.custody != *custody {
            return false;
        }

        match self.get_side() {
            Side::Long => {
                if token_trade_price.price > self.trigger_price {
                    return false;
                }

                if self.is_limit_price_set() {
                    return token_trade_price.price >= self.limit_price;
                }

                true
            }
            Side::Short => {
                if token_trade_price.price < self.trigger_price {
                    return false;
                }

                if self.is_limit_price_set() {
                    return token_trade_price.price <= self.limit_price;
                }

                true
            }
            _ => false,
        }
    }
}

// =============================================================================
// Additional r39 types ported from adrena/programs/adrena/src/state/*.rs
// so off-chain consumers don't re-declare them.
// =============================================================================

// Source: adrena/programs/adrena/src/state/pool.rs (release/39).
// Returned by close_position / liquidate paths. Not an on-chain account; this
// is a plain calculation output consumed by event handlers and indexers.
#[derive(Debug)]
pub struct ExitPositionNumbers {
    pub close_amount: u64,
    pub exit_fee: u64,
    pub exit_fee_usd: u64,
    pub borrow_fee: u64,
    pub borrow_fee_usd: u64,
    pub profit_usd: u64,
    pub loss_usd: u64,
    // The amount of USD that the user can't pay for the fees
    pub deficit_fee_usd: u64,
    // The amount of loss in USD the user can't cover - net loss for the pool
    pub deficit_pool_usd: u64,
    pub total_fee: u64,     // borrow_fee + exit_fee
    pub total_fee_usd: u64, // borrow_fee_usd + exit_fee_usd
}

// Source: adrena/programs/adrena/src/state/user_staking.rs (release/39).
// The on-chain LOCKED_LM_STAKING_OPTIONS + LOCKED_LP_STAKING_OPTIONS tables
// are defined against this shape. Off-chain consumers (UI, indexers) need
// it to render multiplier tiers.
#[derive(Copy, Clone, PartialEq, Debug, AnchorSerialize, AnchorDeserialize)]
pub struct LockedStakingOption {
    pub locked_days: u32,
    pub reward_multiplier: u32,
    pub lm_reward_multiplier: u32,
    pub vote_multiplier: u32,
}
