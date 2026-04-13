//! Canonical oracle feed-id constants for offchain consumers.
//!
//! These are the protocol-level facts that the on-chain `OracleProvider`
//! enforces in [`crate::oracle::OracleProvider::feed_id_range`]. They live
//! here as `pub const` so non-Anchor consumers (Rust offchain services like
//! MrOracle, MrAutonom-via-FFI, etc.) can use them without importing the full
//! `OracleProvider` enum.
//!
//! The unit test below verifies these constants stay in sync with the enum.
//! If the two ever drift, that test fails and the build is red.
//!
//! release/39 canonical layout: each provider's range starts with the same
//! 6-asset crypto block at offset +0..+5: SOL, jitoSOL, BTC, WBTC, BONK, USDC.
//!     ChaosLabs   (0..=29):   0=SOL, 1=jitoSOL, 2=BTC, 3=WBTC, 4=BONK, 5=USDC
//!     Autonom     (30..=141): 30=SOL, 31=jitoSOL, 32=BTC, 33=WBTC, 34=BONK, 35=USDC
//!     Switchboard (142..=255): 142=SOL, 143=jitoSOL, 144=BTC, 145=WBTC, 146=BONK, 147=USDC

/// Inclusive range `(min, max)` of feed ids that map to ChaosLabs.
pub const CHAOSLABS_RANGE: (u8, u8) = (0, 29);

/// Inclusive range `(min, max)` of feed ids that map to Autonom.
pub const AUTONOM_RANGE: (u8, u8) = (30, 141);

/// Inclusive range `(min, max)` of feed ids that map to Switchboard.
pub const SWITCHBOARD_RANGE: (u8, u8) = (142, 255);

/// Slot offset (within a provider's range) of the canonical USDC feed.
pub const USDC_OFFSET: u8 = 5;

/// Stablecoin (USDC) feed_ids per provider. Used by on-chain
/// `get_confidence_from_price` to apply 0 BPS confidence band on stables.
/// Mirrored on offchain side for active-feed validation.
pub const CHAOSLABS_USDC: u8 = 5;
pub const AUTONOM_USDC: u8 = 35;
pub const SWITCHBOARD_USDC: u8 = 147;

/// All adrena_feed_ids in the Autonom 30..=35 crypto block. These feeds are
/// 24/7 (no market-hours gate). MrAutonom must skip them when calling
/// `/hours/batch/adrena`. Prefer the metadata-driven `feed_metadata.sessioned`
/// lookup where available; this constant exists for callers that don't have
/// JSON parsing wired up.
pub const AUTONOM_CRYPTO_FEED_IDS: [u8; 6] = [30, 31, 32, 33, 34, 35];

#[cfg(test)]
mod tests {
    use super::*;
    use crate::oracle::OracleProvider;

    #[test]
    fn ranges_match_oracle_provider_enum() {
        assert_eq!(CHAOSLABS_RANGE,   OracleProvider::ChaosLabs.feed_id_range());
        assert_eq!(AUTONOM_RANGE,     OracleProvider::Autonom.feed_id_range());
        assert_eq!(SWITCHBOARD_RANGE, OracleProvider::Switchboard.feed_id_range());
    }

    #[test]
    fn usdc_constants_fall_within_their_provider_range() {
        let (lo, hi) = CHAOSLABS_RANGE;
        assert!(CHAOSLABS_USDC >= lo && CHAOSLABS_USDC <= hi);
        let (lo, hi) = AUTONOM_RANGE;
        assert!(AUTONOM_USDC >= lo && AUTONOM_USDC <= hi);
        let (lo, hi) = SWITCHBOARD_RANGE;
        assert!(SWITCHBOARD_USDC >= lo && SWITCHBOARD_USDC <= hi);
    }

    #[test]
    fn usdc_constants_match_canonical_offset() {
        // Canonical layout: USDC is at offset +5 in each provider range.
        assert_eq!(CHAOSLABS_USDC,   CHAOSLABS_RANGE.0   + USDC_OFFSET);
        assert_eq!(AUTONOM_USDC,     AUTONOM_RANGE.0     + USDC_OFFSET);
        assert_eq!(SWITCHBOARD_USDC, SWITCHBOARD_RANGE.0 + USDC_OFFSET);
    }

    #[test]
    fn autonom_crypto_feed_ids_fall_within_autonom_range() {
        let (lo, hi) = AUTONOM_RANGE;
        for id in AUTONOM_CRYPTO_FEED_IDS {
            assert!(id >= lo && id <= hi, "autonom crypto id {id} outside range");
        }
    }
}
