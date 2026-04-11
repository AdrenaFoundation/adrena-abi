use {
    crate::{limited_string::LimitedString, math, Cortex},
    anchor_lang::prelude::*,
    anyhow::Result,
    bytemuck::{Pod, Zeroable},
};

pub const ORACLE_EXPONENT_SCALE: i32 = -9;
pub const ORACLE_PRICE_SCALE: u128 = 1_000_000_000;
const ORACLE_MAX_PRICE: u64 = (1 << 28) - 1;

// Oracle pricing latency window. History: 15s (original) -> 5s (anti-vampire, release/37_2)
// -> 7s (relaxed, release/37_4). Still 7s in release/39-postaudit.
pub const STALENESS: i64 = 7; // in seconds

// Timestamp sanity bounds (catch wrong units / corrupted data)
pub const YEAR_2020_SECONDS: i64 = 1_577_836_800;
pub const YEAR_2100_SECONDS: i64 = 4_102_444_800;

// Max seconds a price timestamp may be ahead of the validator clock at write-time.
pub const MAX_WRITE_TIME_FUTURE_DRIFT_SECONDS: i64 = 2;

// Switchboard on-demand feed values arrive as i128 at 1e18 precision. Oracle PDA slots
// are initialized at `exponent = -PRICE_DECIMALS = -10`, so stored prices must live at
// 1e10 precision. Divisor 1e8 rescales 1e18 -> 1e10, matching the slot exponent.
pub const SWITCHBOARD_FEED_VALUE_SCALE_DIVISOR: i128 = 100_000_000;

pub const MAX_ORACLE_PRICES_COUNT: usize = 50;

#[repr(u8)]
#[derive(Copy, Clone, PartialEq, Eq, Debug)]
pub enum OracleVersion {
    V1 = 0,
    V2 = 2,
    V3 = 3, // release/39 - increased MAX_ORACLE_PRICES_COUNT to 50
}

impl OracleVersion {
    pub const fn latest() -> Self {
        OracleVersion::V3
    }
}

#[derive(PartialEq, Eq, Hash, Copy, Clone, Default, Debug)]
#[repr(u8)]
pub enum OracleProvider {
    #[default]
    ChaosLabs = 0,
    Autonom = 1,
    Switchboard = 2,
}

impl From<OracleProvider> for u8 {
    fn from(val: OracleProvider) -> Self {
        match val {
            OracleProvider::ChaosLabs => 0,
            OracleProvider::Autonom => 1,
            OracleProvider::Switchboard => 2,
        }
    }
}

impl TryFrom<u8> for OracleProvider {
    type Error = anyhow::Error;

    fn try_from(value: u8) -> std::result::Result<Self, Self::Error> {
        Ok(match value {
            0 => OracleProvider::ChaosLabs,
            1 => OracleProvider::Autonom,
            2 => OracleProvider::Switchboard,
            _ => anyhow::bail!("Invalid oracle provider value: {}", value),
        })
    }
}

impl OracleProvider {
    // IMPORTANT: Make sure the feed ids never overlap between providers.
    pub const fn feed_id_range(&self) -> (u8, u8) {
        match self {
            OracleProvider::ChaosLabs => (0, 29),
            OracleProvider::Autonom => (30, 141),
            OracleProvider::Switchboard => (142, 255),
        }
    }

    pub fn from_feed_id(feed_id: u8) -> Result<Self> {
        if (0..=29).contains(&feed_id) {
            Ok(OracleProvider::ChaosLabs)
        } else if (30..=141).contains(&feed_id) {
            Ok(OracleProvider::Autonom)
        } else if (142..=255).contains(&feed_id) {
            Ok(OracleProvider::Switchboard)
        } else {
            anyhow::bail!("Invalid feed_id {}", feed_id)
        }
    }
}

#[account(zero_copy)]
#[derive(Debug, PartialEq)]
#[repr(C)]
pub struct Oracle {
    pub bump: u8,
    pub version: u8,
    pub registered_prices_count: u8,
    pub _padding: [u8; 5],
    pub updated_at: i64,
    pub prices: [OraclePrice; MAX_ORACLE_PRICES_COUNT],
}

