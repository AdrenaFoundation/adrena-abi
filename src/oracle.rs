use {
    crate::{limited_string::LimitedString, math, Cortex},
    anchor_lang::prelude::*,
    anyhow::Result,
};

pub const ORACLE_EXPONENT_SCALE: i32 = -9;
pub const ORACLE_PRICE_SCALE: u128 = 1_000_000_000;
const ORACLE_MAX_PRICE: u64 = (1 << 28) - 1;
pub const STALENESS: i64 = 20; // in seconds

pub const MAX_ORACLE_PRICES_COUNT: usize = 20;

#[account(zero_copy)]
#[derive(Default, Debug, PartialEq, AnchorSerialize, AnchorDeserialize)]
#[repr(C)]
pub struct Oracle {
    pub bump: u8,
    pub _padding: [u8; 7],
    pub updated_at: i64,
    pub prices: [OraclePrice; MAX_ORACLE_PRICES_COUNT],
}

#[account(zero_copy)]
#[derive(Default, Debug, PartialEq, AnchorSerialize, AnchorDeserialize)]
#[repr(C)]
pub struct OraclePrice {
    pub price: u64,
    pub confidence: u64,
    pub timestamp: i64,
    pub exponent: i32,
    pub chaos_labs_feed_id: u8,
    pub _padding: [u8; 3],
    pub name: LimitedString,
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct ChaosLabsBatchPrices {
    pub prices: Vec<PriceData>,
    pub signature: [u8; 64],
    pub recovery_id: u8,
}

/// Individual price data within a batch
#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize, Copy)]
pub struct PriceData {
    pub feed_id: u8,
    pub price: u64,
    pub timestamp: i64,
}

impl OraclePrice {
    pub fn low(&self) -> Self {
        Self {
            price: self.price - self.confidence,
            exponent: self.exponent,
            confidence: 0,
            timestamp: self.timestamp,
            chaos_labs_feed_id: self.chaos_labs_feed_id,
            ..Default::default()
        }
    }

    pub fn high(&self) -> Self {
        Self {
            price: self.price + self.confidence,
            exponent: self.exponent,
            confidence: 0,
            timestamp: self.timestamp,
            chaos_labs_feed_id: self.chaos_labs_feed_id,
            ..Default::default()
        }
    }

    /// Returns price with mantissa normalized to be less than ORACLE_MAX_PRICE
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
            chaos_labs_feed_id: self.chaos_labs_feed_id,
            ..Default::default()
        })
    }

    // Converts USD amount with implied USD_DECIMALS decimals to token amount
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
        .map_err(|_| anyhow::anyhow!("Math error"))
    }

    // Converts token amount to USD with implied USD_DECIMALS decimals
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
        .map_err(|_| anyhow::anyhow!("Math error"))
    }

    pub fn new(price: u64, exponent: i32, conf: u64, timestamp: i64) -> Self {
        Self {
            price,
            exponent,
            confidence: conf,
            timestamp,
            chaos_labs_feed_id: 0,
            _padding: [0; 3],
            name: LimitedString::new(""),
        }
    }
}
