import { db } from "../db/index.js";

const CHAMPIONS_URL_BASE = "https://ddragon.leagueoflegends.com";

// In-memory cache: numericId string → champion name
let championIdMap: Record<string, string> = {};
let cacheLoadedAt = 0;
const CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24 hours

async function loadChampionCache(): Promise<void> {
  if (
    Date.now() - cacheLoadedAt < CACHE_TTL_MS &&
    Object.keys(championIdMap).length > 0
  ) {
    return;
  }

  const versionsRes = await fetch(`${CHAMPIONS_URL_BASE}/api/versions.json`);
  if (!versionsRes.ok) throw new Error("Failed to fetch Data Dragon versions");
  const versions: string[] = (await versionsRes.json()) as string[];
  const latest = versions[0];

  const champRes = await fetch(
    `${CHAMPIONS_URL_BASE}/cdn/${latest}/data/en_US/champion.json`,
  );
  if (!champRes.ok) throw new Error("Failed to fetch champion data");
  const champData = (await champRes.json()) as {
    data: Record<string, { key: string; name: string }>;
  };

  championIdMap = {};
  for (const champ of Object.values(champData.data)) {
    championIdMap[champ.key] = champ.name;
  }
  cacheLoadedAt = Date.now();
}

export function resolveChampionId(id: number): string {
  return championIdMap[String(id)] ?? `Unknown(${id})`;
}

function getApiKey(): string {
  const row = db
    .prepare("SELECT value FROM settings WHERE key = ?")
    .get("riot_api_key") as { value: string } | undefined;

  if (!row?.value) {
    throw new Error("Riot API key not configured. Please add it in Settings.");
  }
  return row.value;
}

export async function fetchMatch(
  numericId: string,
): Promise<import("../types/api.js").RiotMatchResponse> {
  const apiKey = getApiKey();
  await loadChampionCache();

  const matchId = `NA1_${numericId}`;
  const url = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`;

  const res = await fetch(url, {
    headers: { "X-Riot-Token": apiKey },
  });

  if (res.status === 401 || res.status === 403) {
    throw new Error(
      "Invalid or expired API key. Please update it in Settings.",
    );
  }
  if (res.status === 404) {
    throw new Error(
      `Match ${numericId} not found. Check the game ID and try again.`,
    );
  }
  if (res.status === 429) {
    throw new Error(
      "Rate limited by Riot API. Please wait a moment and try again.",
    );
  }
  if (!res.ok) {
    throw new Error(`Riot API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<import("../types/api.js").RiotMatchResponse>;
}
