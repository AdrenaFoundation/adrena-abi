//! Strict invariants for `oracle.rs`.
//!
//! The on-chain program treats `OraclePrice` math as load-bearing — any drift
//! between abi and program is a silent priceing bug. These tests pin the math
//! (low/high band, scale, validate, check_validity) AND the protocol-level
//! constants (PRICE_DECIMALS contract, staleness window, provider feed_id
//! ranges) so a future refactor can't shift them without a test failure.

use {
    adrena_abi::{
        limited_string::LimitedString,
        oracle::{
            self, get_confidence_from_price, infer_provider_from_batch, BatchPrices,
            MultiBatchPrices, OraclePrice, OracleProvider, OracleVersion, PriceData,
            MAX_ORACLE_PRICES_COUNT, MAX_WRITE_TIME_FUTURE_DRIFT_SECONDS, ORACLE_EXPONENT_SCALE,
            ORACLE_PRICE_SCALE, STALENESS, YEAR_2020_SECONDS, YEAR_2100_SECONDS,
        },
        Cortex,
    },
};

// ── 1. Constants pinning ────────────────────────────────────────────────────
// Wire format / protocol constants that off-chain consumers AND on-chain
// program both compute against. Drift here = silent breakage everywhere.

#[test]
fn oracle_constants_pinned() {
    assert_eq!(ORACLE_EXPONENT_SCALE, -9);
    assert_eq!(ORACLE_PRICE_SCALE, 1_000_000_000);
    assert_eq!(STALENESS, 7, "on-chain price staleness window");
    assert_eq!(MAX_WRITE_TIME_FUTURE_DRIFT_SECONDS, 2);
    assert_eq!(MAX_ORACLE_PRICES_COUNT, 50, "Oracle v3 layout");
    assert_eq!(YEAR_2020_SECONDS, 1_577_836_800);
    assert_eq!(YEAR_2100_SECONDS, 4_102_444_800);
}

#[test]
fn cortex_decimal_constants_pinned() {
    // Every off-chain pricing path (LP price, fee math, leverage) scales
    // against these. Drift between abi and the on-chain program would
    // silently mis-scale dollar values across every consumer.
    assert_eq!(Cortex::PRICE_DECIMALS, 10);
    assert_eq!(Cortex::USD_DECIMALS, 6);
    assert_eq!(Cortex::RATE_DECIMALS, 9);
    assert_eq!(Cortex::BPS_POWER, 10_000);
}

#[test]
fn oracle_version_latest_is_v3() {
    assert_eq!(OracleVersion::latest() as u8, OracleVersion::V3 as u8);
    assert_eq!(OracleVersion::V1 as u8, 0);
    assert_eq!(OracleVersion::V2 as u8, 2);
    assert_eq!(OracleVersion::V3 as u8, 3);
}

// ── 2. OracleProvider feed_id ranges ───────────────────────────────────────
// Provider ranges MUST be disjoint and exhaustively cover [0, 255]. Drift
// here = a feed_id resolves to the wrong provider = signature verification
// against the wrong public key = batches rejected.

#[test]
fn oracle_provider_ranges_are_canonical() {
    assert_eq!(OracleProvider::ChaosLabs.feed_id_range(), (0, 29));
    assert_eq!(OracleProvider::Autonom.feed_id_range(), (30, 141));
    assert_eq!(OracleProvider::Switchboard.feed_id_range(), (142, 255));
}

#[test]
fn oracle_provider_ranges_dont_overlap_and_cover_full_u8() {
    // Walk every u8 value and check it routes to exactly one provider.
    for id in 0u16..=255 {
        let provider = OracleProvider::from_feed_id(id as u8)
            .unwrap_or_else(|_| panic!("feed_id {id} routes to no provider"));
        let (min, max) = provider.feed_id_range();
        assert!(
            (min..=max).contains(&(id as u8)),
            "feed_id {id} routed to {provider:?} but is outside its range [{min}, {max}]"
        );
    }
}

#[test]
fn oracle_provider_u8_round_trip() {
    for raw in 0u8..=2 {
        let provider = OracleProvider::try_from(raw).unwrap();
        let back: u8 = provider.into();
        assert_eq!(raw, back);
    }
    // Out-of-range u8 must reject.
    assert!(OracleProvider::try_from(3u8).is_err());
    assert!(OracleProvider::try_from(255u8).is_err());
}

