# Release/39 — Offchain Centralization Migration Manifest

This is the one-shot deploy manifest for the release/39 offchain centralization
work. Read this first if you're reviewing, deploying, or rolling forward to a
new release.

For the full how-to-bump runbook (snapshotting the new IDL, computing hashes,
coordinated consumer cutover), see [`README.md`](./README.md) → "Bumping for a
new Adrena release".

---

## TL;DR

- **Canonical adrena-abi commit**: `e8cff27ca0f7a6ed2beb7dcc30dfe6822756b11b` on branch `release/39`.
- **7 consumer repos** pinned to this commit. **3 codex audit rounds** completed; final verdict was a clean go.
- **All 8 services build green**: adrena-abi, MrSablier, MrSablierStaking, MrOracle, MrAutonom, adrena-data/{cron,api,processor}.
- **Test counts**: adrena-abi 14/14, MrSablier 3/3, MrSablierStaking 3/3, MrOracle 7/7. TS consumers compile-only.
- **Result**: Single source of truth for the Adrena IDL, oracle feed maps, provider ranges, and feed metadata.

---

## What this migration does

Before this work, the monorepo had **50 IDL copies** and **7 feed map files** scattered across 9 consumer locations. Every release required a manual sweep across every service to update the IDL and the feed maps in lockstep, with no way to verify they all carried the same content. We caught two drift incidents in flight (MrOracle running a stale Switchboard map; adrena-data resolving to wrong-product autonom prices).

After this work:

- The Adrena IDL lives **only** in `adrena-abi/idl/adrena.json`. Every consumer imports from `@adrena/abi/idl/adrena.json` (TS) or pulls the crate from the same git rev (Rust).
- All 5 oracle feed maps live **only** in `adrena-abi/configs/oracles/`. Same import pattern.
- Provider ranges (`CHAOSLABS_RANGE`, `AUTONOM_RANGE`, `SWITCHBOARD_RANGE`) live **only** in `adrena-abi/src/feed_ids.rs`, with a unit test that pins them to `OracleProvider::feed_id_range` so they can't drift.
- An `artifact_manifest.json` records the sha256 of every shipped file; consumers log those hashes at startup so any drift is visible in kibana.
- An `_DUMMY: true` allowlist test (`tests/no_dummy_in_production.rs`) makes it impossible to silently activate placeholder Switchboard slots.

---

## Pinned artifact

```
adrena-abi
  branch:                  release/39
  commit:                  e8cff27ca0f7a6ed2beb7dcc30dfe6822756b11b
  adrena_program_version:  2.1.0
  adrena_release:          release/39-postaudit
  adrena_source_commit:    09ef7bcc573b5eb8f335a0891e9b2615d4e50c24
  idl_sha256:              17e7a7c6f5f6ce7409e901018ac52bf0a6254b330d38a49ba54758623d608b6a
  feed_maps:
    chaoslabs.mainnet:     1015f2e411aa04388f309e87ca7859dc01b4ade026ff3901ae55d38d8dfeb2e7
    autonom.mainnet:       e1d66999fa6210183432cae0325e41b1ef86c0be9a0d0aa0f4cc420aef0b92f9
    switchboard.mainnet:   b7483371caf8d7f455e39acf8b9cec2001c07c966fb0d5a71c4a74a3ff44c374
    switchboard.devnet:    09385e714d6125a1d3edfac6e914719d1edf13719e22823c53a9c9618415bf66
    feed_metadata:         c7a32e256122d5d6f0fa66345a109443e8603310ff698262258e51599af73013
```

Every consumer's startup log should print this same block. Drift = hash mismatch = config bug.

---

## Canonical feed-id layout (release/39)

Each provider's range starts with the same 6-asset crypto block at offset
`+0..+5`. Provider ranges are hard-enforced on-chain by
`OracleProvider::feed_id_range`.

