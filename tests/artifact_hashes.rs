//! Verifies that the sha256 of every embedded config file matches the value
//! stored in `configs/artifact_manifest.json`. If anyone edits a feed map or
//! the IDL without regenerating the manifest, this test goes red.

use adrena_abi::feed_maps::{
    ARTIFACT_MANIFEST_JSON, AUTONOM_MAINNET_JSON, CHAOSLABS_MAINNET_JSON,
    FEED_METADATA_JSON, SWITCHBOARD_DEVNET_JSON, SWITCHBOARD_MAINNET_JSON,
};
use sha2::{Digest, Sha256};

const IDL_JSON: &str = include_str!("../idl/adrena.json");

fn sha256_hex(content: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(content.as_bytes());
    hex::encode(hasher.finalize())
}

#[test]
fn manifest_hashes_match_embedded_files() {
    let manifest: serde_json::Value = serde_json::from_str(ARTIFACT_MANIFEST_JSON)
        .expect("artifact_manifest.json must be valid JSON");

    let expected = |key: &str| -> String {
        let v = if key == "idl" {
            manifest
                .get("idl_sha256")
                .and_then(|v| v.as_str())
                .expect("artifact_manifest.idl_sha256 missing")
        } else {
            manifest
                .get("feed_maps")
                .and_then(|m| m.get(key))
                .and_then(|v| v.as_str())
                .unwrap_or_else(|| panic!("artifact_manifest.feed_maps.{key} missing"))
        };
        v.to_string()
    };

    let cases: &[(&str, &str, &str)] = &[
        ("idl",                 IDL_JSON,                 "idl/adrena.json"),
        ("chaoslabs.mainnet",   CHAOSLABS_MAINNET_JSON,   "configs/oracles/chaoslabs.mainnet.json"),
        ("autonom.mainnet",     AUTONOM_MAINNET_JSON,     "configs/oracles/autonom.mainnet.json"),
        ("switchboard.mainnet", SWITCHBOARD_MAINNET_JSON, "configs/oracles/switchboard.mainnet.json"),
        ("switchboard.devnet",  SWITCHBOARD_DEVNET_JSON,  "configs/oracles/switchboard.devnet.json"),
        ("feed_metadata",       FEED_METADATA_JSON,       "configs/oracles/feed_metadata.json"),
    ];

    let mut failures = Vec::new();
    for (key, content, path) in cases {
        let actual = sha256_hex(content);
        let expected = expected(key);
        if actual != expected {
            failures.push(format!(
                "{path}: manifest expected sha256={expected} but file content hashes to {actual}",
            ));
        }
    }

    assert!(
        failures.is_empty(),
        "artifact_manifest.json is out of sync with embedded files:\n{}",
        failures.join("\n")
    );
}