#[test]
fn oracle_provider_default_is_chaoslabs() {
    // Defensive: many on-chain code paths rely on Default = ChaosLabs.
    let default_p = OracleProvider::default();
    assert_eq!(default_p as u8, OracleProvider::ChaosLabs as u8);
}

// ── 3. OraclePrice confidence band (low/high) ──────────────────────────────
// MEV protection: AUM is computed at low_price, position payout at high_price.
// If these flip or saturate wrong, fee/loss accounting drifts silently.

fn mk_price(price: u64, conf: u64, exponent: i32, ts: i64) -> OraclePrice {
    OraclePrice::new(price, exponent, conf, ts, &LimitedString::new("TEST"))
}

#[test]
fn low_subtracts_confidence_band() {
    let p = mk_price(1_000_000, 1_000, -10, 1_700_000_000);
    let low = p.low();
    assert_eq!(low.price, 999_000);
    assert_eq!(low.confidence, 0, "low() must zero out confidence");
    assert_eq!(low.exponent, p.exponent);
    assert_eq!(low.timestamp, p.timestamp);
}

#[test]
fn high_adds_confidence_band() {
    let p = mk_price(1_000_000, 1_000, -10, 1_700_000_000);
    let high = p.high();
    assert_eq!(high.price, 1_001_000);
    assert_eq!(high.confidence, 0, "high() must zero out confidence");
    assert_eq!(high.exponent, p.exponent);
}

#[test]
fn low_saturates_at_zero_when_confidence_exceeds_price() {
    // Defensive: if confidence > price (oracle blip), low() must NOT underflow.
    let p = mk_price(100, 500, -10, 1_700_000_000);
    let low = p.low();
    assert_eq!(low.price, 0, "saturating_sub must clamp at 0, not wrap");
}

#[test]
fn high_saturates_at_u64_max_on_overflow() {
    // Defensive: extreme price + extreme conf must not panic.
    let p = mk_price(u64::MAX - 100, 200, -10, 1_700_000_000);
    let high = p.high();
    assert_eq!(high.price, u64::MAX, "saturating_add must clamp, not wrap");
}

// ── 4. scale_to_exponent ───────────────────────────────────────────────────

#[test]
fn scale_to_exponent_identity_when_target_matches() {
    let p = mk_price(1_234_567, 1_000, -10, 1_700_000_000);
    let scaled = p.scale_to_exponent(-10).unwrap();
    assert_eq!(scaled.price, p.price);
    assert_eq!(scaled.exponent, p.exponent);
    assert_eq!(scaled.confidence, p.confidence);
}

#[test]
fn scale_to_exponent_widens_decimals_correctly() {
    // -10 → -8: divide mantissa by 100
    let p = mk_price(123_456_789_000, 0, -10, 1_700_000_000);
    let scaled = p.scale_to_exponent(-8).unwrap();
    assert_eq!(scaled.exponent, -8);
    assert_eq!(scaled.price, 1_234_567_890);
}

// ── 5. validate_timestamp ──────────────────────────────────────────────────

#[test]
fn validate_timestamp_rejects_pre_2020() {
    let p = mk_price(1, 0, -10, YEAR_2020_SECONDS - 1);
    assert!(p.validate_timestamp(1_700_000_000).is_err());
}

#[test]
fn validate_timestamp_rejects_year_2100_and_beyond() {
    // Likely milliseconds posing as seconds.
    let p = mk_price(1, 0, -10, YEAR_2100_SECONDS + 1);
    assert!(p.validate_timestamp(1_700_000_000_000).is_err());
}

#[test]
fn validate_timestamp_rejects_future_beyond_drift_window() {
    let now: i64 = 1_700_000_000;
    let p = mk_price(1, 0, -10, now + MAX_WRITE_TIME_FUTURE_DRIFT_SECONDS + 1);
    assert!(p.validate_timestamp(now).is_err());
}

#[test]
fn validate_timestamp_accepts_within_future_drift_window() {
    let now: i64 = 1_700_000_000;
    let p = mk_price(1, 0, -10, now + MAX_WRITE_TIME_FUTURE_DRIFT_SECONDS);
    assert!(p.validate_timestamp(now).is_ok());
}

#[test]
fn validate_timestamp_accepts_at_2020_boundary() {
    // YEAR_2020_SECONDS itself is the inclusive lower bound.
    let p = mk_price(1, 0, -10, YEAR_2020_SECONDS);
    assert!(p.validate_timestamp(1_700_000_000).is_ok());
}

// ── 6. check_price_validity (read-time staleness) ──────────────────────────