impl Default for Oracle {
    fn default() -> Self {
        Self {
            bump: 0,
            version: 0,
            registered_prices_count: 0,
            _padding: [0u8; 5],
            updated_at: 0,
            prices: [OraclePrice::default(); MAX_ORACLE_PRICES_COUNT],
        }
    }
}

impl Oracle {
    pub const LEN: usize = 8 + std::mem::size_of::<Oracle>();
    // Pre-v39 size: 8 (discriminator) + size_of(OraclePreV39)
    pub const LEN_PRE_V39: usize = 8 + std::mem::size_of::<legacy::OraclePreV39>();

    pub fn contains_feed_id(&self, feed_id: u8) -> bool {
        self.prices.iter().any(|p| p.feed_id == feed_id)
    }

    #[deprecated(
        since = "1.4.0",
        note = "Logic is now based on the feed_id instead of the name"
    )]
    pub fn get_feed_id_from_name(&self, name: &LimitedString) -> u8 {
        let stored_price = self.prices.iter().find(|p| p.name == *name).unwrap();
        stored_price.feed_id
    }

    pub fn get_price_by_feed_id(&self, feed_id: u8) -> Option<OraclePrice> {
        self.prices.iter().find(|p| p.feed_id == feed_id).copied()
    }
}

//
// OLD AND DEPRECATED VERSION OF Oracle - kept for migration purposes (pre-v39 = 20-slot layout)
//
pub mod legacy {
    use {
        crate::limited_string::LimitedString,
        anchor_lang::prelude::{
            borsh::{BorshDeserialize, BorshSerialize},
            *,
        },
        bytemuck::{Pod, Zeroable},
    };

    pub const LEGACY_MAX_ORACLE_PRICES_COUNT: usize = 20;
    pub const MAX_ORACLE_PRICES_COUNT_PRE_V39: usize = 20;

    #[account(zero_copy)]
    #[derive(Debug, BorshDeserialize, BorshSerialize)]
    #[repr(C)]
    pub struct OracleV1 {
        pub bump: u8,
        pub _padding: [u8; 7],
        pub updated_at: i64,
        pub prices: [LegacyOraclePrice; LEGACY_MAX_ORACLE_PRICES_COUNT],
    }

    #[derive(
        Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Default, Debug, Pod, Zeroable,
    )]
    #[repr(C)]
    pub struct LegacyOraclePrice {
        pub price: u64,
        pub confidence: u64,
        pub timestamp: i64,
        pub exponent: i32,
        pub feed_id: u8,
        pub _padding: [u8; 3],
        pub name: LimitedString,
    }

    // OraclePreV39 - pre-release/39 struct with 20 price slots (before oracle expansion)
    #[account(zero_copy)]
    #[derive(Debug, BorshDeserialize, BorshSerialize)]
    #[repr(C)]
    pub struct OraclePreV39 {
        pub bump: u8,
        pub version: u8,
        pub registered_prices_count: u8,
        pub _padding: [u8; 5],
        pub updated_at: i64,
        pub prices: [super::OraclePrice; MAX_ORACLE_PRICES_COUNT_PRE_V39],
    }
}

#[derive(
    Copy, Clone, PartialEq, AnchorSerialize, AnchorDeserialize, Default, Debug, Zeroable, Pod,
)]
#[repr(C)]
pub struct OraclePrice {
    pub price: u64,
    pub confidence: u64,
    pub timestamp: i64,
    pub exponent: i32,
    // Provider-agnostic feed id (used across providers: ChaosLabs + Autonom + Switchboard).
    pub feed_id: u8,
    pub _padding: [u8; 3],
    pub name: LimitedString,
}

