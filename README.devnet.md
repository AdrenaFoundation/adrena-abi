# Adrena ABI (Rust)

This repository is a Rust "ABI" crate for the Adrena Solana program.

It is intended for:

- Off-chain Rust clients that want strongly-typed access to Adrena accounts, PDAs, and instruction parameter structs.
- On-chain programs that want to CPI into Adrena using the same account layouts and PDA derivations.

In addition, the repo includes a checked-in Anchor IDL and generated TypeScript types.

## What this crate contains

- Instruction account structs (`#[derive(Accounts)]`) matching Adrena instructions.
- Instruction parameter structs (`AnchorSerialize`/`AnchorDeserialize`) used as instruction data.
- Program account types (many are `#[account(zero_copy)]`) matching Adrena on-chain state.
- PDA helpers to derive Adrena addresses.
- Utility modules (math, liquidation price helpers, fixed-size strings).

This crate is *not* the on-chain Adrena program. It is a consumer-facing interface crate.

## Repository layout

- `Cargo.toml`
  - Rust crate manifest.
  - Depends on `anchor-lang` and `anchor-client`.

- `src/lib.rs`
  - Exports `types` and `pda` as the main surface area.
  - Declares the program id via `declare_id!(...)`.
  - Defines the instruction account structs (the `Context<...>` accounts) and the instruction entrypoints.
    - The instruction bodies in this crate are stubs (they return `Ok(())`) because the goal is typing/IDL generation.

- `src/types.rs`
  - Core account types and instruction params.
  - Includes account layouts like `Cortex`, `Pool`, `Custody`, `Position`, `Staking`, `UserProfile`, etc.

- `src/pda.rs`
  - PDA derivation helpers for Adrena PDAs (pool, custody, position, staking, oracle, etc.).

- `src/oracle.rs`
  - Oracle account layout and helper functions.

- `idl/adrena.json`
  - Anchor IDL for Adrena.

- `idl/adrena.ts`
  - Generated TypeScript types/interfaces from the IDL.

## Build

```bash
cargo build
```

## Using from an off-chain Rust client

This crate is designed to be used together with `anchor-client`.

At a high level:

- Use constants / program id (`adrena_abi::id()` / `ADRENA_PROGRAM_ID`) to target the program.
- Use PDA helpers in `adrena_abi::pda` to derive addresses.
- Use types from `adrena_abi::types` to deserialize on-chain accounts.

## Using from another Solana program (CPI)

This crate exposes the `#[derive(Accounts)]` account structs for Adrena instructions as well as all required data types.

When you CPI:

- You still invoke the *real* Adrena program id.
- You pass the CPI accounts in the same order/types as defined in `src/lib.rs`.
- You can derive/validate PDAs with the helpers in `src/pda.rs`.

## Devnet setup (using a devnet deployment)

### Devnet + mock assets: addresses to update (step-by-step)

This repo currently hardcodes a set of pubkeys in `src/lib.rs`. For a devnet deployment with mock assets, these must be replaced (or ignored and provided by runtime config) so that your client/CPI targets the correct devnet accounts.

#### Step 1: Update the Adrena program id

- **`declare_id!("...")`**
  - **Where**: `src/lib.rs`
  - **What to put**: your *devnet* Adrena program id
  - **How to get it**: output of `solana program deploy ...` / your deployment tooling

- **`ADRENA_PROGRAM_ID`**
  - **Where**: `src/lib.rs`
  - **What to put**: same devnet Adrena program id as above

#### Step 2: Decide how you will derive PDAs on devnet

PDAs depend on the program id.

- **If you will keep this crate “mainnet-coded”** and configure devnet in your client:
  - Do **not** use the PDA helpers that call `crate::id()`.
  - Derive PDAs with:
    - `Pubkey::find_program_address(seeds, &devnet_program_id)`

- **If you want this crate to work natively on devnet**:
  - Update the program id (Step 1) so `crate::id()` is your devnet id.
  - Then `src/pda.rs` helpers will derive devnet PDAs correctly.

#### Step 3: Update (or supply via config) all network-specific pubkeys

Below is the explicit list from `src/lib.rs`.

##### Global program/program-library addresses

- **`SYSTEM_PROGRAM_ID`**: usually unchanged (always `11111111111111111111111111111111`)
- **`SPL_TOKEN_PROGRAM_ID`**: usually unchanged (`Tokenkeg...`)
- **`SPL_ASSOCIATED_TOKEN_PROGRAM_ID`**: usually unchanged (`AToken...`)
- **`SPL_GOVERNANCE_PROGRAM_ID` / `GOVERNANCE_PROGRAM_ID`**: usually unchanged (`GovER...`)

If you are not using custom program ids for these, you can leave them.

##### Token mint addresses (mock assets)

Replace these with your devnet/mock mint pubkeys:

- **`SOL_MINT`**
  - If you use wrapped SOL, this often stays `So111...`.
  - If you minted a mock SOL token, replace it with that mint.

- **`USDC_MINT`**
- **`BONK_MINT`**
- **`JITO_MINT`**
- **`WBTC_MINT`**
- **`ADX_MINT`**
- **`ALP_MINT`**

How to get the mint pubkeys:

- If you created mock mints: the pubkey returned by your mint-creation script.
- If you use existing devnet mints: the mint pubkey used by that devnet token.

##### Core Adrena state addresses

Replace these with the devnet addresses produced by your devnet deployment/initialization:

- **`CORTEX_ID`**
- **`MAIN_POOL_ID`**
- **`GENESIS_LOCK_ID`**

How to get them:

- If they are PDAs: derive them using the devnet program id + seeds.
- If they were created/printed by an init instruction/script: use the pubkeys from that output.

##### Main pool custodies

Replace these with the devnet custody pubkeys for the devnet pool:

- **`main_pool::USDC_CUSTODY_ID`**
- **`main_pool::BONK_CUSTODY_ID`**
- **`main_pool::JITOSOL_CUSTODY_ID`**
- **`main_pool::WBTC_CUSTODY_ID`**

How to get them:

- If custodies are PDAs: derive using the pool pubkey + mint pubkey + devnet program id.
- Otherwise: use the pubkeys created during your custody initialization.

##### Governance realm/config/shadow token

If your devnet environment uses governance:

- **`ADRENA_GOVERNANCE_REALM_ID`**
- **`ADRENA_GOVERNANCE_REALM_CONFIG_ID`**
- **`ADRENA_GOVERNANCE_SHADOW_TOKEN_MINT`**

If you are not using governance on devnet, you can omit these from your devnet config (but don’t accidentally use mainnet values).

#### Step 4: IDL/types (only if your devnet build differs)

- If devnet is the **same program build** as mainnet (same instructions/accounts): keep `idl/adrena.json` and `idl/adrena.ts`.
- If devnet uses a **different build** (mock-only instructions/accounts/layout changes): regenerate/update the IDL + TS types.

### Important: program id and "hardcoded mainnet" constants

`src/lib.rs` currently has:

- `declare_id!("13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet")`
- `pub static ADRENA_PROGRAM_ID: Pubkey = pubkey!("13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet");`
- Several other static pubkeys that look like mainnet addresses (mints, pool ids, custody ids, governance realm ids, etc.).

If you want to use this crate against a *devnet* deployment, you must treat these addresses as **network-specific**.

You have two common options:

- **Option A (recommended): Do not rely on those static addresses in devnet code.**
  - In your devnet client, pass the devnet program id + devnet pool/custody/mint addresses via config/env.
  - Use `anchor_client::Program::new(<devnet_program_id>, ...)` (or equivalent) instead of `adrena_abi::id()`.

- **Option B: Add a build-time switch (feature flag) for devnet constants.**
  - This requires code changes in this crate to have `#[cfg(feature = "devnet")]` alternate ids.
  - I can implement this if you provide the devnet addresses you want to bake in.

### Pointing Solana CLI to devnet

```bash
solana config set --url https://api.devnet.solana.com
solana config get
```

### Funding your devnet wallet

```bash
solana airdrop 2
```

### Using the devnet Adrena program id in Rust

In your client, explicitly set the program id you want to talk to.

What you need:

- Devnet RPC URL (e.g. `https://api.devnet.solana.com` or a provider)
- A payer keypair with devnet SOL
- The Adrena **devnet** program id

Then build an `anchor-client` `Program` targeting that id.

### PDA derivation on devnet

PDAs depend on the **program id**. As long as you derive PDAs using the same devnet program id that the program was deployed with, the PDA helpers in `src/pda.rs` remain valid.

If you use Option A above (program id passed from config), prefer deriving PDAs with:

- `Pubkey::find_program_address(seeds, &devnet_program_id)`

rather than `crate::id()`.

### Devnet pool / custody / mint addresses

The repo currently exports a set of pool/custody constants under `lib.rs` (e.g. `MAIN_POOL_ID`, `main_pool::USDC_CUSTODY_ID`, etc.).

Those are only correct for the network they were taken from.

For devnet, you will need the devnet equivalents (or create/init them if your devnet deployment is a fresh instance).

## What I need from you to finish the devnet guide

To make the devnet instructions concrete (and optionally add a `devnet` feature flag), tell me:

- The **Adrena program id on devnet**
- Whether you already have devnet deployments for:
  - `Cortex`
  - `Pool` (name and pubkey)
  - Custodies (mint + custody pubkeys)
  - Oracle pubkeys

If you don’t have these yet and you’re actually trying to *deploy Adrena to devnet*, that is a separate repo/process (the on-chain program repo). In that case, I can still help you configure your client to use devnet once you deploy and have the addresses.