| Slot | Asset | ChaosLabs (`0..=29`) | Autonom (`30..=141`) | Switchboard (`142..=255`) |
|---|---|---|---|---|
| +0 | SOLUSD     | 0 | 30 | 142 |
| +1 | JITOSOLUSD | 1 | 31 | 143 (DUMMY hash) |
| +2 | BTCUSD     | 2 | 32 | 144 (DUMMY hash) |
| +3 | WBTCUSD    | 3 | 33 | 145 |
| +4 | BONKUSD    | 4 | 34 | 146 |
| +5 | USDCUSD    | 5 | 35 | 147 |

Autonom continues with **equities** at 36-42 (AAPL, GOOGL, TSLA, MSFT, LMT, META, NVDA) and **commodities** at 43-46 (CHE, LH1, XAU, XAG). MrAutonom only manages market hours for sessioned symbols (equities + commodities); the crypto block is 24/7 and is filtered out at boot via `feed_metadata.sessioned[symbol]`.

The on-chain `get_confidence_from_price` hardcode reads `feed_id == 5 || feed_id == 35 || feed_id == 147` for USDC. Any change to a USDC slot requires editing both the feed map AND those two on-chain constants in the same audit-tracked PR.

---

## Per-repo file inventory

### adrena-abi (`release/39` branch, commit `e8cff27c`)

**Created:**
- `package.json` — `@adrena/abi` v2.1.0-release39, no deps, exports map for IDL + configs
- `idl/adrena.d.ts` — full preserved Anchor type body (29340 lines)
- `configs/artifact_manifest.json` — signed manifest with sha256s
- `configs/oracles/chaoslabs.mainnet.json` — 6-entry canonical
- `configs/oracles/autonom.mainnet.json` — 17-entry canonical (slots 30-46)
- `configs/oracles/switchboard.mainnet.json` — 6-entry canonical, dummies at 143/144
- `configs/oracles/switchboard.devnet.json` — 6-entry canonical, dummies at 143/144
- `configs/oracles/feed_metadata.json` — provider ranges, stablecoin slots, sessioned[symbol]
- `src/feed_maps.rs` — `include_str!` of every config JSON
- `src/feed_ids.rs` — `pub const` ranges, USDC slots, autonom crypto block, 4 unit tests
- `tests/artifact_hashes.rs` — sha256 verification
- `tests/feed_metadata_consistency.rs` — 5 cross-reference tests
- `tests/no_dummy_in_production.rs` — dummy allowlist lockdown
- `RELEASE_39_CENTRALIZATION.md` — this file
- `README.md` — full canonical doc with consumers + bumping runbook

**Modified:**
- `Cargo.toml` — added `[dev-dependencies]` for serde_json + sha2 + hex
- `src/lib.rs` — `pub mod feed_ids;` + `pub mod feed_maps;`

### adrena-data (3 sub-packages, branch `main`)

**adrena-data/cron** — biggest delta. **Modified:**
- `package.json` — added `@adrena/abi` github dep
- `AdrenaClient.ts` — IDL + Adrena type from `@adrena/abi/idl/adrena{,.json}`
- `types.d.ts` — same
- `process/processAchievements.ts` — IDL JSON import rewired
- `process/processBorrowFees.ts` — same
- `process/removeAchievements.ts` — same
- `process/processAssetsPrice.ts` — ChaosLabs ingestion now derives `ASSETS`/`ASSET_FEED_IDS`/`ALLOWED_ADRENA_FEED_IDS` from the central `chaoslabs.mainnet.json`
- `process/processAutonomAssetsPrice.ts` — embedded autonom map default + `AUTONOM_FEED_MAP_PATH` override; allow duplicate canonical ID; sha256 from `artifact_manifest.feed_maps["autonom.mainnet"]`
- `process/processSwitchboardInstructions.ts` — embedded switchboard map default + `SWITCHBOARD_CLUSTER` env (mainnet|devnet) + `SWITCHBOARD_FEED_MAP_PATH` override; dummy slots auto-skipped with per-slot warning in embedded mode, hard-error in override mode; sha256 from manifest; type guard fix on the prices `.filter()`
- `.env`, `.env-example`, `.env-should-use` — deleted stale `*_FEED_MAP_PATH` settings, added `SWITCHBOARD_CLUSTER=mainnet`, replaced with comments pointing at the embedded defaults

