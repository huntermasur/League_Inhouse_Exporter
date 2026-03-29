// Mirrors the server-side types for use in the frontend.

export interface StoredGame {
  match_id: string;
  game_date: number; // Unix ms timestamp
  game_duration: number; // seconds
  created_at: number;
}

export interface StoredPlayer {
  id: number;
  match_id: string;
  summoner_name: string;
  champion: string;
  win: number; // 0 or 1
  kills: number;
  deaths: number;
  assists: number;
  team: number; // 100 or 200
}

export interface StoredBan {
  id: number;
  match_id: string;
  champion: string;
  team: number;
  pick_turn: number;
}

export interface GameDetail {
  game: StoredGame;
  players: StoredPlayer[];
  bans: StoredBan[];
}

// ── Stats ──────────────────────────────────────────────────────────────────

export interface BanCountRow {
  champion: string;
  count: number;
}

export interface BanRateRow {
  champion: string;
  bans: number;
  total_games: number;
  rate: number;
}

export interface PickCountRow {
  champion: string;
  count: number;
}

export interface KdaRow {
  champion: string;
  avg_kills: number;
  avg_deaths: number;
  avg_assists: number;
  games_played: number;
}

export interface GamesParticipatedRow {
  summoner_name: string;
  count: number;
}

export interface WinRateRow {
  summoner_name: string;
  games: number;
  wins: number;
  rate: number;
}

export interface StatsResponse {
  totalGames: number;
  banCount: BanCountRow[];
  banRate: BanRateRow[];
  pickCount: PickCountRow[];
  kda: KdaRow[];
  gamesParticipated: GamesParticipatedRow[];
  winRate: WinRateRow[];
}

// ── API response wrapper ───────────────────────────────────────────────────

export interface ApiError {
  error: string;
}