#[test]
fn check_price_validity_accepts_inside_window() {
    let now: i64 = 1_700_000_007;
    let p = mk_price(1, 0, -10, now - 7);
    // 7 + 7 >= 7? Equal-boundary. Implementation uses >=, so accepts.
    assert!(p.check_price_validity(now, 7).is_ok());
}

#[test]
fn check_price_validity_rejects_outside_window() {
    let now: i64 = 1_700_000_010;
    let p = mk_price(1, 0, -10, now - 8); // 8s old, > 7s window
    assert!(p.check_price_validity(now, 7).is_err());
}

#[test]
fn check_price_validity_zero_window_rejects_any_age() {
    let now: i64 = 1_700_000_000;
    let p = mk_price(1, 0, -10, now - 1);
    assert!(p.check_price_validity(now, 0).is_err());
}

// ── 7. get_asset_amount_usd / get_token_amount ─────────────────────────────
// USD math is the most-used path in the program. Pin known-good values.

#[test]
fn get_asset_amount_usd_zero_token_returns_zero() {
    let p = mk_price(100_000_000_000, 0, -10, 1_700_000_000);
    assert_eq!(p.get_asset_amount_usd(0, 6).unwrap(), 0);
}

#[test]
fn get_asset_amount_usd_zero_price_returns_zero() {
    let p = mk_price(0, 0, -10, 1_700_000_000);
    assert_eq!(p.get_asset_amount_usd(1_000_000_000, 6).unwrap(), 0);
}

#[test]
fn get_asset_amount_usd_golden_known_value() {
    // 1 token @ $100.00 = $100.00 USD.
    // price = 100 * 1e10 = 1_000_000_000_000 (with PRICE_DECIMALS=-10).
    // token_amount = 1 with token_decimals=6 → 1 * 1e6 = 1_000_000.
    // result in USD_DECIMALS=6: 100 * 1e6 = 100_000_000.
    let p = mk_price(1_000_000_000_000, 0, -10, 1_700_000_000);
    let usd = p.get_asset_amount_usd(1_000_000, 6).unwrap();
    assert_eq!(usd, 100_000_000, "1 token @ $100 should be $100 USD (6 decimals)");
}

#[test]
fn get_token_amount_inverse_of_get_asset_amount_usd_within_rounding() {
    // Round-trip: token → USD → token. Lossy by at most rounding.
    let p = mk_price(1_000_000_000_000, 0, -10, 1_700_000_000); // $100/token
    let token_amount: u64 = 5_500_000; // 5.5 tokens (6 decimals)
    let usd = p.get_asset_amount_usd(token_amount, 6).unwrap();
    let back = p.get_token_amount(usd, 6).unwrap();
    let diff = if back > token_amount {
        back - token_amount
    } else {
        token_amount - back
    };
    assert!(diff <= 1, "round-trip drift > 1 lamport (got {diff})");
}

// ── 8. confidence band policy ──────────────────────────────────────────────

#[test]
fn get_confidence_from_price_zero_for_usdc_feeds() {
    // USDC feed ids: ChaosLabs=5, Autonom=35, Switchboard=147 (canonical +5 offset).
    // band_bps is irrelevant for USDC feeds — exemption hardcoded in the function.
    let band = adrena_abi::types::Cortex::DEFAULT_CONFIDENCE_BAND_BPS;
    assert_eq!(get_confidence_from_price(1_000_000_000, 5, band).unwrap(), 0);
    assert_eq!(get_confidence_from_price(1_000_000_000, 35, band).unwrap(), 0);
    assert_eq!(get_confidence_from_price(1_000_000_000, 147, band).unwrap(), 0);

    // band_bps = 0 also yields 0 for USDC (USDC short-circuit happens before scaling).
    assert_eq!(get_confidence_from_price(1_000_000_000, 5, 0).unwrap(), 0);
}

