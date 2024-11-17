use {
    crate::{math, pyth::PriceUpdateV2, Cortex},
    anyhow::{anyhow, Result},
};

// pub const ORACLE_EXPONENT_SCALE: i32 = -9;
pub const ORACLE_PRICE_SCALE: u128 = 1_000_000_000;
pub const ORACLE_MAX_PRICE: u64 = (1 << 28) - 1;

// In BPS
pub const MAX_PRICE_ERROR: u16 = 300;

#[derive(Copy, Clone, Eq, PartialEq, Default, Debug)]
pub struct OraclePrice {
    pub price: u64,
    pub exponent: i32,
    pub confidence: u64,
}

impl OraclePrice {
    pub fn new(price: u64, exponent: i32, conf: u64) -> Self {
        Self {
            price,
            exponent,
            confidence: conf,
        }
    }

    pub fn low(&self) -> Self {
        Self {
            price: self.price - self.confidence,
            exponent: self.exponent,
            confidence: 0,
        }
    }

    pub fn high(&self) -> Self {
        Self {
            price: self.price + self.confidence,
            exponent: self.exponent,
            confidence: 0,
        }
    }

    pub fn new_from_pyth_price_update_v2(price_update_v2: &PriceUpdateV2) -> Result<Self> {
        let pyth_price = price_update_v2.price_message;

        // Check for maximum confidence
        {
            let confidence_bps: u64 = math::checked_as_u64(math::checked_ceil_div::<u128>(
                pyth_price.conf as u128 * Cortex::BPS_POWER,
                pyth_price.price as u128,
            )?)?;

            if pyth_price.price <= 0 || confidence_bps > MAX_PRICE_ERROR as u64 {
                return Err(anyhow!("Pyth price is out of bounds"));
            }
        }

        OraclePrice {
            // price is i64 and > 0 per check above
            price: pyth_price.price as u64,
            exponent: pyth_price.exponent,
            confidence: pyth_price.conf,
        }
        .scale_to_exponent(-(Cortex::PRICE_DECIMALS as i32))
    }

    pub fn scale_to_exponent(&self, target_exponent: i32) -> Result<OraclePrice> {
        if target_exponent == self.exponent {
            return Ok(*self);
        }

        Ok(OraclePrice {
            price: math::scale_to_exponent(self.price, self.exponent, target_exponent)?,
            exponent: target_exponent,
            confidence: self.confidence,
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
    }
}