**Deleted:**
- `target/adrena.json`, `target/adrena.ts`
- `config/chaoslabs_feed_map.json`
- `config/autonom_feed_map.json`
- `config/switchboard_feed_map.json`
- `config/switchboard_feed_map_devnet.json`

**adrena-data/api** — **Modified:**
- `package.json` — added `@adrena/abi` github dep
- `src/adrena-client/AdrenaClient.ts` — IDL + Adrena type from `@adrena/abi`
- `src/adrena-client/types.d.ts` — Adrena type from `@adrena/abi`
- `src/adrena-client/helpers.ts` — Adrena type from `@adrena/abi`
- `src/adrena-client/config/initializeApp.ts` — IDL + Adrena type from `@adrena/abi`

**Deleted:**
- `src/adrena-client/target/adrena.json`, `src/adrena-client/target/adrena.ts`

**adrena-data/processor** — **Modified:**
- `package.json` — added `@adrena/abi` github dep
- `src/utils.ts` — release/39 IDL via `CURRENT_IDL` neutral binding (was `V2_1_0_IDL_JSON`); `getIdlFromSlot` updated; runbook comment for future historical IDLs corrected to use the Anchor 0.30+ JSON-import pattern. Historical V1_*_IDL imports left untouched (immutable snapshots).

**Deleted:**
- `src/targetV2-1-0/adrena.json`, `src/targetV2-1-0/adrena.ts` (release/39 only — V1 historicals stay)

### MrOracle (`main` branch)

**Modified:**
- `Cargo.toml` — pin from `1e05092e` (release/37_4) → `e8cff27c` (release/39 canonical)
- `src/providers/chaoslabs.rs` — local `*_MIN/*_MAX_FEED_ID` consts now derived from `adrena_abi::feed_ids::CHAOSLABS_RANGE`
- `src/providers/autonom.rs` — same for autonom range
- `src/providers/switchboard.rs` — same for switchboard range; new `SwitchboardCluster` enum; `load_switchboard_feed_map_embedded()` (uses `adrena_abi::feed_maps::SWITCHBOARD_{MAINNET,DEVNET}_JSON`); `parse_feed_map()` with `skip_dummy` parameter (embedded skips with warning, override hard-errors); sha256 logged on both paths; updated section header comment
- `src/client.rs` — added `--switchboard-cluster mainnet|devnet` CLI flag (default mainnet); `--switchboard-feed-map-path` is now optional (falls back to embedded)

**Deleted:**
- `config/switchboard_feed_map.json`, `config/switchboard_feed_map_devnet.json`

**Untouched (intentional):**
- `src/adrena_ix.rs` — wire-type vendoring stays. Documented in the file: deliberate decoupling so MrOracle's release cadence isn't pinned to adrena-abi version churn. Three byte-layout tests (`price_data_borsh_size`, `batch_prices_borsh_layout`, `switchboard_feed_map_entry_borsh_size`) gate the local definitions. Full ABI wire centralization is a future follow-up PR.

### MrAutonom (`main` branch)

**Modified:**
- `package.json` — added `@adrena/abi` github dep
- `src/index.ts`:
  - Deleted `DEFAULT_ABI_REV` constant + GitHub raw fetch fallback
  - Deleted hardcoded `CRYPTO_FEED_IDS_AUTONOM = [30..35]`
  - `loadIdl()` now returns embedded `EmbeddedAdrenaIdl` + sha256 from `EmbeddedArtifactManifest.idl_sha256` (with override drift warning when `--idl-path` is used)
  - New `filterSessionedFeedIds()` does symbol lookup via `EmbeddedAutonomFeedMap` then `feed_metadata.sessioned[symbol]`. Hard-fails on unknown feed_id or missing sessioned entry.
  - Startup logs the full adrena-abi artifact manifest block
- `README.md` — full rewrite. Removed stale `--abi-rev`/`DEFAULT_ABI_REV` section. New "IDL + feed maps" section. Architecture diagram updated. Scope section now says non-crypto only with the data-driven filter explanation.

