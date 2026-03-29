import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { initDb } from './db/index.js';
import gamesRouter from './routes/games.js';
import statsRouter from './routes/stats.js';
import settingsRouter from './routes/settings.js';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const DIST_DIR = path.join(process.cwd(), '..', 'dist');

// Initialize the SQLite database and schema
initDb();

const app = express();

// Allow all origins — this is a trusted local-network tool
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/games', gamesRouter);
app.use('/api/stats', statsRouter);
app.use('/api/settings', settingsRouter);

// In production, serve the built frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(DIST_DIR));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`API available at http://localhost:${PORT}/api`);
  }
});