#[test]
fn get_confidence_from_price_scales_with_band_bps_for_volatile_feeds() {
    // v2.1.2: band magnitude is DAO-tunable via Cortex.confidence_band_bps.
    // The default (legacy-0 fallback) is 25 BPS = 0.25% of price, matching v2.1.1.
    let price: u64 = 1_000_000_000_000; // $100 at PRICE_DECIMALS=10

    // Default 25 BPS — same behaviour as pre-v2.1.2.
    let conf = get_confidence_from_price(price, 0, 25).unwrap();
    assert_eq!(conf, price * 25 / 10_000);

    // 1 BPS (minimum allowed by `set_confidence_band_bps` admin ix).
    let conf_min = get_confidence_from_price(price, 0, 1).unwrap();
    assert_eq!(conf_min, price * 1 / 10_000);

    // 100 BPS (maximum allowed by `set_confidence_band_bps` admin ix).
    let conf_max = get_confidence_from_price(price, 0, 100).unwrap();
    assert_eq!(conf_max, price * 100 / 10_000);

    // 0 BPS (only reachable as a legacy-uninitialised value — admin ix bounds enforce >= 1).
    let conf_zero = get_confidence_from_price(price, 0, 0).unwrap();
    assert_eq!(conf_zero, 0);
}

// ── 8b. confidence band (v2.1.2): Cortex.confidence_band_bps + helper ──────

#[test]
fn cortex_confidence_band_bps_constants_match_program() {
    // These bounds are enforced in-program by `set_confidence_band_bps` and
    // gate the DAO's allowable range. Pinned here so any future relaxation /
    // tightening must be made in lockstep with adrena/programs.
    assert_eq!(Cortex::DEFAULT_CONFIDENCE_BAND_BPS, 25);
    assert_eq!(Cortex::MIN_CONFIDENCE_BAND_BPS, 1);
    assert_eq!(Cortex::MAX_CONFIDENCE_BAND_BPS, 100);
    assert!(
        Cortex::MIN_CONFIDENCE_BAND_BPS <= Cortex::DEFAULT_CONFIDENCE_BAND_BPS
            && Cortex::DEFAULT_CONFIDENCE_BAND_BPS <= Cortex::MAX_CONFIDENCE_BAND_BPS,
        "DEFAULT must lie within [MIN, MAX]"
    );
}

#[test]
fn cortex_get_confidence_band_bps_falls_back_to_default_on_zero() {
    // Legacy on-chain Cortex accounts (pre-v2.1.2) have these two bytes as 0
    // because they came from the `_padding: [u8; 2]` slot. The helper must
    // return DEFAULT in that case so v2.1.1 behaviour is preserved until the
    // DAO explicitly writes a value.
    let cortex: Cortex = Default::default();
    assert_eq!(cortex.confidence_band_bps, 0, "default-derived value should be 0");
    assert_eq!(
        cortex.get_confidence_band_bps(),
        Cortex::DEFAULT_CONFIDENCE_BAND_BPS,
        "0-sentinel must map to DEFAULT (25)"
    );
}

#[test]
fn cortex_get_confidence_band_bps_returns_explicit_value() {
    // Once the DAO calls `set_confidence_band_bps(N)` the stored value is
    // honoured byte-for-byte. The admin ix enforces N >= MIN_CONFIDENCE_BAND_BPS
    // so the only way to ever observe a 0 is the legacy sentinel above.
    let mut cortex: Cortex = Default::default();
    for n in [
        Cortex::MIN_CONFIDENCE_BAND_BPS,
        5,
        Cortex::DEFAULT_CONFIDENCE_BAND_BPS,
        50,
        Cortex::MAX_CONFIDENCE_BAND_BPS,
    ] {
        cortex.confidence_band_bps = n;
        assert_eq!(cortex.get_confidence_band_bps(), n);
    }
}

#[test]
fn from_price_data_plumbs_band_bps_into_confidence() {
    // OraclePrice::from_price_data is the constructor every off-chain
    // consumer that simulates on-chain pricing (PnL/AUM mirrors) routes
    // through. Verify the band_bps arg actually reaches the confidence
    // field, including the USDC short-circuit.
    let pd = PriceData { feed_id: 0, price: 1_000_000_000_000, timestamp: 1_700_000_000 };
    let name = LimitedString::new("SOLUSD");

    let op_default = OraclePrice::from_price_data(&pd, name, 25).unwrap();
    assert_eq!(op_default.confidence, 1_000_000_000_000 * 25 / 10_000);

    let op_min = OraclePrice::from_price_data(&pd, name, 1).unwrap();
    assert_eq!(op_min.confidence, 1_000_000_000_000 / 10_000);

    let op_max = OraclePrice::from_price_data(&pd, name, 100).unwrap();
    assert_eq!(op_max.confidence, 1_000_000_000_000 * 100 / 10_000);

    // USDC short-circuit: even with a non-zero band, confidence stays 0.
    let usdc_pd = PriceData { feed_id: 5, price: 1_000_000_000_000, timestamp: 1_700_000_000 };
    let op_usdc = OraclePrice::from_price_data(&usdc_pd, LimitedString::new("USDC"), 100).unwrap();
    assert_eq!(op_usdc.confidence, 0, "USDC must be exempt regardless of band_bps");
}

