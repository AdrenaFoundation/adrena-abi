//! Locks down which Switchboard slots are allowed to carry placeholder
//! ("dummy") feed hashes. The current allowlist is `[143, 144]` (jitoSOL and
//! BTC) — those are placeholders waiting on real Switchboard mainnet hashes.
//!
//! Any new dummy slot must be added to this allowlist deliberately. Any old
//! dummy slot that gets a real hash must be removed from this allowlist.
//! This makes "accidentally activate dummy 143 in production" impossible
//! without explicitly editing this test file in the same PR.

use adrena_abi::feed_maps::{SWITCHBOARD_DEVNET_JSON, SWITCHBOARD_MAINNET_JSON};
use serde_json::Value;
use std::collections::BTreeSet;

const ALLOWED_DUMMY_FEED_IDS: &[u8] = &[143, 144];

fn dummy_ids(name: &str, json: &str) -> BTreeSet<u8> {
    let parsed: Value = serde_json::from_str(json)
        .unwrap_or_else(|e| panic!("{name}: invalid JSON: {e}"));
    parsed["switchboard_feed_map"]
        .as_array()
        .unwrap_or_else(|| panic!("{name}: switchboard_feed_map missing"))
        .iter()
        .filter_map(|entry| {
            if entry.get("_DUMMY").and_then(|v| v.as_bool()).unwrap_or(false) {
                entry["adrena_feed_id"].as_u64().map(|v| v as u8)
            } else {
                None
            }
        })
        .collect()
}

#[test]
fn switchboard_mainnet_dummy_slots_match_allowlist() {
    let actual = dummy_ids("switchboard.mainnet", SWITCHBOARD_MAINNET_JSON);
    let expected: BTreeSet<u8> = ALLOWED_DUMMY_FEED_IDS.iter().copied().collect();
    assert_eq!(
        actual, expected,
        "switchboard.mainnet dummy slots changed.\n  allowed: {ALLOWED_DUMMY_FEED_IDS:?}\n  actual:  {actual:?}\nIf you added a new dummy, update ALLOWED_DUMMY_FEED_IDS in tests/no_dummy_in_production.rs.\nIf you replaced a dummy with a real hash, remove that id from the allowlist.",
    );
}

#[test]
fn switchboard_devnet_dummy_slots_match_allowlist() {
    let actual = dummy_ids("switchboard.devnet", SWITCHBOARD_DEVNET_JSON);
    let expected: BTreeSet<u8> = ALLOWED_DUMMY_FEED_IDS.iter().copied().collect();
    assert_eq!(
        actual, expected,
        "switchboard.devnet dummy slots changed.\n  allowed: {ALLOWED_DUMMY_FEED_IDS:?}\n  actual:  {actual:?}",
    );
}

#[test]
fn dummy_hashes_are_obviously_placeholder_strings() {
    // Belt-and-braces: even if a dev removes _DUMMY: true accidentally, the
    // hash strings themselves are recognizably placeholder. This test asserts
    // they stay that way until the slot is decommissioned via the allowlist.
    for json in [SWITCHBOARD_MAINNET_JSON, SWITCHBOARD_DEVNET_JSON] {
        let parsed: Value = serde_json::from_str(json).unwrap();
        for entry in parsed["switchboard_feed_map"].as_array().unwrap() {
            if entry.get("_DUMMY").and_then(|v| v.as_bool()).unwrap_or(false) {
                let h = entry["switchboard_feed_hash"].as_str().unwrap();
                assert!(
                    h == "deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef"
                        || h == "cafebabecafebabecafebabecafebabecafebabecafebabecafebabecafebabe",
                    "dummy slot adrena_feed_id={} has unrecognized placeholder hash {h}; either it's a real hash (drop _DUMMY: true) or use the standard deadbeef/cafebabe placeholder",
                    entry["adrena_feed_id"]
                );
            }
        }
    }
}
