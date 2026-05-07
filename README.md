# adrena-abi

Canonical, version-pinned source of truth for everything off-chain Adrena
services need to talk to the on-chain program:

- The Adrena IDL (Anchor 0.31 format)
- Oracle feed maps for ChaosLabs, Autonom, Switchboard (mainnet + devnet)
- Cross-provider feed metadata (provider ranges, sessioned flags, stablecoin slots)
- The canonical pool manifest + loader (pool name, address, custodies, lpMint, automation flags)
- Ported program state types + events + errors so off-chain consumers can decode
  raw account data and emitted events without bundling the on-chain program crate
- A signed artifact manifest with sha256 hashes of every shipped file
- Rust constants and `include_str!`'d JSON for native consumers
- An npm package (`@adrena/abi`) that ships the same artifacts to TypeScript consumers

Both Rust services and TypeScript services pin the **same git commit** of this
repo. There is no version drift between consumers, no service-local IDL copies,
and no service-local feed maps. Bumping the canonical artifact is a one-place
change here followed by a coordinated commit-hash bump across consumers.

---

## Repository layout

```
adrena-abi/
├── Cargo.toml                              # Rust crate manifest
├── package.json                            # npm package manifest (@adrena/abi)
├── README.md                               # this file
├── idl/
│   ├── adrena.json                         # canonical IDL (Anchor 0.31 — has `address` field)
│   ├── adrena.d.ts                         # full preserved Adrena type for TS inference
│   └── adrena.ts                           # legacy const-style export (kept for transition)
├── configs/
│   ├── artifact_manifest.json              # signed manifest with sha256s of every shipped file
│   ├── pools_manifest.json                 # canonical pool manifest (names, addresses, custodies, lpMint, feedIds, automation flags)
│   ├── pools_manifest_loader.ts            # typed TS loader (types + validation + PDA derivation)
│   └── oracles/
│       ├── chaoslabs.{mainnet,devnet}.json # ChaosLabs feed map (slots 0..=29)
│       ├── autonom.{mainnet,devnet}.json   # Autonom feed map (slots 30..=141)
│       ├── switchboard.{mainnet,devnet}.json    # Switchboard feed map (slots 142..=255), on-chain bound
│       ├── switchboard_other.{mainnet,devnet}.json  # OFF-CHAIN-ONLY map (ADX/ALP spot pricing)
│       └── feed_metadata.json              # cross-provider metadata: ranges, stables, sessioned[symbol]
├── src/
│   ├── lib.rs                              # crate entrypoint, re-exports, declare_id, CPI account stubs
│   ├── feed_maps.rs                        # `include_str!` of every config JSON
│   ├── feed_ids.rs                         # provider ranges + USDC slots + crypto-block array
│   ├── oracle.rs                           # OracleProvider, BatchPrices, MultiBatchPrices, OraclePrice, math
│   ├── pda.rs                              # 29 PDA derivation helpers
│   ├── types.rs                            # instruction params + state account structs (Pool, Custody, Cortex, Position, Staking, ...)
│   ├── error.rs                            # AdrenaError enum (ported from program)
│   ├── events.rs                           # 14 #[event] structs (OpenPosition, ClosePosition, Liquidate, ...)
│   ├── pool_info_snapshot.rs               # CustodyInfoSnapshotPda + SyntheticCustodyInfoSnapshotPda
│   ├── vest.rs                             # Vest zero-copy account decoder
│   ├── genesis_lock.rs                     # GenesisLock zero-copy account decoder
│   ├── user_profile_enums.rs               # ProfilePicture, Title, Achievements enums + tables
│   ├── pools_manifest.rs                   # Rust-side pools_manifest loader + on-chain validator
│   ├── math.rs                             # fixed-point helpers (BPS, RATE, USD scaling)
│   ├── limited_string.rs                   # 32-byte bounded string
│   ├── liquidation_price.rs                # liquidation-price formula
│   └── autonom_market_opening_data.rs      # signed market-hours payload
└── tests/
    ├── artifact_hashes.rs                  # sha256-verifies every embedded file vs manifest
    ├── feed_metadata_consistency.rs        # cross-references provider maps vs metadata
    ├── pools_manifest_consistency.rs       # autonom feedIds in range, symbols registered, sessioned-vs-symbol agreement
    ├── oracle_invariants.rs                # constants + provider routing + OraclePrice math
    ├── wire_format_invariants.rs           # golden hashes for BatchPrices / AutonomMarketOpeningData / LimitedString layout
    ├── pinned_addresses.rs                 # program ID, mints, PDAs vs mainnet truth
    └── no_dummy_in_production.rs           # mainnet feed maps must not contain `_DUMMY: true` entries
```