### MrSablier (`main` branch)

**Modified:**
- `Cargo.toml` — pin from `1ae3ec8f` → `e8cff27c`. No source changes.

### MrSablierStaking (`release/39` branch)

**Modified:**
- `Cargo.toml` — pin from `1ae3ec8f` → `e8cff27c`. No source changes.

---

## Out of scope (not touched, can adopt later)

- `frontend/src/target/adrena.{json,ts}` — frontend has its own IDL copy, independent migration
- `discord-bot/idl/adrena.json`, `discord-bot/src/adrena.ts`, `discord-bot/dist/adrena.d.ts`
- `governance-ui/idls/adrena.{json,ts}`
- `local-execution/scripts/setup-adrena.sh` — local-only test harness

These can adopt `@adrena/abi` on their own schedule. There's no breaking dependency on them migrating.

---

## Codex review — three rounds

### Round 1 (PR1 + PR2 baseline)
**Verdict:** Clean go after one cleanup. Main flag was the stale `MrOracle/config/switchboard_feed_map.json` which still had the old slot order. Fixed by full rewrite to canonical layout in PR2.

### Round 2 (post-cutover content audit)
**Findings:** 6 issues, all addressed.

| # | Severity | Issue | Fix |
|---|---|---|---|
| 1 | P0 | `autonom.mainnet.json` only had aliases 30..35; pools_manifest needed 30..46 | Extended to 17 entries (30..46), recomputed manifest sha, added test `autonom_map_covers_full_canonical_layout` |
| 2 | P0 | `processAutonomAssetsPrice.ts` rejected duplicate `autonom_feed_id`, but BTC/WBTC intentionally share canonical 3001 | Removed `seenAutonomFeedIds` check; duplicate alias still hard-errors; canonical dedup via `Set<number>` for logging |
| 3 | P0/P1 | Stale `*_FEED_MAP_PATH` env vars in cron `.env`/`.env-example`/`.env-should-use` pointed at deleted files → ENOENT on boot | Removed all 3 env vars, replaced with comment blocks pointing at the embedded `@adrena/abi` defaults; added `SWITCHBOARD_CLUSTER` |
| 4 | P1 | `processAssetsPrice.ts` (ChaosLabs) still hardcoded `ASSETS`/`ASSET_FEED_IDS` | Migrated to import `@adrena/abi/configs/oracles/chaoslabs.mainnet.json`, added `ALLOWED_ADRENA_FEED_IDS` validation set |
| 5 | P2 | TS services hashed `JSON.stringify(importedJson)` for sha256 logging — doesn't match raw-file sha256 in `artifact_manifest.json` | All 3 sites (MrAutonom, processAutonomAssetsPrice, processSwitchboardInstructions) read sha256 from `EmbeddedArtifactManifest.feed_maps[...]` for embedded mode; override mode keeps raw-file hashing |
| 6 | P2 | `feed_metadata_consistency.rs` only went one direction (every map symbol must be in metadata), missing the reverse case | Added `every_sessioned_symbol_is_present_in_at_least_one_provider_map` test |

### Round 3 (final cosmetic pass)
**Verdict:** Clean go from this audit pass. 3 cosmetic items, all landed.

| # | File | Fix |
|---|---|---|
| 1 | `cron/process/processSwitchboardInstructions.ts:57` | Removed unused `FEED_MAP_PATH` module-load const |
| 2 | `MrOracle/src/providers/switchboard.rs:91` | Updated stale "mirrors adrena-data" comment to reflect the embedded loader flow |
| 3 | `processor/src/utils.ts:51` | Fixed runbook comment for future historical IDLs to use `import VX_Y_Z_IDL_JSON from './targetVX-Y-Z/adrena.json'; const VX_Y_Z_IDL = VX_Y_Z_IDL_JSON as any;` (Anchor 0.30+ JSON pattern) instead of the legacy `import { IDL as ... }` style which only works for pre-0.30 const-style `.ts` exports |

