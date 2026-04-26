//! Cross-validates the embedded pools_manifest.json against the rest of
//! the adrena-abi shipped artifacts:
//!
//!   * Every autonom-pool `feedIds` entry must lie in the Autonom provider
//!     range (30..=141) as declared by `feed_metadata.providers`.
//!   * Every sessioned feed_id that appears in an autonom-pool's feedIds
//!     must correspond to a symbol that is `sessioned=true` in
//!     `feed_metadata.sessioned`.
//!   * Pool names are unique (also enforced by the loader, but belt-and-
//!     suspenders at artifact level).
//!
//! These invariants are what MrAutonom / adrena-data / services rely on at
//! runtime. If the embedded manifest references a feed that adrena-abi
//! didn't actually register, the service would boot with an invalid
//! runtime shape. This test makes that failure mode impossible to ship.

use adrena_abi::{
    feed_maps::{AUTONOM_MAINNET_JSON, FEED_METADATA_JSON, POOLS_MANIFEST_JSON},
    pools_manifest,
};
use std::collections::{BTreeMap, HashMap, HashSet};

#[test]
fn embedded_manifest_parses_via_public_loader() {
    // Smoke test: the public loader works on the embedded bytes.
    let m = pools_manifest::load_embedded_pools_manifest()
        .expect("embedded pools_manifest must parse + validate");
    assert!(
        !m.pools.is_empty(),
        "embedded pools_manifest must have at least one pool"
    );
}

#[test]
fn autonom_pool_feed_ids_lie_in_autonom_provider_range() {
    let metadata: serde_json::Value =
        serde_json::from_str(FEED_METADATA_JSON).expect("feed_metadata.json parses");
    let autonom_range = metadata["providers"]["autonom"]["range"]
        .as_array()
        .expect("feed_metadata.providers.autonom.range is array");
    let min = autonom_range[0].as_u64().unwrap() as u8;
    let max = autonom_range[1].as_u64().unwrap() as u8;

    let manifest: serde_json::Value =
        serde_json::from_str(POOLS_MANIFEST_JSON).expect("pools_manifest.json parses");
    let pools = manifest["pools"].as_array().expect("pools is array");
    let mut errors = Vec::new();
    for pool in pools {
        let name = pool["name"].as_str().unwrap_or("<unknown>");
        let type_ = pool["type"].as_str().unwrap_or("");
        if type_ != "autonom" {
            continue;
        }
        let feed_ids = pool["feedIds"]
            .as_array()
            .map(|a| {
                a.iter()
                    .filter_map(|v| v.as_u64().map(|n| n as u8))
                    .collect::<Vec<_>>()
            })
            .unwrap_or_default();
        for fid in feed_ids {
            if fid < min || fid > max {
                errors.push(format!(
                    "autonom pool `{name}` feedIds contains {fid}, outside Autonom range {min}..={max}"
                ));
            }
        }
    }
    assert!(
        errors.is_empty(),
        "pools_manifest references feed IDs outside the Autonom provider range:\n{}",
        errors.join("\n")
    );
}

#[test]
fn autonom_pool_feed_ids_have_registered_symbols() {
    // Every feed_id in an autonom pool's feedIds list must exist in
    // autonom.mainnet.json (i.e. the Autonom backend knows how to sign it).
    let autonom: serde_json::Value =
        serde_json::from_str(AUTONOM_MAINNET_JSON).expect("autonom.mainnet.json parses");
    let autonom_map: HashMap<u8, String> = autonom["autonom_feed_map"]
        .as_array()
        .expect("autonom_feed_map is array")
        .iter()
        .map(|entry| {
            let id = entry["adrena_feed_id"].as_u64().unwrap() as u8;
            let sym = entry["symbol"].as_str().unwrap().to_string();
            (id, sym)
        })
        .collect();

    let manifest: serde_json::Value =
        serde_json::from_str(POOLS_MANIFEST_JSON).expect("pools_manifest.json parses");
    let pools = manifest["pools"].as_array().unwrap();
    let mut errors = Vec::new();
    for pool in pools {
        let name = pool["name"].as_str().unwrap_or("<unknown>");
        let type_ = pool["type"].as_str().unwrap_or("");
        if type_ != "autonom" {
            continue;
        }
        for v in pool["feedIds"].as_array().cloned().unwrap_or_default() {
            let fid = v.as_u64().unwrap() as u8;
            if !autonom_map.contains_key(&fid) {
                errors.push(format!(
                    "autonom pool `{name}` feedIds carries {fid} but autonom.mainnet.json has no matching adrena_feed_id"
                ));
            }
        }
    }
    assert!(
        errors.is_empty(),
        "pools_manifest references Autonom feed IDs not present in autonom.mainnet.json:\n{}",
        errors.join("\n")
    );
}

#[test]
fn sessioned_autonom_feeds_referenced_by_pools_are_marked_sessioned() {
    // Any feed the pool declares (and that isn't the shared USDC pricing
    // slot) should have a sessioned flag in feed_metadata. Crypto feeds
    // (USDC/SOL/etc) are unsessioned; commodities (XAU etc) are sessioned.
    // MrAutonom filters by the sessioned flag — if a pool lists a feed the
    // metadata doesn't know about, MrAutonom would silently drop it.
    let metadata: serde_json::Value =
        serde_json::from_str(FEED_METADATA_JSON).expect("feed_metadata.json parses");
    let sessioned = metadata["sessioned"]
        .as_object()
        .expect("feed_metadata.sessioned is object");
    let sessioned_symbols: HashSet<String> = sessioned.keys().cloned().collect();

    let autonom: serde_json::Value =
        serde_json::from_str(AUTONOM_MAINNET_JSON).expect("autonom.mainnet.json parses");
    let autonom_map: BTreeMap<u8, String> = autonom["autonom_feed_map"]
        .as_array()
        .unwrap()
        .iter()
        .map(|entry| {
            let id = entry["adrena_feed_id"].as_u64().unwrap() as u8;
            let sym = entry["symbol"].as_str().unwrap().to_string();
            (id, sym)
        })
        .collect();

    let manifest: serde_json::Value =
        serde_json::from_str(POOLS_MANIFEST_JSON).expect("pools_manifest.json parses");
    let pools = manifest["pools"].as_array().unwrap();
    let mut errors = Vec::new();
    for pool in pools {
        let name = pool["name"].as_str().unwrap_or("<unknown>");
        let type_ = pool["type"].as_str().unwrap_or("");
        if type_ != "autonom" {
            continue;
        }
        for v in pool["feedIds"].as_array().cloned().unwrap_or_default() {
            let fid = v.as_u64().unwrap() as u8;
            let sym = match autonom_map.get(&fid) {
                Some(s) => s,
                None => continue, // covered by the other test
            };
            if !sessioned_symbols.contains(sym) {
                errors.push(format!(
                    "autonom pool `{name}` feedIds={fid} symbol={sym} has no sessioned flag in feed_metadata.sessioned"
                ));
            }
        }
    }
    assert!(
        errors.is_empty(),
        "pools_manifest references feeds whose symbols aren't classified in feed_metadata.sessioned:\n{}",
        errors.join("\n")
    );
}

#[test]
fn pool_names_are_unique() {
    let manifest: serde_json::Value =
        serde_json::from_str(POOLS_MANIFEST_JSON).expect("pools_manifest.json parses");
    let pools = manifest["pools"].as_array().unwrap();
    let mut seen = HashSet::new();
    for pool in pools {
        let name = pool["name"].as_str().unwrap().to_string();
        assert!(
            seen.insert(name.clone()),
            "duplicate pool name `{name}` in pools_manifest.json"
        );
    }
}