---

## Canonical feed-id layout (release/39)

Each provider's range starts with the same 6-asset crypto block at offset
`+0..=+5` (SOL, jitoSOL, BTC, WBTC, BONK, USDC). Provider ranges are
hard-enforced by `OracleProvider::feed_id_range` in [`src/oracle.rs`](src/oracle.rs).

| Slot offset | Asset       | ChaosLabs (`0..=29`) | Autonom (`30..=141`) | Switchboard (`142..=255`) |
|---|---|---|---|---|
| +0 | SOLUSD     | 0 | 30 | 142 |
| +1 | JITOSOLUSD | 1 | 31 | 143 |
| +2 | BTCUSD     | 2 | 32 | 144 |
| +3 | WBTCUSD    | 3 | 33 | 145 |
| +4 | BONKUSD    | 4 | 34 | 146 |
| +5 | USDCUSD    | 5 | 35 | 147 |

USDC is the only feed where the on-chain code hardcodes the slot — see
`get_confidence_from_price` in [`src/oracle.rs`](src/oracle.rs). The hardcode
treats `feed_id == 5 || feed_id == 35 || feed_id == 147` as stablecoin (0 bps
confidence band). Any change to the canonical USDC slot of any provider
requires editing both the feed map AND the on-chain constant in lockstep.

After the crypto block, Autonom carries the live commodity feeds:

| adrena_feed_id | Symbol | Status |
|---|---|---|
| 36 | XAU | live |
| 37 | XAG | live |
| 38 | WTI | live |

Future commodities (e.g. Brent) append at 39+ in coordinated releases that
bump `autonom.mainnet.json`, `feed_metadata.sessioned`, the adrena program
bootstrap ix, and the Autonom backend's `feed_id_aliases.json` in lockstep.
MrAutonom only manages market hours for **sessioned** symbols (XAU, XAG, WTI
today); the crypto block is 24/7 and is filtered out via
`feed_metadata.sessioned[symbol]`.

---

## Pools manifest

`configs/pools_manifest.json` is the canonical inventory of live pools. Two
pools currently ship:

| Pool | Type | Address | LP mint | Custodies | Synthetic custodies |
|---|---|---|---|---|---|
| `main-pool`         | gmx     | `4bQRutgDJs6vuh6ZcWaPVXiQaBzbHketjbCDjL4oRN34` | `4yCLi5y…Uqwj` (ALP)   | USDC, BONK, jitoSOL, WBTC | — |
| `commodities-pool`  | autonom | `GN2hyBVHcUitWETeDfAoeXDMqow1x8StqdRFnGaUB2vb` | `GMZ7hCG…Lz5Cx` (RWALP) | USDC                      | XAU, WTI, XAG (slot order) |

Note: `synthetic_custodies` slot order is `[XAU, WTI, XAG]` because the WTI
proposal landed on chain before XAG. The Rust loader's
`validate_and_build_pool_context` performs `Vec<Pubkey>` equality against the
on-chain `Pool.synthetic_custodies` array and refuses to boot the pool on
order drift (commodities-pool gets quarantined).

Loaders enforce:
- Pool name uniqueness
- `getPoolPda(name) == address` (catches typos)
- Autonom pools must have non-empty `feedIds`
- All `feedIds` must be valid `u8`
- (Rust on-chain) custodies, syntheticCustodies, and lpMint must match the
  live `Pool` account field-for-field

Rust:
```rust
use adrena_abi::pools_manifest::{
    load_pools_manifest_with_override,
    validate_and_build_pool_context,
};
```

TypeScript:
```ts
import {
    loadPoolsManifestWithOverride,
    resolvePoolContexts,
} from "@adrena/abi/configs/pools_manifest_loader";
```

Every consumer accepts a `--manifest-path <path>` runtime override; the
embedded manifest is the default truth.

---

## Consumers and how they import

