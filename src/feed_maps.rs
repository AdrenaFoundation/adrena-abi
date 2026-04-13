//! Embedded canonical adrena-abi artifacts.
//!
//! Every offchain service should consume these constants instead of vendoring
//! the JSON files locally. The bytes here are guaranteed to match the hashes
//! recorded in [`ARTIFACT_MANIFEST_JSON`] (verified by `tests/artifact_hashes.rs`).
//!
//! Runtime override pattern: services may load a different file from disk, but
//! they MUST log both the override path AND its sha256 at startup so drift is
//! visible in the logs.

pub const ARTIFACT_MANIFEST_JSON: &str =
    include_str!("../configs/artifact_manifest.json");

pub const CHAOSLABS_MAINNET_JSON: &str =
    include_str!("../configs/oracles/chaoslabs.mainnet.json");

pub const AUTONOM_MAINNET_JSON: &str =
    include_str!("../configs/oracles/autonom.mainnet.json");

pub const SWITCHBOARD_MAINNET_JSON: &str =
    include_str!("../configs/oracles/switchboard.mainnet.json");

pub const SWITCHBOARD_DEVNET_JSON: &str =
    include_str!("../configs/oracles/switchboard.devnet.json");

pub const FEED_METADATA_JSON: &str =
    include_str!("../configs/oracles/feed_metadata.json");
