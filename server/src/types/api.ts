// Shared types for the Riot API responses and internal data models.

export interface RiotMatchParticipant {
  riotIdGameName: string;
  riotIdTagline: string;
  summonerName: string;
  championName: string;
  kills: number;
  deaths: number;
  assists: number;
  win: boolean;
  teamId: number;
}

export interface RiotMatchBan {
  championId: number;
  pickTurn: number;
}

export interface RiotMatchTeam {
  teamId: number;
  win: boolean;
  bans: RiotMatchBan[];
}

export interface RiotMatchInfo {
  gameDuration: number;
  gameStartTimestamp: number;
  participants: RiotMatchParticipant[];
  teams: RiotMatchTeam[];
}

export interface RiotMatchResponse {
  metadata: { matchId: string };
  info: RiotMatchInfo;
}

// ── Stored DB shapes returned to the frontend ──────────────────────────────

export interface StoredGame {
  match_id: string;
  game_date: number;
  game_duration: number;
  created_at: number;
}

export interface StoredPlayer {
  id: number;
  match_id: string;
  summoner_name: string;
  champion: string;
  win: number;
  kills: number;
  deaths: number;
  assists: number;
  team: number;
}

export interface StoredBan {
  id: number;
  match_id: string;
  champion: string;
  team: number;
  pick_turn: number;
}

// ── Stats aggregation shapes ───────────────────────────────────────────────

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
  banCount: BanCountRow[];
  banRate: BanRateRow[];
  pickCount: PickCountRow[];
  kda: KdaRow[];
  gamesParticipated: GamesParticipatedRow[];
  winRate: WinRateRow[];
  totalGames: number;
}
