# adrena-abi

Canonical, version-pinned source of truth for everything offchain Adrena
services need to talk to the on-chain program:

- The Adrena IDL (Anchor 0.30+ format)
- Oracle feed maps for ChaosLabs, Autonom, Switchboard (mainnet + devnet)
- Cross-provider feed metadata (provider ranges, sessioned flags, stablecoin slots)
- The canonical pool manifest + loader (pool names, feed IDs, automation flags)
  shared by every offchain service (MrSablier, MrSablierStaking, MrAutonom,
  adrena-data/*)
- A signed artifact manifest with sha256 hashes of every shipped file
- Rust constants and `include_str!`'d JSON for native consumers
- An npm package (`@adrena/abi`) that ships the same artifacts to TS consumers

Both Rust services and TypeScript services pin the **same git commit** of this
repo. There is no version drift between consumers, no service-local IDL copies,
and no service-local feed maps. Bumping the canonical artifact is a one-place
change here followed by a coordinated commit hash bump across consumers.

---

## Repository layout

```
adrena-abi/
├── Cargo.toml                          # Rust crate manifest
├── package.json                        # npm package manifest (@adrena/abi)
├── README.md                           # this file
├── idl/
│   ├── adrena.json                     # canonical IDL (runtime data)
│   ├── adrena.d.ts                     # full preserved Adrena type for TS inference
│   └── adrena.ts                       # legacy const-style export (deprecated, kept for transition)
├── configs/
│   ├── artifact_manifest.json          # signed manifest with sha256s of every shipped file
│   ├── pools_manifest.json             # canonical pool manifest (names, feedIds, automation flags)
│   ├── pools_manifest_loader.ts        # typed TS loader (types + validation + PDA derivation helpers)
│   └── oracles/
│       ├── chaoslabs.mainnet.json      # ChaosLabs feed map (slots 0..29)
│       ├── autonom.mainnet.json        # Autonom feed map (slots 30..141)
│       ├── switchboard.mainnet.json    # Switchboard feed map (slots 142..255)
│       ├── switchboard.devnet.json     # Switchboard feed map for devnet
│       └── feed_metadata.json          # Cross-provider metadata: ranges, stables, sessioned[symbol]
├── src/
│   ├── lib.rs                          # crate entrypoint, public re-exports
│   ├── feed_maps.rs                    # `include_str!` of every config JSON
│   ├── feed_ids.rs                     # Rust pub const ranges + USDC slots + crypto block
│   ├── oracle.rs                       # OracleProvider, BatchPrices, ranges, get_confidence_from_price
│   ├── pda.rs                          # PDA helpers (cortex, pool, custody, position, etc.)
│   ├── types.rs                        # Anchor instruction params + state account structs
│   ├── math.rs                         # Fixed-point math helpers
│   ├── limited_string.rs               # Bounded string type
│   ├── liquidation_price.rs            # Liquidation price logic
│   └── autonom_market_opening_data.rs  # Signed market hours payload
└── tests/
    ├── artifact_hashes.rs              # sha256-verifies every embedded file vs manifest
    ├── feed_metadata_consistency.rs    # cross-references provider maps vs metadata
    └── no_dummy_in_production.rs       # locks the dummy-slot allowlist (currently [143, 144])
```

---

## Canonical feed-id layout (release/39)

Each provider's range starts with the same 6-asset crypto block at offset
`+0..+5` (SOL, jitoSOL, BTC, WBTC, BONK, USDC). Provider ranges are
hard-enforced on-chain by `OracleProvider::feed_id_range` in `src/oracle.rs`.

| Slot offset | Asset | ChaosLabs (`0..=29`) | Autonom (`30..=141`) | Switchboard (`142..=255`) |
|---|---|---|---|---|
| +0 | SOLUSD     | 0 | 30 | 142 |
| +1 | JITOSOLUSD | 1 | 31 | 143 (dummy hash, see below) |
| +2 | BTCUSD     | 2 | 32 | 144 (dummy hash, see below) |
| +3 | WBTCUSD    | 3 | 33 | 145 |
| +4 | BONKUSD    | 4 | 34 | 146 |
| +5 | USDCUSD    | 5 | 35 | 147 |

USDC is the only feed where the on-chain code hardcodes the slot — see
`get_confidence_from_price` in `src/oracle.rs`. The hardcode reads
`feed_id == 5 || feed_id == 35 || feed_id == 147`. Any change to the canonical
USDC slot of any provider requires editing both the feed map AND those two
on-chain constants in lockstep.

After the crypto block, Autonom launches with a single commodity — XAU (Gold)
at slot 36. This is the canonical launch layout for Adrena Autonom pools.
Future commodities (Silver, Crude, Brent, etc.) append at 37+ in coordinated
releases that bump `autonom.mainnet.json`, `feed_metadata.sessioned`, the
adrena program bootstrap ix (`register_oracle_feeds_v38_to_v39`), the CLI
verify-migration expected set, and the Autonom backend's
`feed_id_aliases.json` in lockstep. MrAutonom only manages market hours for
**sessioned** symbols (XAU today); the crypto block is 24/7 and is filtered
out at boot via `feed_metadata.sessioned[symbol]`. Any new feed appended to
this map must also land in the autonom backend's `feed_id_aliases.json` in
lockstep — see the `_note` field in `autonom.mainnet.json` for the exact
mirror path.

---

## Consumers and how they import

Every offchain service pins this repo at a specific git commit. Pin updates
are coordinated across all consumers — see "Bumping for a new release" below.

### Rust consumers (Cargo `git` dep)

| Repo | Imports | Used for |
|---|---|---|
| **MrOracle** | `adrena_abi::feed_ids::{CHAOSLABS,AUTONOM,SWITCHBOARD}_RANGE`, `adrena_abi::feed_maps::{SWITCHBOARD_MAINNET_JSON, SWITCHBOARD_DEVNET_JSON}`, plus PDA helpers | Provider range validation in `src/providers/{chaoslabs,autonom,switchboard}.rs`. Embedded Switchboard feed map (default; CLI flag `--switchboard-feed-map-path` overrides). Note: MrOracle deliberately vendors its own oracle wire structs in `src/adrena_ix.rs` for release-cadence decoupling — this is documented in that file and is **not** an oversight. |
| **MrSablier** | `adrena_abi::*` types + PDA helpers | Position/order automation. Bumps in lockstep with the rest of the consumer cohort. |
| **MrSablierStaking** | `adrena_abi::*` types + PDA helpers | Staking automation. Same bump cadence as MrSablier. |

All three pin via `Cargo.toml`:
```toml
adrena-abi = { git = "https://github.com/AdrenaFoundation/adrena-abi.git", rev = "<commit-hash>" }
```

### TypeScript consumers (npm `github:` dep)

| Repo | Imports | Used for |
|---|---|---|
| **adrena-data/cron** | `@adrena/abi/idl/adrena.json`, `@adrena/abi/idl/adrena` (type), `@adrena/abi/configs/oracles/autonom.mainnet.json`, `@adrena/abi/configs/oracles/switchboard.mainnet.json`, `@adrena/abi/configs/oracles/switchboard.devnet.json`, `@adrena/abi/configs/oracles/feed_metadata.json` | IDL for AdrenaClient + types.d.ts. Embedded autonom + switchboard feed maps in `process/processAutonomAssetsPrice.ts` and `process/processSwitchboardInstructions.ts`. Provider range constants come from `feed_metadata.providers.<provider>.range` so the hardcoded TS constants stay in sync with the central source. |
| **adrena-data/api** | `@adrena/abi/idl/adrena.json`, `@adrena/abi/idl/adrena` (type) | IDL for AdrenaClient + initializeApp + helpers + types.d.ts. |
| **adrena-data/processor** | `@adrena/abi/idl/adrena.json` | The "current" IDL via `CURRENT_IDL` in `src/utils.ts`. Historical IDLs (release/37 and earlier) are kept locally under `src/targetV1-*/` because each is an immutable frozen snapshot needed for slot-keyed event decoding. The current IDL is the only one that bumps with this repo. |
| **MrAutonom** | `@adrena/abi/idl/adrena.json`, `@adrena/abi/configs/oracles/autonom.mainnet.json`, `@adrena/abi/configs/oracles/feed_metadata.json`, `@adrena/abi/configs/artifact_manifest.json` | IDL for the Anchor Program object. Autonom feed map for `feed_id → symbol` lookup. `feed_metadata.sessioned[symbol]` for the data-driven non-crypto filter (replaces the old hardcoded crypto slot range). Artifact manifest for the startup log block. |

All four pin via `package.json`:
```json
"dependencies": {
  "@adrena/abi": "github:AdrenaFoundation/adrena-abi#<commit-hash>"
}
```

### Out of scope (not yet migrated)

- `frontend/src/target/adrena.{json,ts}`
- `discord-bot/idl/adrena.json` + `discord-bot/src/adrena.ts`
- `governance-ui/idls/adrena.{json,ts}`

These have their own IDL copies. They can adopt `@adrena/abi` on their own
schedule. There is no breaking dependency on them migrating.

---

## Variable naming rule

**Variable names referencing "the current IDL" or "the current feed map" MUST
NOT bake in a release version number.** Use neutral names like `CURRENT_IDL`,
`AdrenaIdl`, `CURRENT_IDL_JSON`. The bad pattern is something like
`V2_1_0_IDL_JSON` — that name forces a sweep + rename every time the program
ships a new release, which is exactly the kind of mechanical churn this repo
exists to eliminate.

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

`src/lib.rs` re-exports:

- **Oracle types** (`oracle::*`): `BatchPrices`, `BatchPricesWithProvider`, `MultiBatchPrices`, `OraclePrice`, `PriceData`, `SwitchboardUpdateParams`, `OracleProvider`, `Oracle`, `get_confidence_from_price`
- **State accounts**: `Cortex`, `Pool`, `Custody` (via `types::*`)
- **Instruction params** (`types::*`): every `<Action>Params` struct used by Anchor methods
- **PDA helpers** (`pda::*`): `get_cortex_pda`, `get_pool_pda`, `get_oracle_pda`, `get_custody_pda`, `get_position_pda`, `get_staking_pda`, `get_user_staking_pda`, governance helpers
- **Feed maps** (`feed_maps::*`): `include_str!`'d constants for every JSON file under `configs/oracles/` plus `ARTIFACT_MANIFEST_JSON`
- **Feed-id constants** (`feed_ids::*`): `CHAOSLABS_RANGE`, `AUTONOM_RANGE`, `SWITCHBOARD_RANGE`, `CHAOSLABS_USDC`, `AUTONOM_USDC`, `SWITCHBOARD_USDC`, `AUTONOM_CRYPTO_FEED_IDS`, `USDC_OFFSET`
- **Constants**: `ADRENA_PROGRAM_ID` / `CORTEX_ID` / `USDC_MINT` / `BTC_MINT` / `BONK_MINT` / `JITO_MINT` / `ADX_MINT` / `ALP_MINT` / `MAIN_POOL_ID` / SPL + governance program IDs

The `feed_ids::*` `pub const`s are mirrored from `OracleProvider::feed_id_range`
in `oracle.rs`. A unit test asserts the two stay in sync; if they drift the
build is red.

---

## TypeScript public surface (`@adrena/abi`)

`package.json` declares the following exports map. Consumers must use these
explicit subpaths (no deep imports):

```jsonc
"exports": {
  "./idl/adrena.json":                          "./idl/adrena.json",
  "./idl/adrena":                               { "types": "./idl/adrena.d.ts" },
  "./idl/adrena.ts":                            "./idl/adrena.ts",
  "./configs/artifact_manifest.json":           "./configs/artifact_manifest.json",
  "./configs/oracles/chaoslabs.mainnet.json":   "./configs/oracles/chaoslabs.mainnet.json",
  "./configs/oracles/autonom.mainnet.json":     "./configs/oracles/autonom.mainnet.json",
  "./configs/oracles/switchboard.mainnet.json": "./configs/oracles/switchboard.mainnet.json",
  "./configs/oracles/switchboard.devnet.json":  "./configs/oracles/switchboard.devnet.json",
  "./configs/oracles/feed_metadata.json":       "./configs/oracles/feed_metadata.json"
}
```

The `idl/adrena.d.ts` carries the **full preserved** Anchor type body (the
same shape as the existing `idl/adrena.ts`), not a generic `Idl` alias.
Consumers like `adrena-data` rely on `Program031<Adrena>` and `IdlAccounts<Adrena>`
for real type inference; a tiny generic alias would silently weaken that.

There is **no `prepare` or build script**. `github:` installs work directly:
the package contains only static JSON + TS files. Adding a build step would
break consumer installs from forked or unpublished commits.

---

## Artifact manifest

`configs/artifact_manifest.json` is the canonical fingerprint of an
adrena-abi commit. Every consumer should log its contents at startup so
running services can be cross-checked for drift in kibana/grafana.

```jsonc
{
  "schema_version": 1,
  "adrena_program_id": "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet",
  "adrena_program_version": "2.1.0",
  "adrena_release": "release/39-postaudit",
  "adrena_source_commit": "<full 40-char HEAD of adrena/release branch at PR-write time>",
  "idl_sha256": "<sha256 of idl/adrena.json>",
  "feed_maps": {
    "chaoslabs.mainnet":   "<sha256>",
    "autonom.mainnet":     "<sha256>",
    "switchboard.mainnet": "<sha256>",
    "switchboard.devnet":  "<sha256>",
    "feed_metadata":       "<sha256>"
  }
}
```

All hashes are verified by `cargo test --test artifact_hashes` — if anyone
edits a feed map or the IDL without regenerating the manifest, the build
goes red. Consumers should compute the same sha256s at startup and compare.

---

## Verification tests (`cargo test`)

Four tests gate every commit:

| Test | What it proves |
|---|---|
| `feed_ids::tests::ranges_match_oracle_provider_enum` | The `pub const` ranges in `feed_ids.rs` stay in sync with `OracleProvider::feed_id_range()` in `oracle.rs`. |
| `feed_ids::tests::usdc_constants_*` | `CHAOSLABS_USDC` / `AUTONOM_USDC` / `SWITCHBOARD_USDC` are `(provider_range_start + USDC_OFFSET)` and fall within their provider's range. |
| `tests/artifact_hashes.rs` | Every embedded JSON file's sha256 matches its entry in `artifact_manifest.json`. |
| `tests/feed_metadata_consistency.rs` | Every `symbol` referenced in any per-provider feed map has a corresponding `sessioned` entry in `feed_metadata.json`. Every `adrena_feed_id` falls inside its provider's declared range. The 6-asset crypto block has the same symbol at offset `+0..+5` of all three providers. `feed_metadata.stablecoin_feed_ids` matches `{CHAOSLABS_USDC, AUTONOM_USDC, SWITCHBOARD_USDC}`. |
| `tests/no_dummy_in_production.rs` | Only `[143, 144]` are marked `_DUMMY: true` in `switchboard.mainnet.json` and `switchboard.devnet.json`. The placeholder hashes are the recognized `deadbeef.../cafebabe...` strings. Any new dummy slot or any real-hash replacement requires updating `ALLOWED_DUMMY_FEED_IDS` in this test file in the same PR. |

Run them all:

```bash
cargo build -p adrena-abi
cargo test  -p adrena-abi
```

Expected: 5 unit tests + 1 + 3 + 3 = 12 tests, all green.

---

## Bumping for a new Adrena release

When the Adrena program ships a new release (e.g. release/40), do this in
order. Each step is local-edit only until step 6.

### 1. Snapshot the new IDL

```bash
cd <adrena-program>
git checkout release/40-postaudit
anchor build           # regenerates target/idl/adrena.json
```

Then in `adrena-abi`:

```bash
cp <adrena>/target/idl/adrena.json adrena-abi/idl/adrena.json
# Regenerate the .ts type-only file too if the upstream still ships it.
# Then copy it into adrena.d.ts so the type body stays full and preserved
# (do NOT collapse to a generic Idl alias — see the L2 fix in the migration plan).
cp <adrena>/target/types/adrena.ts adrena-abi/idl/adrena.ts
cp adrena-abi/idl/adrena.ts        adrena-abi/idl/adrena.d.ts
```

### 2. Update feed maps if the canonical layout changed

If new feeds got added (e.g. a future release appends a new commodity at slot
37 — the first free Autonom slot after the launch commodity XAU at 36),
add the entries to:

- `configs/oracles/chaoslabs.mainnet.json` (if ChaosLabs has the feed)
- `configs/oracles/autonom.mainnet.json` (if Autonom has the feed)
- `configs/oracles/switchboard.mainnet.json` + `.devnet.json` (if Switchboard has the feed)
- `configs/oracles/feed_metadata.json` — add the symbol to `sessioned` with the right bool

If the change touches a USDC slot or another stablecoin, also update:

- `src/feed_ids.rs` `CHAOSLABS_USDC` / `AUTONOM_USDC` / `SWITCHBOARD_USDC` constants
- `feed_metadata.json` `stablecoin_feed_ids` array
- **Coordinate with adrena program**: `get_confidence_from_price` in
  `adrena/programs/adrena/src/state/oracle.rs` and the mirror in
  `adrena-abi/src/oracle.rs` hardcode the USDC slot. Both must change in the
  same PR; the on-chain change requires an audit pass.

### 3. Regenerate the artifact manifest

```bash
cd adrena-abi

# Compute fresh hashes
sha256sum idl/adrena.json
sha256sum configs/oracles/chaoslabs.mainnet.json
sha256sum configs/oracles/autonom.mainnet.json
sha256sum configs/oracles/switchboard.mainnet.json
sha256sum configs/oracles/switchboard.devnet.json
sha256sum configs/oracles/feed_metadata.json

# Get the adrena source commit
( cd <adrena-program> && git rev-parse HEAD )
```

Edit `configs/artifact_manifest.json` to:

- Set `adrena_release` to the new release tag (e.g. `"release/40-postaudit"`)
- Set `adrena_program_version` to the crate version in `<adrena>/programs/adrena/Cargo.toml`
- Set `adrena_source_commit` to the full 40-character `git rev-parse HEAD` from above
- Set `idl_sha256` to the freshly computed hash
- Update every `feed_maps.<key>` to its freshly computed hash

**Do not reuse stale hashes**, do not paste a 7-character short hash for the
adrena commit, do not skip any file. The `tests/artifact_hashes.rs` test will
fail if any of these is wrong.

### 4. Update package.json version

Bump `version` in `adrena-abi/package.json` to reflect the new release. The
suggested format is `<adrena_program_version>-release<NN>`, e.g.
`"2.2.0-release40"`. This is the npm package version (semver-shaped), not a
variable name — version-naming the package is correct, version-naming source
identifiers is what we avoid.

### 5. Run the verification tests

```bash
cargo build -p adrena-abi
cargo test  -p adrena-abi
```

All 12 tests must pass. If `tests/artifact_hashes.rs` fails, you missed a
hash update in step 3. If `tests/feed_metadata_consistency.rs` fails, a
symbol is missing from `feed_metadata.sessioned`. If
`tests/no_dummy_in_production.rs` fails, the dummy allowlist needs updating
(see "Switchboard dummy slots" below).

### 6. Commit and push

```bash
git add idl configs src package.json
git commit -m "release/40 canonical artifact bump"
git push
```

Capture the resulting commit hash. This is the **PR1 commit** for the new
release.

### 7. Coordinated consumer cutover

Update every consumer to the new commit hash, in separate PRs that all merge
together. The bump line is identical across consumers:

**Rust** (`Cargo.toml` in MrOracle, MrSablier, MrSablierStaking):
```toml
adrena-abi = { git = "https://github.com/AdrenaFoundation/adrena-abi.git", rev = "<new-commit-hash>" } # release/40 canonical artifact
```

**TypeScript** (`package.json` in adrena-data/cron, adrena-data/api, adrena-data/processor, MrAutonom):
```json
"@adrena/abi": "github:AdrenaFoundation/adrena-abi#<new-commit-hash>"
```

Then for adrena-data/processor specifically, **freeze the prior release's IDL
as a historical entry** so the slot-keyed dispatcher in `src/utils.ts` can still
decode events from the old release window:

```bash
mkdir adrena-data/processor/src/targetV2-1-0
cp adrena-abi-OLD-COMMIT/idl/adrena.json adrena-data/processor/src/targetV2-1-0/adrena.json
cp adrena-abi-OLD-COMMIT/idl/adrena.ts   adrena-data/processor/src/targetV2-1-0/adrena.ts
```

Then in `adrena-data/processor/src/utils.ts`:

```typescript
import { IDL as V2_1_0_IDL } from './targetV2-1-0/adrena';
```

And add a new branch to `getIdlFromSlot`:

```typescript
export function getIdlFromSlot(slot: number) {
  if (slot >= NEW_RELEASE_BOUNDARY_SLOT) return CURRENT_IDL;     // release/40 onward
  if (slot >= 412_725_336)                return V2_1_0_IDL;     // release/39 era
  if (slot >= 357127123)                  return V1_3_8_IDL;
  // ... rest unchanged
}
```

`CURRENT_IDL` automatically points at the new release because
`@adrena/abi/idl/adrena.json` is now the release/40 IDL. The variable name
`CURRENT_IDL` does not need to change. **Do not rename it to `V2_2_0_IDL` or
similar** — that's exactly the version-baked pattern this repo exists to
eliminate.

### 8. Run the full consumer build/test sweep

```bash
cargo test  -p MrOracle
cargo test  -p MrSablier
cargo test  -p MrSablierStaking
(cd adrena-data/cron      && npm install && npm run build)
(cd adrena-data/api       && npm install && npm run build)
(cd adrena-data/processor && npm install && npm run build)
(cd MrAutonom             && npm install && npm run build)
```

Everything must be green before the consumer PRs merge.

### 9. Smoke deploy

Boot every service in dry-run mode against the new pinned commit. Each service
should print the same `adrena-abi artifact` startup block, with matching
`idl_sha256` and per-map sha256s. If any service prints a different sha for
the same file, the pin or the override is wrong.

---

## Switchboard dummy slots

`configs/oracles/switchboard.mainnet.json` and `switchboard.devnet.json`
currently mark slots `143` (jitoSOL) and `144` (BTC) with `"_DUMMY": true` and
placeholder hashes (`deadbeef...` and `cafebabe...` respectively). This is
because Switchboard mainnet does not yet have feeds for those two assets at
the time of writing; the canonical layout slot is reserved so that on-chain
hardcodes (`feed_id == 147` for USDC) line up correctly.

### Behavior at runtime

- **MrOracle embedded loader** (`load_switchboard_feed_map_embedded`) **skips
  any `_DUMMY: true` slot with a per-slot warning** in the boot log. The
  service runs normally with the surviving feeds.
- **MrOracle override loader** (`load_switchboard_feed_map`, used when
  `--switchboard-feed-map-path` is set) **hard-errors on any `_DUMMY: true`
  entry**. Operator-supplied override files are expected to contain real
  production hashes; if they don't, refuse to boot.
- **adrena-data/cron `processSwitchboardInstructions.ts`** has identical
  behavior on the npm side.

### Activating a slot that's currently dummy

When real Switchboard mainnet hashes are available for jitoSOL or BTC:

1. Edit `configs/oracles/switchboard.mainnet.json`: replace the `deadbeef.../cafebabe...`
   hash with the real hash from the Switchboard explorer, drop the `_DUMMY` field.
2. Do the same in `configs/oracles/switchboard.devnet.json` if devnet feeds exist.
3. Update `tests/no_dummy_in_production.rs` `ALLOWED_DUMMY_FEED_IDS` to remove
   the slot you just activated. The test fails if you forget this step.
4. Recompute hashes and update `configs/artifact_manifest.json` (see "Bumping for
   a new Adrena release" step 3).
5. Run `cargo test -p adrena-abi` to verify.
6. Coordinated consumer pin bump like a normal release.

---

## Cross-repo sync: autonom backend feed_id_aliases

The autonom backend (separate repo at `https://github.com/.../autonom`) has
its own `src/operator/web2/products/config/feed_id_aliases.json`. **It must
stay in sync with `configs/oracles/autonom.mainnet.json` in this repo.** The
autonom backend resolves adrena's `?feed_ids=30,31,...` request via that
alias map; if the two drift, autonom will sign batches for the wrong products
and adrena-data will silently insert wrong prices.

There is no automated check today. The recommended workflow:

1. Any time you edit `configs/oracles/autonom.mainnet.json`, also push the
   matching change to the autonom backend's `feed_id_aliases.json`.
2. Coordinate with the autonom backend deploy in the same release window as
   the adrena-data consumer bump.
3. Treat the two files as a single artifact with two storage locations.

A planned follow-up adds a CI check that clones the autonom repo and runs a
diff. Until then, treat this as a manual runbook step that must not be
skipped.

---

## Override paths and runtime logging

Every consumer that loads an artifact from this repo also accepts a runtime
override:

- MrOracle: `--switchboard-feed-map-path <path>`
- MrAutonom: `--idl-path <path>` (overrides the embedded IDL only)
- adrena-data/cron: `AUTONOM_FEED_MAP_PATH` env, `SWITCHBOARD_FEED_MAP_PATH` env
- adrena-data/cron: `SWITCHBOARD_CLUSTER=mainnet|devnet` env (selects between
  embedded mainnet/devnet maps)
- MrOracle: `--cluster mainnet|devnet` flag (same purpose)

Override mode logs the override path **and** the sha256 of the override file
contents loudly at startup. This is so kibana can spot drift between what the
consumer is actually running vs the pinned artifact. Don't suppress these
logs.

---

## Build

```bash
cargo build -p adrena-abi
cargo test  -p adrena-abi
```

That's the whole build for this repo. There is no anchor build step (the IDL
is generated upstream in the adrena program), no codegen, no protoc, no
prepare script.

---

## License

Apache-2.0 — same as the adrena program.