#[test]
fn cortex_byte_layout_unchanged_by_confidence_band_carve() {
    // v2.1.2 carved `confidence_band_bps: u16` out of the prior
    // `_padding: [u8; 2]` slot. The whole point is byte-compatibility with
    // v2.1.1 Cortex accounts: same struct size, same offsets for every
    // existing field. If this assertion ever fails, the carve has stopped
    // being byte-compatible and existing on-chain Cortex accounts must be
    // migrated (which is currently NOT what `init_one_core` / migration ix
    // expect).
    //
    // Body is 480 bytes (pre-discriminator). Total LEN = 8 + 480 = 488.
    assert_eq!(std::mem::size_of::<Cortex>(), 480);
    assert_eq!(Cortex::LEN, 488);

    // Field offset of `confidence_band_bps` must be 6 (after the 6 single-byte
    // bumps/initialised/decimal fields), matching the prior _padding offset.
    let cortex = Cortex::default();
    let base = &cortex as *const _ as usize;
    let band_addr = &cortex.confidence_band_bps as *const _ as usize;
    assert_eq!(band_addr - base, 6, "confidence_band_bps must sit at byte offset 6");

    // And it must be exactly 2 bytes wide so the next field (lm_token_mint:
    // Pubkey at offset 8) still aligns correctly.
    assert_eq!(std::mem::size_of_val(&cortex.confidence_band_bps), 2);
}

// ── 9. infer_provider_from_batch ───────────────────────────────────────────

#[test]
fn infer_provider_from_batch_matches_first_feed_id() {
    let bp = BatchPrices {
        prices: vec![PriceData {
            feed_id: 0, // ChaosLabs range
            price: 1,
            timestamp: 1_700_000_000,
        }],
        signature: [0u8; 64],
        recovery_id: 0,
    };
    assert_eq!(
        infer_provider_from_batch(&bp).unwrap() as u8,
        OracleProvider::ChaosLabs as u8
    );
}

#[test]
fn infer_provider_rejects_mixed_provider_feed_ids() {
    let bp = BatchPrices {
        prices: vec![
            PriceData {
                feed_id: 0, // ChaosLabs
                price: 1,
                timestamp: 1_700_000_000,
            },
            PriceData {
                feed_id: 30, // Autonom
                price: 1,
                timestamp: 1_700_000_000,
            },
        ],
        signature: [0u8; 64],
        recovery_id: 0,
    };
    assert!(
        infer_provider_from_batch(&bp).is_err(),
        "mixed-range feed_ids must reject"
    );
}

#[test]
fn infer_provider_rejects_empty_batch() {
    let bp = BatchPrices {
        prices: vec![],
        signature: [0u8; 64],
        recovery_id: 0,
    };
    assert!(infer_provider_from_batch(&bp).is_err());
}

// ── 10. MultiBatchPrices duplicate guard ──────────────────────────────────

#[test]
fn multi_batch_rejects_duplicate_providers() {
    let dup = MultiBatchPrices {
        batches: vec![
            oracle::BatchPricesWithProvider {
                provider: OracleProvider::Autonom as u8,
                batch: BatchPrices {
                    prices: vec![],
                    signature: [0u8; 64],
                    recovery_id: 0,
                },
            },
            oracle::BatchPricesWithProvider {
                provider: OracleProvider::Autonom as u8,
                batch: BatchPrices {
                    prices: vec![],
                    signature: [0u8; 64],
                    recovery_id: 0,
                },
            },
        ],
    };
    assert!(dup.verify_no_duplicate_providers().is_err());
}

#[test]
fn multi_batch_accepts_distinct_providers() {
    let mb = MultiBatchPrices {
        batches: vec![
            oracle::BatchPricesWithProvider {
                provider: OracleProvider::ChaosLabs as u8,
                batch: BatchPrices {
                    prices: vec![],
                    signature: [0u8; 64],
                    recovery_id: 0,
                },
            },
            oracle::BatchPricesWithProvider {
                provider: OracleProvider::Autonom as u8,
                batch: BatchPrices {
                    prices: vec![],
                    signature: [0u8; 64],
                    recovery_id: 0,
                },
            },
        ],
    };
    assert!(mb.verify_no_duplicate_providers().is_ok());
}
