import { Router, Request, Response } from 'express';
import { db } from '../db/index.js';
import { fetchMatch, resolveChampionId } from '../services/riot-api.js';
import type { StoredGame, StoredPlayer, StoredBan } from '../types/api.js';

const router = Router();

// GET /api/games — list all stored games (newest first)
router.get('/', (_req: Request, res: Response) => {
  const games = db
    .prepare('SELECT * FROM games ORDER BY game_date DESC')
    .all() as unknown as StoredGame[];
  res.json(games);
});

// GET /api/games/:matchId — detail view for one game
router.get('/:matchId', (req: Request, res: Response) => {
  const { matchId } = req.params;

  const game = db
    .prepare('SELECT * FROM games WHERE match_id = ?')
    .get(matchId) as StoredGame | undefined;

  if (!game) {
    res.status(404).json({ error: 'Game not found' });
    return;
  }

  const players = db
    .prepare('SELECT * FROM player_entries WHERE match_id = ? ORDER BY team, id')
    .all(matchId) as unknown as StoredPlayer[];

  const bans = db
    .prepare('SELECT * FROM ban_entries WHERE match_id = ? ORDER BY team, pick_turn')
    .all(matchId) as unknown as StoredBan[];

  res.json({ game, players, bans });
});

// POST /api/games — import a new game by numeric ID
router.post('/', async (req: Request, res: Response) => {
  const { game_id } = req.body as { game_id?: string };

  if (!game_id || !/^\d+$/.test(game_id.trim())) {
    res.status(400).json({ error: 'game_id must be a numeric match ID (e.g. 5515325815)' });
    return;
  }

  const numericId = game_id.trim();
  const matchId = `NA1_${numericId}`;

  const existing = db.prepare('SELECT match_id FROM games WHERE match_id = ?').get(matchId);
  if (existing) {
    res.status(409).json({ error: `Game ${numericId} is already in the database.` });
    return;
  }

  try {
    const match = await fetchMatch(numericId);
    const { info } = match;

    // Insert game record
    db.prepare(`
      INSERT INTO games (match_id, game_date, game_duration)
      VALUES (?, ?, ?)
    `).run(matchId, info.gameStartTimestamp, info.gameDuration);

    // Insert player entries
    const insertPlayer = db.prepare(`
      INSERT INTO player_entries (match_id, summoner_name, champion, win, kills, deaths, assists, team)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const p of info.participants) {
      const name = p.riotIdGameName
        ? `${p.riotIdGameName}#${p.riotIdTagline}`
        : p.summonerName;
      insertPlayer.run(matchId, name, p.championName, p.win ? 1 : 0, p.kills, p.deaths, p.assists, p.teamId);
    }

    // Insert ban entries (resolve champion IDs → names)
    const insertBan = db.prepare(`
      INSERT INTO ban_entries (match_id, champion, team, pick_turn)
      VALUES (?, ?, ?, ?)
    `);

    for (const team of info.teams) {
      for (const ban of team.bans) {
        if (ban.championId === -1) continue; // -1 means no ban
        const championName = resolveChampionId(ban.championId);
        insertBan.run(matchId, championName, team.teamId, ban.pickTurn);
      }
    }

    res.status(201).json({ success: true, match_id: matchId });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

// DELETE /api/games/:matchId
router.delete('/:matchId', (req: Request, res: Response) => {
  const { matchId } = req.params;

  const existing = db.prepare('SELECT match_id FROM games WHERE match_id = ?').get(matchId);
  if (!existing) {
    res.status(404).json({ error: 'Game not found' });
    return;
  }

  // CASCADE delete removes player_entries and ban_entries automatically
  db.prepare('DELETE FROM games WHERE match_id = ?').run(matchId);
  res.json({ success: true });
});

export default router;