---

## Verification

```
adrena-abi          14/14 cargo tests ✓
                    (5 feed_ids unit + 1 artifact_hashes + 5 feed_metadata_consistency + 3 no_dummy_in_production)
MrSablier            3/3 cargo tests ✓
MrSablierStaking     3/3 cargo tests ✓
MrOracle             7/7 cargo tests ✓
                    (4 adrena_ix borsh layout + 3 pool_config layout offsets)
MrAutonom            npm run build ✓
adrena-data/cron     npm run build ✓
adrena-data/api      npm run build ✓
adrena-data/processor  npm run build ✓
```

Auditor cross-checked: external Autonom prod (separate repo) is at commit `a0797a2194c56ebc1a6bf5432e08813c9ea5bb31`, its `feed_id_aliases.json` has 17 entries and matches `adrena-abi/configs/oracles/autonom.mainnet.json` byte-for-byte. **Zero drift** between adrena-abi and the autonom backend.

MrAutonom dry-run boot against the launch manifest correctly resolved `autonom-equities`, dropped slot 35 (USDCUSD, non-sessioned), and kept sessioned feeds `[36, 37, 38, 39, 40, 41, 42]`. The only failure was a deliberate "nonexistent keypair" sentinel from the auditor — the centralization plumbing itself is clean.

`git diff --check` passes in adrena-data, MrOracle, MrAutonom, MrSablier, MrSablierStaking, adrena-abi.

---

## Pre-commit checklist (per consumer)

Before pushing each consumer PR:

- [ ] `Cargo.toml` / `package.json` pin reads `e8cff27ca0f7a6ed2beb7dcc30dfe6822756b11b`
- [ ] `Cargo.lock` / `package-lock.json` resolved to the same rev
- [ ] `cargo test` (or `npm run build`) is green
- [ ] No file with a pre-PR2 stale path (`target/adrena.json`, `config/*_feed_map.json`) is still committed
- [ ] No code identifier with a baked-in version (`V2_1_0_IDL`, etc.) — only historical immutable snapshots in `processor/src/targetV1-*/` are exempt
- [ ] No literal `330f6845` (the prior pin) anywhere — should all be `e8cff27c`

