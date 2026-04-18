/**
 * Canonical pool manifest loader for every TypeScript Adrena offchain
 * service (MrAutonom, adrena-data/*, future consumers).
 *
 * The manifest itself ships at `@adrena/abi/configs/pools_manifest.json`.
 * Consumers import this module to get:
 *   - Type definitions (PoolManifestEntry, PoolsManifest, AutomationFlags)
 *   - `loadEmbeddedPoolsManifest()` — returns the adrena-abi-embedded default
 *   - `loadPoolsManifest(path)` — reads + validates an override file from disk
 *   - `loadPoolsManifestWithOverride(overridePath?)` — embedded if no override,
 *     file otherwise. This is the preferred entrypoint for service startup
 *     code that takes a `--manifest-path` CLI flag.
 *   - `resolvePoolContexts(manifest)` — PDA derivations + typed pubkeys
 *   - `getPoolsByType` / `getPoolsWithAutomation` filters
 *
 * Usage:
 *   import {
 *     loadPoolsManifestWithOverride,
 *     resolvePoolContexts,
 *   } from "@adrena/abi/configs/pools_manifest_loader";
 *
 *   const manifest = loadPoolsManifestWithOverride(cliArgs.manifestPath);
 *   const contexts = resolvePoolContexts(manifest);
 */

import * as fs from "fs";
import * as path from "path";
import { PublicKey } from "@solana/web3.js";

// ─── Types ────────────────────────────────────────────────────────────────

export interface AutomationFlags {
  liquidations: boolean;
  slTp: boolean;
  limitOrders: boolean;
  marketOpening: boolean;
  distributeFees: boolean;
  resolveStakingRound: boolean;
}

export interface PoolManifestEntry {
  name: string;
  type: "gmx" | "autonom";
  oracleProviders: string[];
  custodies: string[];           // pubkey strings (base58)
  syntheticCustodies: string[];  // pubkey strings
  lpMint: string;                // pubkey string
  feedIds: number[];             // u8 feed IDs; required + non-empty for autonom
  automation: AutomationFlags;
}

export interface PoolsManifest {
  pools: PoolManifestEntry[];
}

export interface ResolvedPoolContext {
  name: string;
  pda: PublicKey;
  type: "gmx" | "autonom";
  oracleProviders: string[];
  custodies: PublicKey[];
  syntheticCustodies: PublicKey[];
  allCustodiesOrdered: PublicKey[]; // custodies + syntheticCustodies (order matches the on-chain remaining_accounts contract)
  lpMint: PublicKey | null;         // null iff lpMint is "" in the manifest (pre-deploy state)
  genesisLock: PublicKey;
  feedIds: number[];
  automation: AutomationFlags;
}

// ─── Constants ────────────────────────────────────────────────────────────

// The on-chain Adrena program ID is the only address the manifest loader
// needs to derive PDAs deterministically. Pulling it from the bundled JSON
// avoids a circular import of the IDL.
const ADRENA_PROGRAM_ID = new PublicKey(
  "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet"
);

const EMBEDDED_MANIFEST_PATH = path.join(__dirname, "pools_manifest.json");

// ─── Disk I/O + validation ────────────────────────────────────────────────

export function loadEmbeddedPoolsManifest(): PoolsManifest {
  return loadPoolsManifest(EMBEDDED_MANIFEST_PATH);
}

export function loadPoolsManifest(manifestPath: string): PoolsManifest {
  const raw = fs.readFileSync(manifestPath, "utf-8");
  const manifest = JSON.parse(raw) as PoolsManifest;
  validatePoolsManifest(manifest, manifestPath);
  return manifest;
}

/**
 * Preferred startup entrypoint for services with a --manifest-path CLI flag.
 * Reads the override file if `overridePath` is a non-empty string, otherwise
 * returns the adrena-abi-embedded default. Either way, the returned manifest
 * is validated.
 */
export function loadPoolsManifestWithOverride(
  overridePath?: string | null
): PoolsManifest {
  if (overridePath && overridePath.length > 0) {
    return loadPoolsManifest(overridePath);
  }
  return loadEmbeddedPoolsManifest();
}

function validatePoolsManifest(
  manifest: PoolsManifest,
  source: string
): void {
  if (!manifest.pools || manifest.pools.length === 0) {
    throw new Error(
      `pools manifest at ${source} has no pools — refusing to boot`
    );
  }

  const names = new Set<string>();
  for (const entry of manifest.pools) {
    if (typeof entry.name !== "string" || entry.name.length === 0) {
      throw new Error(`pools manifest entry has empty name`);
    }
    if (names.has(entry.name)) {
      throw new Error(`duplicate pool name '${entry.name}' in ${source}`);
    }
    names.add(entry.name);

    if (entry.type !== "gmx" && entry.type !== "autonom") {
      throw new Error(
        `pool '${entry.name}' has unknown type '${entry.type}' in ${source}`
      );
    }

    if (
      entry.type === "autonom" &&
      (!entry.feedIds || entry.feedIds.length === 0)
    ) {
      throw new Error(
        `autonom pool '${entry.name}' in ${source} has no feedIds — ` +
          `required for MrAutonom market opening + adrena-data filtering`
      );
    }

    // feedIds must fit u8.
    for (const fid of entry.feedIds ?? []) {
      if (!Number.isInteger(fid) || fid < 0 || fid > 255) {
        throw new Error(
          `pool '${entry.name}' feedIds contains non-u8 value ${fid}`
        );
      }
    }
  }
}

// ─── PDA derivation helpers ───────────────────────────────────────────────

function getPoolPda(poolName: string): PublicKey {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from("pool"), Buffer.from(poolName)],
    ADRENA_PROGRAM_ID
  );
  return pda;
}

function getGenesisLockPda(poolPda: PublicKey): PublicKey {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from("genesis_lock"), poolPda.toBuffer()],
    ADRENA_PROGRAM_ID
  );
  return pda;
}

function parsePubkeyOrNull(raw: string): PublicKey | null {
  if (!raw || raw.length === 0) return null;
  return new PublicKey(raw);
}

function parsePubkeyArray(raw: string[]): PublicKey[] {
  return raw
    .filter((s) => typeof s === "string" && s.length > 0)
    .map((s) => new PublicKey(s));
}

export function resolvePoolContexts(
  manifest: PoolsManifest
): ResolvedPoolContext[] {
  return manifest.pools.map((entry) => {
    const pda = getPoolPda(entry.name);
    const custodies = parsePubkeyArray(entry.custodies);
    const syntheticCustodies = parsePubkeyArray(entry.syntheticCustodies);
    const allCustodiesOrdered = [...custodies, ...syntheticCustodies];
    return {
      name: entry.name,
      pda,
      type: entry.type,
      oracleProviders: entry.oracleProviders,
      custodies,
      syntheticCustodies,
      allCustodiesOrdered,
      lpMint: parsePubkeyOrNull(entry.lpMint),
      genesisLock: getGenesisLockPda(pda),
      feedIds: entry.feedIds ?? [],
      automation: entry.automation,
    };
  });
}

// ─── Filters ──────────────────────────────────────────────────────────────

export function getPoolsByType(
  manifest: PoolsManifest,
  type: "gmx" | "autonom"
): PoolManifestEntry[] {
  return manifest.pools.filter((p) => p.type === type);
}

export function getPoolsWithAutomation(
  manifest: PoolsManifest,
  flag: keyof AutomationFlags
): PoolManifestEntry[] {
  return manifest.pools.filter((p) => p.automation[flag]);
}
