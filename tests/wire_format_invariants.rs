//! Wire-format invariants for the on/off-chain boundary.
//!
//! `BatchPrices::build_message_hash` and
//! `AutonomMarketOpeningData::build_message_hash` are the bytes the upstream
//! signer hashes to produce its secp256k1 signature. The on-chain program
//! recomputes the same bytes and verifies. Any drift here = signed payloads
//! stop verifying = oracle ingestion halts. These tests pin a golden hash
//! for a fixed input so future refactors can't change the format silently.
//!
//! `LimitedString` is the fixed-32-byte name container used by every oracle
//! slot, custody name, and user-profile nickname. Its byte layout is
//! load-bearing for cross-program account reads.

use {
    adrena_abi::{
        autonom_market_opening_data::AutonomMarketOpeningData,
        limited_string::LimitedString,
        oracle::{BatchPrices, OraclePrice, PriceData},
    },
};

// ── 1. BatchPrices message hash ────────────────────────────────────────────

/// Fixed input → fixed hash. Computed from the current implementation. If
/// this hash drifts, EVERY signed batch from upstream signers will be
/// rejected by the on-chain verifier. Update only when the format change is
/// intentional AND coordinated across signer + on-chain + abi.
const BATCH_PRICES_GOLDEN_INPUT_HASH: &str =
    "bc9ed9ddf7593ee3f721a8f1fd5dd5543a751fdafed1ad64b9874bd9c351b467";

#[test]
fn batch_prices_build_message_hash_matches_golden_vector() {
    let bp = BatchPrices {
        prices: vec![
            PriceData {
                feed_id: 0,
                price: 1_000_000_000_000,
                timestamp: 1_700_000_000,
            },
            PriceData {
                feed_id: 30,
                price: 5_500_000_000_000_000,
                timestamp: 1_700_000_001,
            },
            PriceData {
                feed_id: 142,
                price: 9_999_000_000_000,
                timestamp: 1_700_000_002,
            },
        ],
        signature: [0u8; 64],
        recovery_id: 0,
    };
    let hash = bp.build_message_hash().expect("hash builds");
    let actual = hex::encode(hash);
    if actual != BATCH_PRICES_GOLDEN_INPUT_HASH {
        panic!(
            "BatchPrices::build_message_hash drift detected.\n\
             expected: {BATCH_PRICES_GOLDEN_INPUT_HASH}\n\
             actual:   {actual}\n\
             If this change is intentional, update the constant. Otherwise the \
             on-chain verifier will reject every signed batch.",
        );
    }
}

#[test]
fn batch_prices_message_hash_changes_with_input() {
    // Sanity: not a constant function. Same struct with different price
    // produces a different hash.
    let bp_a = BatchPrices {
        prices: vec![PriceData {
            feed_id: 0,
            price: 1,
            timestamp: 1_700_000_000,
        }],
        signature: [0u8; 64],
        recovery_id: 0,
    };
    let bp_b = BatchPrices {
        prices: vec![PriceData {
            feed_id: 0,
            price: 2, // diff: 1 → 2
            timestamp: 1_700_000_000,
        }],
        signature: [0u8; 64],
        recovery_id: 0,
    };
    assert_ne!(
        bp_a.build_message_hash().unwrap(),
        bp_b.build_message_hash().unwrap()
    );
}

#[test]
fn batch_prices_signature_field_does_not_affect_message_hash() {
    // Signature is what's PRODUCED FROM the hash, not what's hashed. Changing
    // it must not change the hash (otherwise sig verification is impossible).
    let prices = vec![PriceData {
        feed_id: 0,
        price: 1,
        timestamp: 1_700_000_000,
    }];
    let bp_a = BatchPrices {
        prices: prices.clone(),
        signature: [0u8; 64],
        recovery_id: 0,
    };
    let bp_b = BatchPrices {
        prices,
        signature: [0xFFu8; 64],
        recovery_id: 1,
    };
    assert_eq!(
        bp_a.build_message_hash().unwrap(),
        bp_b.build_message_hash().unwrap()
    );
}

// ── 2. AutonomMarketOpeningData message hash ───────────────────────────────

const AUTONOM_OPENING_GOLDEN_HASH: &str =
    "3a2b07e25e48c4d9903969b1427d8268fb32baf29983b1a4567101d9f6b045ee";

#[test]
fn autonom_market_opening_message_hash_matches_golden_vector() {
    let data = AutonomMarketOpeningData {
        feeds: vec![36, 37, 38],
        market_close_affected_feeds: vec![36],
        market_open_timestamp: 1_700_000_000,
        market_close_timestamp: 1_700_086_400,
        signature: [0u8; 64],
        recovery_id: 0,
    };
    let hash = data.build_message_hash().expect("hash builds");
    let actual = hex::encode(hash);
    if actual != AUTONOM_OPENING_GOLDEN_HASH {
        panic!(
            "AutonomMarketOpeningData::build_message_hash drift.\n\
             expected: {AUTONOM_OPENING_GOLDEN_HASH}\n\
             actual:   {actual}\n\
             If intentional, update the constant. Otherwise MrAutonom-signed \
             market-opening txs will fail the on-chain secp256k1 verify.",
        );
    }
}