Final cross-repo grep (run from workspace root):
```bash
rg "330f6845" --glob '!**/node_modules/**' --glob '!**/target/**'
rg "V2_1_0_IDL" --glob '!**/node_modules/**' --glob '!**/target/**'
```
Both should return zero hits across the 7 in-scope consumer repos. (`adrena-abi/RELEASE_39_CENTRALIZATION.md` itself is a documentation match for both terms — that's expected.)

---

## Deploy runbook

### 1. Coordinated push order

Push in this order, but the deploys can land together:

1. **adrena-abi already pushed at `e8cff27c`** ✓ — consumers can pin against it now.
2. Each consumer repo gets its own PR with the changes from the per-repo inventory above. Pin bumps + source edits + deletions all land together.
3. Merge all 7 consumer PRs in the same window. CI on each repo must pass before the batch is promoted.

### 2. Operational smoke

Boot every service in dry-run mode against production env vars and confirm:

- The `adrena-abi artifact:` startup log block is present
- `idl_sha256` matches `17e7a7c6f5f6ce7409e901018ac52bf0a6254b330d38a49ba54758623d608b6a` everywhere
- `feed_maps.<provider>.<cluster>` shas match the values in the "Pinned artifact" section above
- `override_active: false` (unless the operator explicitly set an override CLI flag / env var)
- MrAutonom prints `[autonom-equities] dropped non-sessioned feeds [35:USDCUSD]` and keeps sessioned feeds `[36..42]`
- Any service that prints a different sha for the same file → pin is wrong on that service, halt the deploy

### 3. GitHub-pinned npm dep on deploy machines

The `package-lock.json` files now record `@adrena/abi` via SSH (`ssh://git@github.com/AdrenaFoundation/adrena-abi.git`). Deploy machines / CI runners need an SSH key with read access to the repo. If your existing deploy pipeline only had HTTPS GitHub access, you'll need to either:

- (a) Add an SSH key to the deploy machine + `~/.ssh/known_hosts` for github.com, OR
- (b) Regenerate the lockfiles using `https://` URLs by editing each `package.json` to use `git+https://github.com/AdrenaFoundation/adrena-abi.git#e8cff27c...` instead of `github:AdrenaFoundation/adrena-abi#e8cff27c...`, then `npm install` once on a host with HTTPS-only github access and commit the resulting lockfiles.

Test this **before** the deploy window opens.

### 4. Autonom backend cross-repo sync

The autonom backend's `feed_id_aliases.json` (separate repo at `https://github.com/.../autonom`) MUST stay in sync with `adrena-abi/configs/oracles/autonom.mainnet.json`. As of this writing they're aligned (auditor verified at autonom commit `a0797a2194c56ebc1a6bf5432e08813c9ea5bb31`). For any future change to the autonom map:

1. Edit `adrena-abi/configs/oracles/autonom.mainnet.json`
2. Push the matching change to autonom backend's `feed_id_aliases.json` in the same release window
3. Treat the two files as a single artifact with two storage locations

A planned follow-up adds a CI drift checker. Until then, this is a manual runbook step that must not be skipped.

### 5. Switchboard dummy slots

Slots 143 (jitoSOL) and 144 (BTC) on Switchboard are currently placeholder dummies. They're auto-skipped at boot in embedded mode with a per-slot warning. **Do not enable Switchboard for jitoSOL or BTC in any pool's `multi_oracle_config` until real Switchboard mainnet hashes are added** (procedure in `README.md` → "Switchboard dummy slots"). On-chain consensus correctly falls back to ChaosLabs/Autonom for those two assets in the meantime.

---

## Future bumps (release/40 and beyond)

When a new Adrena release ships, follow the runbook in `README.md` → "Bumping for a new Adrena release". The 9-step process covers:

1. Snapshot the new IDL into `adrena-abi/idl/adrena.json`
2. Update feed maps if the canonical layout changed
3. Regenerate `artifact_manifest.json` with fresh hashes (verified by `tests/artifact_hashes.rs`)
4. Update `package.json` version
5. Run `cargo test -p adrena-abi` (must be 14/14 green)
6. Commit and push, capture the new commit hash
7. Coordinated consumer cutover — bump every `Cargo.toml` / `package.json` pin to the new hash; for adrena-data/processor, freeze the prior release's IDL into `src/targetVX-Y-Z/adrena.json` as a new historical entry per the runbook comment in `processor/src/utils.ts`
8. Run the full consumer build/test sweep
9. Smoke deploy with hash log verification

The `CURRENT_IDL` variable in `processor/src/utils.ts` is intentionally neutral — future bumps DO NOT rename it. Only historical immutable snapshots get version-named bindings (`V2_1_0_IDL`, `V1_3_8_IDL`, etc.).

---

## Contacts / who owns what

- **adrena-abi** — canonical artifact, anyone bumping pins
- **MrOracle** — wire-type vendoring stays per the comment at top of `src/adrena_ix.rs`; full ABI wire centralization is a future PR
- **MrAutonom** — non-crypto market hours gate; the sessioned filter is data-driven from `feed_metadata.json`, no code change needed for new symbols
- **adrena-data/cron** — biggest consumer, 3 separate ingestion pipelines (chaoslabs / autonom / switchboard)
- **adrena-data/api** — IDL only, no feed maps
- **adrena-data/processor** — current IDL via `CURRENT_IDL`; historical IDLs frozen in `src/targetV1-*/`

---

## Closing notes

This migration replaces N stale local copies with one authoritative source, and replaces N manual sweep-and-edit runbooks with one pinned commit hash. Every future release is a 1-line bump in 7 places + a coordinated PR merge, instead of a full grep-and-edit pass across 50 files.

The audit trail (3 codex review rounds, all findings landed) lives in this file. The technical detail (artifact contents, exports, tests, bumping runbook) lives in `README.md`. The two together are the deploy package.
