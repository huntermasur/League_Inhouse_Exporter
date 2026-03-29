import { Router, Request, Response } from 'express';
import { db } from '../db/index.js';

const router = Router();

// GET /api/settings
router.get('/', (_req: Request, res: Response) => {
  const rows = db.prepare('SELECT key, value FROM settings').all() as unknown as { key: string; value: string }[];
  const result: Record<string, string> = {};
  for (const row of rows) {
    // Mask the API key — only expose whether it is set and the last 4 chars
    if (row.key === 'riot_api_key') {
      result[row.key] = row.value ? `****${row.value.slice(-4)}` : '';
    } else {
      result[row.key] = row.value;
    }
  }
  res.json(result);
});

// POST /api/settings
router.post('/', (req: Request, res: Response) => {
  const { riot_api_key } = req.body as { riot_api_key?: string };

  if (!riot_api_key || typeof riot_api_key !== 'string') {
    res.status(400).json({ error: 'riot_api_key is required' });
    return;
  }

  const trimmed = riot_api_key.trim();
  if (!trimmed) {
    res.status(400).json({ error: 'riot_api_key cannot be empty' });
    return;
  }

  db.prepare(`
    INSERT INTO settings (key, value) VALUES ('riot_api_key', ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value
  `).run(trimmed);

  res.json({ success: true, message: 'API key saved.' });
});

export default router;