// Multi-provider oracle batch wire types (release/39-postaudit).
#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct BatchPrices {
    pub prices: Vec<PriceData>,
    pub signature: [u8; 64],
    pub recovery_id: u8,
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct BatchPricesWithProvider {
    pub provider: u8, // OracleProvider
    pub batch: BatchPrices,
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct MultiBatchPrices {
    pub batches: Vec<BatchPricesWithProvider>,
}

/// Individual price data within a batch
#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize, Copy)]
pub struct PriceData {
    pub feed_id: u8,
    pub price: u64,
    pub timestamp: i64,
}

impl BatchPrices {
    /// Build a message hash from price data entries.
    ///
    /// Each price entry is serialized as:
    ///   1. feed_id (1 byte)
    ///   2. price (8 bytes LE)
    ///   3. expo (1 byte, -10)
    ///   4. timestamp (8 bytes LE)
    ///
    /// Buffers are then keccak256-hashed via solana_program::keccak::hashv.
    pub fn build_message_hash(&self) -> Result<[u8; 32]> {
        use solana_program::keccak::hashv;

        let mut buffers = Vec::with_capacity(self.prices.len());

        for price in &self.prices {
            let mut msg = vec![0u8; 32];
            msg[0] = price.feed_id;
            msg.extend_from_slice(&price.price.to_le_bytes());
            msg.push(-10_i8 as u8);
            msg.extend_from_slice(&price.timestamp.to_le_bytes());
            buffers.push(msg);
        }

        let buffer_refs: Vec<&[u8]> = buffers.iter().map(|buf| buf.as_slice()).collect();
        Ok(hashv(&buffer_refs).to_bytes())
    }

    /// Make sure one oracle provider doesn't affect another: verify feed IDs fit
    /// within the provider's registered range.
    pub fn verify_price_feed_ids(&self, oracle_provider: OracleProvider) -> Result<()> {
        let (min, max) = oracle_provider.feed_id_range();
        for price in &self.prices {
            if price.feed_id < min || price.feed_id > max {
                anyhow::bail!(
                    "Invalid feed_id {} for oracle provider {:?}, expected range: {}-{}",
                    price.feed_id,
                    oracle_provider,
                    min,
                    max
                );
            }
        }
        Ok(())
    }
}

impl MultiBatchPrices {
    pub fn verify_no_duplicate_providers(&self) -> Result<()> {
        let mut seen = std::collections::HashSet::new();
        for entry in &self.batches {
            if !seen.insert(entry.provider) {
                anyhow::bail!("Duplicated oracle provider in multi batch");
            }
        }
        Ok(())
    }
}

pub fn infer_provider_from_batch(prices: &BatchPrices) -> Result<OracleProvider> {
    let first = prices
        .prices
        .first()
        .ok_or_else(|| anyhow::anyhow!("Missing oracle price in batch"))?;
    let provider = OracleProvider::from_feed_id(first.feed_id)?;

    // Ensure all feed_ids fit the same provider range
    let (min, max) = provider.feed_id_range();
    for price in &prices.prices {
        if price.feed_id < min || price.feed_id > max {
            anyhow::bail!(
                "Invalid feed_id {} for inferred provider {:?}, expected range: {}-{}",
                price.feed_id,
                provider,
                min,
                max
            );
        }
    }

    Ok(provider)
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct SwitchboardFeedMapEntry {
    pub adrena_feed_id: u8,
    pub switchboard_feed_hash: [u8; 32],
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct SwitchboardUpdateParams {
    pub max_age_slots: u64,
    pub feed_map: Vec<SwitchboardFeedMapEntry>,
}

impl OraclePrice {
    pub fn new(price: u64, exponent: i32, conf: u64, timestamp: i64, name: &LimitedString) -> Self {
        Self {
            price,
            exponent,
            confidence: conf,
            timestamp,
            feed_id: 0,
            _padding: [0; 3],
            name: *name,
        }
    }

    pub fn from_price_data(data: &PriceData, name: LimitedString) -> Result<Self> {
        Ok(Self {
            name,
            price: data.price,
            timestamp: data.timestamp,
            confidence: get_confidence_from_price(data.price, data.feed_id)?,
            exponent: -(Cortex::PRICE_DECIMALS as i32),
            feed_id: data.feed_id,
            _padding: Default::default(),
        })
    }

    pub fn low(&self) -> Self {
        Self {
            price: self.price.saturating_sub(self.confidence),
            exponent: self.exponent,
            confidence: 0,
            timestamp: self.timestamp,
            feed_id: self.feed_id,
            ..Default::default()
        }
    }

    pub fn high(&self) -> Self {
        Self {
            price: self.price.saturating_add(self.confidence),
            exponent: self.exponent,
            confidence: 0,
            timestamp: self.timestamp,
            feed_id: self.feed_id,
            ..Default::default()
        }
    }

    // Converts token amount to USD with implied USD_DECIMALS decimals.
    pub fn get_asset_amount_usd(&self, token_amount: u64, token_decimals: u8) -> Result<u64> {
        if token_amount == 0 || self.price == 0 {
            return Ok(0);
        }

        math::checked_decimal_mul(
            token_amount,
            -(token_decimals as i32),
            self.price,
            self.exponent,
            -(Cortex::USD_DECIMALS as i32),
        )
        .map_err(|e| anyhow::anyhow!("get_asset_amount_usd: {e:?}"))
    }

    // Converts USD amount with implied USD_DECIMALS decimals to token amount.
    pub fn get_token_amount(&self, asset_amount_usd: u64, token_decimals: u8) -> Result<u64> {
        if asset_amount_usd == 0 || self.price == 0 {
            return Ok(0);
        }

        math::checked_decimal_div(
            asset_amount_usd,
            -(Cortex::USD_DECIMALS as i32),
            self.price,
            self.exponent,
            -(token_decimals as i32),
        )
        .map_err(|e| anyhow::anyhow!("get_token_amount: {e:?}"))
    }

    /// Returns price with mantissa normalized to be less than ORACLE_MAX_PRICE.
    pub fn normalize(&self) -> Result<OraclePrice> {
        let mut p = self.price;
        let mut e = self.exponent;

        while p > ORACLE_MAX_PRICE {
            p /= 10;
            e += 1;
        }

        Ok(OraclePrice {
            price: p,
            exponent: e,
            confidence: self.confidence,
            timestamp: self.timestamp,
            feed_id: self.feed_id,
            ..Default::default()
        })
    }

    pub fn scale_to_exponent(&self, target_exponent: i32) -> Result<OraclePrice> {
        if target_exponent == self.exponent {
            return Ok(*self);
        }

        Ok(OraclePrice {
            price: math::scale_to_exponent(self.price, self.exponent, target_exponent)?,
            exponent: target_exponent,
            confidence: self.confidence,
            timestamp: self.timestamp,
            feed_id: self.feed_id,
            ..Default::default()
        })
    }

    /// Validates timestamp is a sane value (not milliseconds, not ancient, not future).
    /// Staleness and per-pool drift are enforced at read-time via MultiOracleConfig.
    pub fn validate_timestamp(&self, current_time: i64) -> Result<()> {
        if self.timestamp < YEAR_2020_SECONDS {
            anyhow::bail!(
                "Timestamp {} is before year 2020 ({}), likely wrong unit or corrupted",
                self.timestamp,
                YEAR_2020_SECONDS
            );
        }

        if self.timestamp > YEAR_2100_SECONDS {
            anyhow::bail!(
                "Timestamp {} is after year 2100 ({}), likely milliseconds",
                self.timestamp,
                YEAR_2100_SECONDS
            );
        }

        if self.timestamp > current_time + MAX_WRITE_TIME_FUTURE_DRIFT_SECONDS {
            anyhow::bail!(
                "Timestamp {} is in the future (current_time={})",
                self.timestamp,
                current_time
            );
        }

        Ok(())
    }

    /// Read-time staleness check: rejects prices older than `staleness_seconds`.
    pub fn check_price_validity(
        &self,
        current_time: i64,
        staleness_seconds: i64,
    ) -> Result<()> {
        if !(self.timestamp + staleness_seconds >= current_time) {
            anyhow::bail!("Stale oracle price");
        }
        Ok(())
    }
}

// Apply a policy confidence band (not provider-reported confidence) to protect LPs from MEV.
pub fn get_confidence_from_price(price: u64, feed_id: u8) -> Result<u64> {
    // USDC feed ids: ChaosLabs=5, Autonom=37, Switchboard=145
    if feed_id == 5 || feed_id == 37 || feed_id == 145 {
        return Ok(0);
    }

    math::checked_as_u64(price as u128 * 25 / Cortex::BPS_POWER)
}
