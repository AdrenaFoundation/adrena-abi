//! Cross-references every entry in the per-provider feed maps against
//! `feed_metadata.json` and the canonical provider ranges. Catches:
//!   * symbols in a provider map that have no `sessioned` flag (orphan symbol)
//!   * adrena_feed_id outside the declared provider range (range drift)
//!   * symbols inconsistent across providers (e.g. SOLUSD on ChaosLabs but
//!     SOL_USD on Autonom — different strings, would skip metadata lookup)
//!   * stablecoin_feed_ids in feed_metadata pointing at non-USDC entries

use adrena_abi::feed_maps::{
    AUTONOM_MAINNET_JSON, CHAOSLABS_MAINNET_JSON, FEED_METADATA_JSON,
    SWITCHBOARD_DEVNET_JSON, SWITCHBOARD_MAINNET_JSON,
};
use serde_json::Value;
use std::collections::{BTreeMap, BTreeSet};

fn parse(name: &str, json: &str) -> Value {
    serde_json::from_str(json).unwrap_or_else(|e| panic!("{name}: invalid JSON: {e}"))
}

/// Pulls the `(adrena_feed_id, symbol)` pairs out of a provider feed map JSON.
/// The shape is `{ "<provider>_feed_map": [ { "adrena_feed_id": <u8>, "symbol": "<str>", ... }, ... ] }`.
fn extract_entries(name: &str, json: &Value) -> Vec<(u8, String)> {
    let map_key = json
        .as_object()
        .expect("provider map must be a JSON object")
        .keys()
        .find(|k| k.ends_with("_feed_map"))
        .unwrap_or_else(|| panic!("{name}: no <provider>_feed_map array found"));

    json[map_key]
        .as_array()
        .unwrap_or_else(|| panic!("{name}: {map_key} must be an array"))
        .iter()
        .map(|entry| {
            let id = entry["adrena_feed_id"]
                .as_u64()
                .unwrap_or_else(|| panic!("{name}: missing adrena_feed_id"))
                as u8;
            let symbol = entry["symbol"]
                .as_str()
                .unwrap_or_else(|| panic!("{name}: missing symbol on adrena_feed_id={id}"))
                .to_string();
            (id, symbol)
        })
        .collect()
}

#[test]
fn every_symbol_has_a_sessioned_entry_and_every_id_is_in_range() {
    let metadata = parse("feed_metadata", FEED_METADATA_JSON);

    let sessioned: BTreeMap<String, bool> = metadata["sessioned"]
        .as_object()
        .expect("feed_metadata.sessioned must be an object")
        .iter()
        .map(|(k, v)| (k.clone(), v.as_bool().expect("sessioned values must be bool")))
        .collect();

    let providers = metadata["providers"]
        .as_object()
        .expect("feed_metadata.providers must be an object");

    let range_for = |provider_key: &str| -> (u8, u8) {
        let arr = providers[provider_key]["range"]
            .as_array()
            .unwrap_or_else(|| panic!("providers.{provider_key}.range missing"));
        let lo = arr[0].as_u64().unwrap() as u8;
        let hi = arr[1].as_u64().unwrap() as u8;
        (lo, hi)
    };

    let chaoslabs_range   = range_for("chaoslabs");
    let autonom_range     = range_for("autonom");
    let switchboard_range = range_for("switchboard");

    let providers: &[(&str, &str, (u8, u8))] = &[
        ("chaoslabs.mainnet",   CHAOSLABS_MAINNET_JSON,   chaoslabs_range),
        ("autonom.mainnet",     AUTONOM_MAINNET_JSON,     autonom_range),
        ("switchboard.mainnet", SWITCHBOARD_MAINNET_JSON, switchboard_range),
        ("switchboard.devnet",  SWITCHBOARD_DEVNET_JSON,  switchboard_range),
    ];

    let mut errors = Vec::new();
    for (name, json_str, (lo, hi)) in providers {
        let parsed = parse(name, json_str);
        for (id, symbol) in extract_entries(name, &parsed) {
            if id < *lo || id > *hi {
                errors.push(format!(
                    "{name}: adrena_feed_id={id} symbol={symbol} outside range {lo}..={hi}",
                ));
            }
            if !sessioned.contains_key(&symbol) {
                errors.push(format!(
                    "{name}: symbol {symbol} (adrena_feed_id={id}) has no entry in feed_metadata.sessioned",
                ));
            }
        }
    }

    assert!(
        errors.is_empty(),
        "feed_metadata consistency violations:\n{}",
        errors.join("\n")
    );
}

#[test]
fn symbols_at_same_canonical_offset_are_identical_across_providers() {
    // The canonical layout means: ChaosLabs slot N must have the same symbol
    // as Autonom slot 30+N must have the same symbol as Switchboard slot 142+N
    // for every N in 0..6 (the crypto block).
    let chaoslabs   = extract_entries("chaoslabs.mainnet",   &parse("chaoslabs.mainnet",   CHAOSLABS_MAINNET_JSON));
    let autonom     = extract_entries("autonom.mainnet",     &parse("autonom.mainnet",     AUTONOM_MAINNET_JSON));
    let switchboard = extract_entries("switchboard.mainnet", &parse("switchboard.mainnet", SWITCHBOARD_MAINNET_JSON));

    let by_id_chaoslabs: BTreeMap<u8, String> = chaoslabs.into_iter().collect();
    let by_id_autonom:   BTreeMap<u8, String> = autonom.into_iter().collect();
    let by_id_switchboard: BTreeMap<u8, String> = switchboard.into_iter().collect();

    let mut errors = Vec::new();
    for offset in 0u8..6 {
        let cl = by_id_chaoslabs.get(&offset);
        let au = by_id_autonom.get(&(30 + offset));
        let sb = by_id_switchboard.get(&(142 + offset));
        let symbols: BTreeSet<&String> = [cl, au, sb].into_iter().flatten().collect();
        if symbols.len() > 1 {
            errors.push(format!(
                "offset +{offset}: ChaosLabs={cl:?} Autonom={au:?} Switchboard={sb:?} disagree",
            ));
        }
    }

    assert!(
        errors.is_empty(),
        "canonical crypto block symbol mismatch:\n{}",
        errors.join("\n")
    );
}

#[test]
fn stablecoin_feed_ids_match_canonical_usdc_slots() {
    use adrena_abi::feed_ids::{AUTONOM_USDC, CHAOSLABS_USDC, SWITCHBOARD_USDC};

    let metadata = parse("feed_metadata", FEED_METADATA_JSON);
    let stable_arr = metadata["stablecoin_feed_ids"]
        .as_array()
        .expect("stablecoin_feed_ids must be an array");
    let stable: BTreeSet<u8> = stable_arr.iter().map(|v| v.as_u64().unwrap() as u8).collect();

    let expected: BTreeSet<u8> = [CHAOSLABS_USDC, AUTONOM_USDC, SWITCHBOARD_USDC]
        .into_iter()
        .collect();

    assert_eq!(
        stable, expected,
        "feed_metadata.stablecoin_feed_ids must equal {{CHAOSLABS_USDC, AUTONOM_USDC, SWITCHBOARD_USDC}}",
    );
}