#[test]
fn autonom_market_opening_signature_does_not_affect_hash() {
    let mk = |sig: [u8; 64]| AutonomMarketOpeningData {
        feeds: vec![36],
        market_close_affected_feeds: vec![],
        market_open_timestamp: 1_700_000_000,
        market_close_timestamp: 1_700_086_400,
        signature: sig,
        recovery_id: 0,
    };
    assert_eq!(
        mk([0u8; 64]).build_message_hash().unwrap(),
        mk([0xAAu8; 64]).build_message_hash().unwrap()
    );
}

// ── 3. LimitedString round-trip + boundaries ──────────────────────────────

#[test]
fn limited_string_round_trip_short() {
    let s = "BTCUSD";
    let ls = LimitedString::new(s);
    assert_eq!(String::from(ls), s);
    assert_eq!(ls.length, s.len() as u8);
}

#[test]
fn limited_string_round_trip_at_max_length() {
    let s = "0123456789ABCDEF0123456789ABCDE"; // 31 chars
    assert_eq!(s.len(), LimitedString::MAX_LENGTH);
    let ls = LimitedString::new(s);
    assert_eq!(String::from(ls), s);
    assert_eq!(ls.length, 31);
}

#[test]
fn limited_string_truncates_storage_but_records_full_length() {
    // Input longer than MAX_LENGTH: storage truncates to 31 bytes, but
    // `length` reflects the input's full byte count. This is the existing
    // contract — pin it so a future refactor doesn't silently change it.
    let s = "0123456789ABCDEF0123456789ABCDEF_overflow"; // > 31 chars
    let ls = LimitedString::new(s);
    assert_eq!(ls.length, s.len() as u8, "length is the input's full size");
    assert_eq!(&ls.value[..31], &s.as_bytes()[..31], "storage holds first 31 bytes");
}

#[test]
fn limited_string_default_is_empty() {
    let d = LimitedString::default();
    assert_eq!(d.length, 0);
    assert_eq!(d.value, [0u8; 31]);
    assert_eq!(String::from(d), "");
}

#[test]
fn limited_string_eq_compares_only_used_bytes() {
    // Two strings with the same logical content but different padding bytes
    // beyond `length` must compare equal. Critical for slot-by-name lookups.
    let mut a = LimitedString::new("X");
    let mut b = LimitedString::new("X");
    // Stomp garbage past length on `b`.
    for byte in b.value.iter_mut().skip(1) {
        *byte = 0xFF;
    }
    a.value[2] = 0; // ensure padding differs
    assert_eq!(a, b, "PartialEq must ignore bytes past `length`");
}

#[test]
fn limited_string_to_fixed_32_layout_pins_layout() {
    let s = "BTC";
    let ls = LimitedString::new(s);
    let buf = ls.to_fixed_32();
    // Layout contract: 31 bytes value + 1 byte length at index 31.
    assert_eq!(&buf[..3], s.as_bytes());
    assert_eq!(&buf[3..31], &[0u8; 28], "trailing value bytes are zero");
    assert_eq!(buf[31], 3, "byte at index 31 is the length");
}

#[test]
fn limited_string_new_const_matches_runtime() {
    const STATIC: LimitedString = LimitedString::new_const("USDC");
    let runtime = LimitedString::new("USDC");
    assert_eq!(STATIC, runtime);
}

#[test]
fn limited_string_struct_size_is_32_bytes() {
    // Pod + repr(C) → exactly 32 bytes (31 value + 1 length, no padding).
    // If this changes, every Oracle slot's 64-byte size assumption breaks.
    assert_eq!(std::mem::size_of::<LimitedString>(), 32);
}

// ── 4. OraclePrice slot size ──────────────────────────────────────────────

#[test]
fn oracle_price_struct_size_is_64_bytes() {
    // Critical: MrSablier and MrOracle parsers walk Oracle PDA assuming each
    // slot is exactly 64 bytes. If the struct grows or shrinks (e.g. a field
    // added without padding adjustment), every off-chain parser silently
    // mis-reads slots.
    assert_eq!(std::mem::size_of::<OraclePrice>(), 64);
}

#[test]
fn oracle_price_default_is_zero_filled() {
    let d = OraclePrice::default();
    assert_eq!(d.price, 0);
    assert_eq!(d.confidence, 0);
    assert_eq!(d.timestamp, 0);
    assert_eq!(d.exponent, 0);
    assert_eq!(d.feed_id, 0);
    assert_eq!(d.name, LimitedString::default());
}