Every off-chain service pins this repo at a specific git commit. Pin updates
are coordinated across all consumers — see "Bumping for a new release" below.

### Rust consumers (Cargo `git` dep)

| Repo | Imports | Used for |
|---|---|---|
| **MrOracle**          | feed-map constants + PDA helpers + oracle wire types | Provider range validation, embedded feed maps, on-demand Switchboard signing |
| **MrSablier**         | `Pool`, `Custody`, `Position`, `LeverageCheckType`, PDA helpers | Liquidation / SL-TP / limit-order automation |
| **MrSablierStaking**  | `Cortex`, `Pool`, `Staking`, PDA helpers | Staking-round resolution + reward distribution |
| **MrNotification**    | `events::*` + `BorshDeserialize` re-export | Anchor event decoding for every emitted event |

All four pin via `Cargo.toml`:
```toml
adrena-abi = { git = "https://github.com/AdrenaFoundation/adrena-abi.git", rev = "<commit-hash>" }
```

### TypeScript consumers (npm `github:` dep)

| Repo | Imports | Used for |
|---|---|---|
| **adrena-data/cron**         | IDL, autonom + switchboard feed maps, `feed_metadata.json`, `pools_manifest.json` | AdrenaClient, oracle ingestion, processor seeding |
| **adrena-data/api**          | IDL, `pools_manifest.json` (for primary pool selection) | Datapi `AdrenaClient` + route handlers |
| **adrena-data/processor**    | IDL (as `CURRENT_IDL`) | Slot-keyed event decoder |
| **adrena-data/enricher**     | IDL | Position/order enrichment |
| **MrAutonom**                | IDL, `autonom.mainnet.json`, `feed_metadata.json`, `artifact_manifest.json`, `pools_manifest.json` | Market-hours gating, sessioned-symbol filter |
| **discord-bot**              | IDL, `switchboard_other.mainnet.json`, `feed_metadata.json` | ADX/ALP price observability |
| **frontend**                 | IDL, `pools_manifest.json` | AdrenaClient, pool-aware routing |

All pin via `package.json`:
```json
"@adrena/abi": "github:AdrenaFoundation/adrena-abi#<commit-hash>"
```

---

## Variable naming rule

**Variable names referencing "the current IDL" or "the current feed map" MUST
NOT bake in a release version number.** Use neutral names like `CURRENT_IDL`,
`AdrenaIdl`, `CURRENT_IDL_JSON`. The bad pattern is something like
`V2_1_0_IDL_JSON` — that name forces a sweep-and-rename every time the
program ships a new release, which is exactly the kind of mechanical churn
this repo exists to eliminate.

The only exception is **historical immutable snapshots**. For example, in
`adrena-data/processor/src/utils.ts`, the slot-keyed dispatch table imports
each frozen historical IDL under a version-named binding:

```typescript
import { IDL as V1_3_8_IDL } from './targetV1-3-8/adrena';
```

That naming is correct because each `VX_Y_Z_IDL` literally refers to a frozen
artifact at `./targetVX-Y-Z/adrena.json` that never changes. The "current" IDL
imported from `@adrena/abi` is bound to `CURRENT_IDL`, never to a version name.

---

## Rust public surface

`src/lib.rs` re-exports everything off-chain consumers need:

- **Oracle types** ([`oracle::*`](src/oracle.rs)) — `Oracle`, `OraclePrice`, `BatchPrices`, `BatchPricesWithProvider`, `MultiBatchPrices`, `PriceData`, `OracleProvider`, `OracleVersion`, `get_confidence_from_price`, `infer_provider_from_batch`. Wire constants: `STALENESS=7s`, `MAX_ORACLE_PRICES_COUNT=50`, `ORACLE_EXPONENT_SCALE=-9`, `ORACLE_PRICE_SCALE=1e9`, `MAX_WRITE_TIME_FUTURE_DRIFT_SECONDS=2`.
- **State accounts** ([`types::*`](src/types.rs)) — `Pool`, `Custody`, `Cortex`, `Position`, `Staking`, `UserStaking`, `UserProfile`, `LimitOrderBook`, `MultiOracleConfig`, `LeverageCheckType`, `LeverageCheckStatus`, `PoolType`, `PoolVersion`, `PoolLiquidityState`, `PositionExitFeeConfig`.
- **Instruction params** ([`types::*`](src/types.rs)) — every `<Action>Params` struct used by Anchor methods (close/liquidate/limit-order/swap/add+remove liquidity/update_oracle/autonom_market_opening/...).
- **Events** ([`events::*`](src/events.rs)) — 14 `#[event]` structs: `OpenPositionEvent`, `IncreasePositionEvent`, `ClosePositionEvent`, `AddCollateralEvent`, `RemoveCollateralEvent`, `LiquidateEvent`, `AddLockedStakeEvent`, `UpgradeLockedStakeEvent`, `FinalizeLockedStakeEvent`, `RemoveLockedStakeEvent`, `SetStopLossEvent`, `SetTakeProfitEvent`, `CancelStopLossEvent`, `CancelTakeProfitEvent`. Carry the same Anchor discriminator as the on-chain emissions.
- **Errors** ([`error::*`](src/error.rs)) — `AdrenaError` enum (port of the program's `#[error_code]` enum).
- **State decoders** — `Vest` ([`vest::*`](src/vest.rs)), `GenesisLock` ([`genesis_lock::*`](src/genesis_lock.rs)), `CustodyInfoSnapshotPda` + `SyntheticCustodyInfoSnapshotPda` ([`pool_info_snapshot::*`](src/pool_info_snapshot.rs)), user-profile enums ([`user_profile_enums::*`](src/user_profile_enums.rs)).
- **PDA helpers** ([`pda::*`](src/pda.rs)) — 29 helpers: `get_cortex_pda`, `get_pool_pda`, `get_genesis_lock_pda`, `get_oracle_pda`, `get_custody_pda`, `get_custody_token_account_pda`, `get_position_pda`, `get_staking_pda`, `get_user_staking_pda`, `get_lp_token_mint_pda`, `get_lm_token_mint_pda`, `get_user_profile_pda`, `get_vest_pda`, `get_vest_registry_pda`, `get_limit_order_book_pda`, `get_collateral_escrow_pda`, `get_transfer_authority_pda`, `get_referrer_reward_token_vault_pda`, governance helpers (`get_realm_pda`, `get_realm_config_pda`, `get_token_owner_record_pda`, ...).
- **Feed-map JSON** ([`feed_maps::*`](src/feed_maps.rs)) — `include_str!`'d constants for every JSON file under `configs/oracles/` plus `ARTIFACT_MANIFEST_JSON` and `POOLS_MANIFEST_JSON`.
- **Feed-id constants** ([`feed_ids::*`](src/feed_ids.rs)) — `CHAOSLABS_RANGE`, `AUTONOM_RANGE`, `SWITCHBOARD_RANGE`, `CHAOSLABS_USDC`, `AUTONOM_USDC`, `SWITCHBOARD_USDC`, `AUTONOM_CRYPTO_FEED_IDS`, `USDC_OFFSET`.
- **Pools manifest** ([`pools_manifest::*`](src/pools_manifest.rs)) — `PoolsManifestFile`, `PoolManifestEntry`, `PoolType`, `PoolContext`, `AutomationFlags`, `load_embedded_pools_manifest`, `load_pools_manifest_with_override`, `build_pool_contexts_from_manifest`, `validate_and_build_pool_context`, `resolve_lp_staking_pool`.
- **Pubkey constants** — `ADRENA_PROGRAM_ID`, `CORTEX_ID`, `MAIN_POOL_ID`, `GENESIS_LOCK_ID`, `USDC_MINT`, `WBTC_MINT`, `BONK_MINT`, `JITO_MINT`, `SOL_MINT`, `ADX_MINT`, `ALP_MINT`, SPL token / associated-token / governance program IDs, `ADRENA_GOVERNANCE_REALM_ID`, `ADRENA_GOVERNANCE_REALM_CONFIG_ID`, `ADRENA_GOVERNANCE_SHADOW_TOKEN_MINT`. The `main_pool` submodule exposes the four live custody pubkeys as static constants for grep-friendly call sites.
- **`BorshDeserialize` re-export** — `pub use anchor_lang::prelude::borsh::BorshDeserialize`. Consumers must use this re-export rather than adding a direct `borsh = "1.x"` dep, otherwise `#[event]` macros expand against a different trait version and `try_from_slice` fails with a cryptic "associated item not found".

---

## TypeScript public surface (`@adrena/abi`)

`package.json` declares the following exports map. Consumers must use these
explicit subpaths (no deep imports):

```jsonc
"exports": {
  "./idl/adrena.json":                                  "./idl/adrena.json",
  "./idl/adrena":                                       { "types": "./idl/adrena.d.ts" },
  "./idl/adrena.ts":                                    "./idl/adrena.ts",
  "./configs/artifact_manifest.json":                   "./configs/artifact_manifest.json",
  "./configs/pools_manifest.json":                      "./configs/pools_manifest.json",
  "./configs/pools_manifest_loader":                    "./configs/pools_manifest_loader.ts",
  "./configs/pools_manifest_loader.ts":                 "./configs/pools_manifest_loader.ts",
  "./configs/oracles/chaoslabs.mainnet.json":           "./configs/oracles/chaoslabs.mainnet.json",
  "./configs/oracles/chaoslabs.devnet.json":            "./configs/oracles/chaoslabs.devnet.json",
  "./configs/oracles/autonom.mainnet.json":             "./configs/oracles/autonom.mainnet.json",
  "./configs/oracles/autonom.devnet.json":              "./configs/oracles/autonom.devnet.json",
  "./configs/oracles/switchboard.mainnet.json":         "./configs/oracles/switchboard.mainnet.json",
  "./configs/oracles/switchboard.devnet.json":          "./configs/oracles/switchboard.devnet.json",
  "./configs/oracles/switchboard_other.mainnet.json":   "./configs/oracles/switchboard_other.mainnet.json",
  "./configs/oracles/switchboard_other.devnet.json":    "./configs/oracles/switchboard_other.devnet.json",
  "./configs/oracles/feed_metadata.json":               "./configs/oracles/feed_metadata.json"
}
```

The `idl/adrena.d.ts` carries the **full preserved** Anchor type body (the
same shape as `idl/adrena.ts`), not a generic `Idl` alias. Consumers like
adrena-data rely on `Program<Adrena>` and `IdlAccounts<Adrena>` for real
type inference; collapsing to a generic alias would silently weaken that.

There is **no `prepare` or build script**. `github:` installs work directly:
the package contains only static JSON + TS files. Adding a build step would
break consumer installs from forked or unpublished commits.

The IDL is Anchor 0.31 format and carries the program address at the top
level (`"address": "13gDzE…wet"`), so `new Program<Adrena>(IDL, provider)`
no longer needs an explicit `programId` argument.

---

## Artifact manifest

`configs/artifact_manifest.json` is the canonical fingerprint of an
adrena-abi commit. Every consumer should log its contents at startup so
running services can be cross-checked for drift.

```jsonc
{
  "schema_version": 1,
  "adrena_program_id": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet",
  "adrena_program_version": "2.1.0",
  "adrena_release": "release/39-postaudit",
  "adrena_source_commit": "<full 40-char HEAD of adrena/release branch at PR-write time>",
  "idl_sha256": "<sha256 of idl/adrena.json>",
  "feed_maps": {
    "chaoslabs.mainnet":         "<sha256>",
    "autonom.mainnet":           "<sha256>",
    "switchboard.mainnet":       "<sha256>",
    "switchboard.devnet":        "<sha256>",
    "switchboard_other.mainnet": "<sha256>",
    "switchboard_other.devnet":  "<sha256>",
    "feed_metadata":             "<sha256>",
    "pools_manifest":            "<sha256>"
  }
}
```

Hashes are verified by [`tests/artifact_hashes.rs`](tests/artifact_hashes.rs)
— if anyone edits a feed map, the IDL, or the pools manifest without
regenerating this file, the build goes red. Consumers should compute the
same sha256s at startup and compare.

---

## Verification tests (`cargo test`)

Seven test files gate every commit. Total count: **89 tests** (12 unit + 77
integration).

| Test file | Count | What it proves |
|---|---:|---|
| `feed_ids` (unit, in `src/feed_ids.rs`)            | 5 | `pub const` ranges stay in sync with `OracleProvider::feed_id_range`; USDC constants sit at `range_start + USDC_OFFSET`. |
| Other inline unit tests across `src/`              | 7 | Misc invariants on `OraclePrice`, `LimitedString`, etc. |
| [`tests/artifact_hashes.rs`](tests/artifact_hashes.rs)                       | 1  | Every embedded JSON's sha256 matches `artifact_manifest.json`. |
| [`tests/feed_metadata_consistency.rs`](tests/feed_metadata_consistency.rs)   | 5  | Provider/range/symbol cross-checks; stablecoin set matches `{CHAOSLABS,AUTONOM,SWITCHBOARD}_USDC`; the 6-asset crypto block is identical at offset `+0..+5` of all three providers. |
| [`tests/pools_manifest_consistency.rs`](tests/pools_manifest_consistency.rs) | 6  | Autonom-pool `feedIds` lie in the Autonom range; every feed_id has a registered symbol; sessioned-vs-symbol agreement; pool names unique. |
| [`tests/oracle_invariants.rs`](tests/oracle_invariants.rs)                   | 32 | Wire constants pinned (decimals, BPS, staleness, max-prices); provider routing is exhaustive over `u8`; `OraclePrice` low/high band math; provider feed-id round-trip. |
| [`tests/wire_format_invariants.rs`](tests/wire_format_invariants.rs)         | 15 | Golden hash for `BatchPrices::build_message_hash` and `AutonomMarketOpeningData::build_message_hash` (drift = on-chain verifier rejects every signed batch); `LimitedString` byte layout pinned. |
| [`tests/pinned_addresses.rs`](tests/pinned_addresses.rs)                     | 15 | Adrena program ID, well-known program IDs, mints, and every PDA derivation match canonical mainnet pubkeys; pool custodies / synthetic custodies / LP mint match on-chain truth. |
| [`tests/no_dummy_in_production.rs`](tests/no_dummy_in_production.rs)         | 3  | Mainnet feed maps contain zero `_DUMMY: true` entries; devnet allowlist explicit. |

Run them all:

```bash
cargo build
cargo test
```

Expected: 89 tests, all green.

---

## Bumping for a new Adrena release

When the Adrena program ships a new release, do this in order. Each step is
local-edit only until step 6.

### 1. Snapshot the new IDL

```bash
cd <adrena-program>
git checkout release/<NN>-postaudit
anchor build           # regenerates target/idl/adrena.json
```

Then in `adrena-abi`:

```bash
cp <adrena>/target/idl/adrena.json   adrena-abi/idl/adrena.json
# Regenerate the .ts type-only file too. Then copy it into adrena.d.ts so
# the type body stays full and preserved (do NOT collapse to a generic Idl alias).
cp <adrena>/target/types/adrena.ts   adrena-abi/idl/adrena.ts
cp adrena-abi/idl/adrena.ts          adrena-abi/idl/adrena.d.ts
```

### 2. Update feed maps if the canonical layout changed

If new feeds got added (e.g. a future commodity at slot 39, the first free
Autonom slot after WTI=38), add the entries to:

- `configs/oracles/chaoslabs.mainnet.json` (if ChaosLabs has the feed)
- `configs/oracles/autonom.mainnet.json` (if Autonom has the feed)
- `configs/oracles/switchboard.mainnet.json` + `.devnet.json` (if Switchboard has the feed)
- `configs/oracles/feed_metadata.json` — add the symbol to `sessioned` with the right boolean

If the change touches a USDC slot or another stablecoin, also update:

- `src/feed_ids.rs` `CHAOSLABS_USDC` / `AUTONOM_USDC` / `SWITCHBOARD_USDC`
- `feed_metadata.json` `stablecoin_feed_ids` array
- **Coordinate with adrena program**: `get_confidence_from_price` in
  `adrena/programs/adrena/src/state/oracle.rs` and the mirror in
  `adrena-abi/src/oracle.rs` hardcode the USDC slots. Both must change
  in the same PR; the on-chain change requires an audit pass.

### 3. Update the pools manifest if a pool changed

If a new pool was deployed, or custodies were added/removed, edit
`configs/pools_manifest.json`. After the on-chain bootstrap proposals land,
read the live `Pool` account back from chain and pin the actual custody and
synthetic-custody pubkeys (in **on-chain order** — slot order matters for
synthetic custodies because the Rust loader does `Vec<Pubkey>` equality).

### 4. Regenerate the artifact manifest

```bash
cd adrena-abi

# Compute fresh hashes
sha256sum idl/adrena.json
sha256sum configs/oracles/chaoslabs.mainnet.json
sha256sum configs/oracles/autonom.mainnet.json
sha256sum configs/oracles/switchboard.mainnet.json
sha256sum configs/oracles/switchboard.devnet.json
sha256sum configs/oracles/switchboard_other.mainnet.json
sha256sum configs/oracles/switchboard_other.devnet.json
sha256sum configs/oracles/feed_metadata.json
sha256sum configs/pools_manifest.json

# Get the adrena source commit
( cd <adrena-program> && git rev-parse HEAD )
```

Edit `configs/artifact_manifest.json` to:

- Set `adrena_release` to the new release tag
- Set `adrena_program_version` to the crate version in `<adrena>/programs/adrena/Cargo.toml`
- Set `adrena_source_commit` to the full 40-character `git rev-parse HEAD` from above
- Set `idl_sha256` to the freshly computed hash
- Update every `feed_maps.<key>` to its freshly computed hash

**Do not reuse stale hashes**, do not paste a 7-character short hash for the
adrena commit, do not skip any file. `tests/artifact_hashes.rs` will fail
otherwise.

### 5. Update package.json + Cargo.toml versions

Bump `version` in `adrena-abi/package.json` to reflect the new release. The
suggested format is `<adrena_program_version>-release<NN>`, e.g.
`"2.2.0-release40"`. Bump `version` in `Cargo.toml` per Rust crate semver
rules (independent of the npm version — see "Version numbers" below).

### 6. Run the verification tests

```bash
cargo build
cargo test
```

All 89 tests must pass. If `tests/artifact_hashes.rs` fails, you missed a
hash update in step 4. If `tests/feed_metadata_consistency.rs` or
`tests/pools_manifest_consistency.rs` fails, a symbol or feed_id is
unregistered. If `tests/no_dummy_in_production.rs` fails, the mainnet
allowlist needs updating.

### 7. Commit and push

```bash
git add idl configs src package.json Cargo.toml
git commit -m "release/<NN> canonical artifact bump"
git push
```

Capture the resulting commit hash. This is the **PR1 commit** for the new
release.

### 8. Coordinated consumer cutover

Update every consumer to the new commit hash, in separate PRs that all merge
together.

**Rust** (`Cargo.toml`):
```toml
adrena-abi = { git = "https://github.com/AdrenaFoundation/adrena-abi.git", rev = "<new-commit-hash>" }
```

**TypeScript** (`package.json`):
```json
"@adrena/abi": "github:AdrenaFoundation/adrena-abi#<new-commit-hash>"
```

For `adrena-data/processor`, freeze the prior release's IDL as a historical
entry so the slot-keyed dispatcher can still decode events from the old
release window:

```bash
mkdir adrena-data/processor/src/targetV<old-version>
cp adrena-abi-OLD-COMMIT/idl/adrena.json adrena-data/processor/src/targetV<old-version>/adrena.json
cp adrena-abi-OLD-COMMIT/idl/adrena.ts   adrena-data/processor/src/targetV<old-version>/adrena.ts
```

Then in `adrena-data/processor/src/utils.ts`:

```typescript
import { IDL as V<OLD>_IDL } from './targetV<old-version>/adrena';

export function getIdlFromSlot(slot: number) {
  if (slot >= NEW_RELEASE_BOUNDARY_SLOT) return CURRENT_IDL;        // new release onward
  if (slot >= OLD_RELEASE_BOUNDARY_SLOT) return V<OLD>_IDL;          // previous release
  // ... rest unchanged
}
```

`CURRENT_IDL` automatically points at the new release because
`@adrena/abi/idl/adrena.json` is now the new IDL. The variable name
`CURRENT_IDL` does not need to change. **Do not rename it to a version-baked
identifier** — that's exactly the pattern this repo exists to eliminate.

### 9. Run the full consumer build/test sweep

```bash
cargo test  -p MrOracle
cargo test  -p MrSablier
cargo test  -p MrSablierStaking
cargo test  -p MrNotification
(cd adrena-data/cron      && npm install && npm run build)
(cd adrena-data/api       && npm install && npm run build)
(cd adrena-data/processor && npm install && npm run build)
(cd adrena-data/enricher  && npm install && npm run build)
(cd MrAutonom             && npm install && npm run build)
(cd discord-bot           && npm install && npm run build)
(cd frontend              && npm install && npm run build)
```

Everything must be green before the consumer PRs merge.

### 10. Smoke deploy

Boot every service in dry-run mode against the new pinned commit. Each
service should print the same `adrena-abi artifact` startup block, with
matching `idl_sha256` and per-map sha256s. If any service prints a different
sha for the same file, the pin or the override is wrong.

---

## Switchboard dummy slots

Mainnet feed maps must not contain `_DUMMY: true` entries —
[`tests/no_dummy_in_production.rs`](tests/no_dummy_in_production.rs) asserts
the mainnet allowlist is empty. Dummy slots exist on **devnet only** for
forward-compatibility while feeds are being commissioned.

Currently devnet allows `[143, 144]` to carry the placeholder hashes
`deadbeef…` (jitoSOL) and `cafebabe…` (BTC) until real Switchboard devnet
feeds are wired up. The allowlist lives in
`tests/no_dummy_in_production.rs::ALLOWED_DUMMY_FEED_IDS_DEVNET`.

### Behaviour at runtime

- **Embedded loaders** in consumers skip any `_DUMMY: true` slot with a
  per-slot warning in the boot log. The service runs normally with the
  surviving feeds.
- **Override loaders** (CLI flag / env-var paths) hard-error on any
  `_DUMMY: true` entry. Operator-supplied override files are expected to
  contain real production hashes.

### Activating a slot that's currently dummy on devnet

When real Switchboard devnet hashes become available:

1. Edit `configs/oracles/switchboard.devnet.json`: replace the `deadbeef…` /
   `cafebabe…` hash with the real hash, drop the `_DUMMY` field.
2. Update `tests/no_dummy_in_production.rs` `ALLOWED_DUMMY_FEED_IDS_DEVNET`
   to remove the slot you just activated.
3. Recompute hashes and update `configs/artifact_manifest.json`.
4. Run `cargo test` to verify.
5. Coordinated consumer pin bump like a normal release.

---

## Cross-repo sync: autonom backend feed_id_aliases

The Autonom backend has its own `feed_id_aliases.json` mapping
`adrena_feed_id → autonom_feed_id`. **It must stay in sync with
`configs/oracles/autonom.mainnet.json` in this repo.** The Autonom backend
resolves adrena's `?feed_ids=30,31,...` request via that alias map; if the
two drift, Autonom will sign batches for the wrong products and adrena-data
will silently insert wrong prices.

There is no automated check today. The recommended workflow:

1. Any time you edit `configs/oracles/autonom.mainnet.json`, also push the
   matching change to the Autonom backend's `feed_id_aliases.json`.
2. Coordinate with the Autonom backend deploy in the same release window as
   the adrena-data consumer bump.
3. Treat the two files as a single artifact with two storage locations.

---

## Override paths and runtime logging

Every consumer that loads an artifact from this repo should accept a runtime
override and log the override path **plus the sha256** of the override file
contents at startup. This is so operators can spot drift between what the
consumer is actually running vs the pinned artifact. Common override knobs:

- MrOracle: `--switchboard-feed-map-path <path>`, `--cluster mainnet|devnet`
- MrAutonom: `--idl-path <path>`, `--manifest-path <path>`
- adrena-data/cron: `AUTONOM_FEED_MAP_PATH`, `SWITCHBOARD_FEED_MAP_PATH`,
  `SWITCHBOARD_CLUSTER` env vars
- Every consumer: `--manifest-path <path>` for the pools manifest

Don't suppress override-vs-pinned drift logs.

---

## Version numbers

Versions diverge intentionally between the npm package and the Rust crate:

- **npm `package.json` version** tracks the program release suffix
  (`<adrena_program_version>-release<NN>`, e.g. `2.1.0-release39`).
- **Cargo `Cargo.toml` version** follows Rust crate semver independently.

Don't try to sync them. The variable-naming rule above forbids version-baked
identifiers in code regardless of which version label is bumped.

All consumers pin via **git commit hash**, not via semver. Bumping the
`package.json` version without pushing a new commit does nothing.

---

## Build

```bash
cargo build
cargo test
```

That's the whole build for this repo. There is no anchor build step (the IDL
is generated upstream in the adrena program), no codegen, no protoc, no
prepare script.

---

## License

Apache-2.0 — same as the adrena program.
