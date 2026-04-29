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
fn every_sessioned_symbol_is_present_in_at_least_one_provider_map() {
    // The previous test goes one direction (every map symbol must have a
    // sessioned entry). This goes the OTHER direction: every symbol that's
    // declared sessioned in feed_metadata.json must also appear in at least
    // one per-provider feed map. This catches the case where feed_metadata
    // lists a symbol the deployment expects but no provider has been wired
    // up to serve it — the failure mode that previously bit us when the
    // autonom map drifted out of sync with feed_metadata.sessioned.

    let metadata = parse("feed_metadata", FEED_METADATA_JSON);
    let sessioned = metadata["sessioned"]
        .as_object()
        .expect("feed_metadata.sessioned must be an object");

    let mut all_provider_symbols: BTreeSet<String> = BTreeSet::new();
    for (name, json_str) in [
        ("chaoslabs.mainnet",   CHAOSLABS_MAINNET_JSON),
        ("autonom.mainnet",     AUTONOM_MAINNET_JSON),
        ("switchboard.mainnet", SWITCHBOARD_MAINNET_JSON),
        ("switchboard.devnet",  SWITCHBOARD_DEVNET_JSON),
    ] {
        let parsed = parse(name, json_str);
        for (_id, symbol) in extract_entries(name, &parsed) {
            all_provider_symbols.insert(symbol);
        }
    }

    let mut orphans: Vec<String> = Vec::new();
    for symbol in sessioned.keys() {
        if !all_provider_symbols.contains(symbol) {
            orphans.push(symbol.clone());
        }
    }

    assert!(
        orphans.is_empty(),
        "feed_metadata.sessioned lists symbols that no provider feed map carries: {:?}\n\
         Either remove them from feed_metadata.sessioned or add the corresponding entry\n\
         to chaoslabs.mainnet.json / autonom.mainnet.json / switchboard.mainnet.json.",
        orphans
    );
}

#[test]
fn autonom_map_covers_full_canonical_layout() {
    // Locks the Autonom map to the current launch layout: 30..38 inclusive,
    // 9 entries (6 crypto + 3 commodities), all symbols present in
    // feed_metadata.sessioned. If the launch layout grows, this test must be
    // updated in the same PR that adds the new alias — that's the point: it
    // forces a deliberate update instead of a silent drift.
    //
    // Launch layout:
    //   30..35 crypto block  (SOL, jitoSOL, BTC, WBTC, BONK, USDC) — unsessioned
    //   36       XAU (Gold)                                         — sessioned
    //   37       XAG (Silver)                                       — sessioned
    //   38       WTI (Crude)                                        — sessioned
    //
    // Future commodities (Brent, etc.) append at 39+ in a coordinated release
    // that bumps this test, feed_metadata.sessioned, the autonom backend's
    // feed_id_aliases.json, and pools_manifest.commodities-pool.feedIds in
    // lockstep.
    //
    // Why this exists: the previous round of audit caught a state where
    // feed_metadata listed symbols that autonom.mainnet.json didn't carry,
    // causing MrAutonom to fail at boot with "feed_id N not present". This
    // test makes that failure mode impossible to ship.

    let parsed = parse("autonom.mainnet", AUTONOM_MAINNET_JSON);
    let entries = extract_entries("autonom.mainnet", &parsed);
    let by_id: BTreeMap<u8, String> = entries.into_iter().collect();

    let expected: BTreeMap<u8, &str> = [
        (30u8, "SOLUSD"),
        (31, "JITOSOLUSD"),
        (32, "BTCUSD"),
        (33, "WBTCUSD"),
        (34, "BONKUSD"),
        (35, "USDCUSD"),
        (36, "XAU"),
        (37, "XAG"),
        (38, "WTI"),
    ]
    .into_iter()
    .collect();

    let mut errors = Vec::new();
    for (id, sym) in &expected {
        match by_id.get(id) {
            Some(actual) if actual == sym => {}
            Some(actual) => errors.push(format!(
                "autonom.mainnet.json: adrena_feed_id={id} expected symbol={sym} but got {actual}",
            )),
            None => errors.push(format!(
                "autonom.mainnet.json: missing adrena_feed_id={id} ({sym})",
            )),
        }
    }
    for id in by_id.keys() {
        if !expected.contains_key(id) {
            errors.push(format!(
                "autonom.mainnet.json: adrena_feed_id={id} present but not in the expected launch layout",
            ));
        }
    }

    assert!(
        errors.is_empty(),
        "autonom.mainnet.json doesn't match the canonical launch layout:\n{}\n\
         If the launch scope changed, update both this test's `expected` map AND \
         the autonom backend's feed_id_aliases.json in the same PR.",
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
