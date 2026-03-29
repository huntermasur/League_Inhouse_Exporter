import { Router, Request, Response } from 'express';
import { db } from '../db/index.js';
import type {
  BanCountRow,
  BanRateRow,
  PickCountRow,
  KdaRow,
  GamesParticipatedRow,
  WinRateRow,
  StatsResponse,
} from '../types/api.js';

const router = Router();

// GET /api/stats — all aggregated stats for the charts
router.get('/', (_req: Request, res: Response) => {
  const totalGames = (
    db.prepare('SELECT COUNT(*) as cnt FROM games').get() as { cnt: number }
  ).cnt;

  const banCount = db
    .prepare(`
      SELECT champion, COUNT(*) as count
      FROM ban_entries
      GROUP BY champion
      ORDER BY count DESC
    `)
    .all() as unknown as BanCountRow[];

  const banRate = db
    .prepare(`
      SELECT
        champion,
        COUNT(*) as bans,
        ? as total_games,
        ROUND(CAST(COUNT(*) AS REAL) / ? * 100, 1) as rate
      FROM ban_entries
      GROUP BY champion
      ORDER BY rate DESC
    `)
    .all(totalGames, totalGames) as unknown as BanRateRow[];

  const pickCount = db
    .prepare(`
      SELECT champion, COUNT(*) as count
      FROM player_entries
      GROUP BY champion
      ORDER BY count DESC
    `)
    .all() as unknown as PickCountRow[];

  const kda = db
    .prepare(`
      SELECT
        champion,
        ROUND(AVG(kills), 2)   as avg_kills,
        ROUND(AVG(deaths), 2)  as avg_deaths,
        ROUND(AVG(assists), 2) as avg_assists,
        COUNT(*) as games_played
      FROM player_entries
      GROUP BY champion
      ORDER BY champion ASC
    `)
    .all() as unknown as KdaRow[];

  const gamesParticipated = db
    .prepare(`
      SELECT summoner_name, COUNT(*) as count
      FROM player_entries
      GROUP BY summoner_name
      ORDER BY count DESC
    `)
    .all() as unknown as GamesParticipatedRow[];

  const winRate = db
    .prepare(`
      SELECT
        summoner_name,
        COUNT(*)     as games,
        SUM(win)     as wins,
        ROUND(CAST(SUM(win) AS REAL) / COUNT(*) * 100, 1) as rate
      FROM player_entries
      GROUP BY summoner_name
      ORDER BY rate DESC
    `)
    .all() as unknown as WinRateRow[];

  const stats: StatsResponse = {
    totalGames,
    banCount,
    banRate,
    pickCount,
    kda,
    gamesParticipated,
    winRate,
  };

  res.json(stats);
});

export default router;
