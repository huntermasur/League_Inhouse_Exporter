import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';

const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, 'inhouse.db');
export const db = new DatabaseSync(DB_PATH);

export function initDb(): void {
  db.exec('PRAGMA journal_mode = WAL');
  db.exec('PRAGMA foreign_keys = ON');

  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key   TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS games (
      match_id      TEXT PRIMARY KEY,
      game_date     INTEGER NOT NULL,
      game_duration INTEGER NOT NULL,
      created_at    INTEGER NOT NULL DEFAULT (unixepoch())
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS player_entries (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      match_id      TEXT    NOT NULL,
      summoner_name TEXT    NOT NULL,
      champion      TEXT    NOT NULL,
      win           INTEGER NOT NULL,
      kills         INTEGER NOT NULL,
      deaths        INTEGER NOT NULL,
      assists       INTEGER NOT NULL,
      team          INTEGER NOT NULL,
      FOREIGN KEY (match_id) REFERENCES games(match_id) ON DELETE CASCADE
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS ban_entries (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      match_id  TEXT    NOT NULL,
      champion  TEXT    NOT NULL,
      team      INTEGER NOT NULL,
      pick_turn INTEGER NOT NULL,
      FOREIGN KEY (match_id) REFERENCES games(match_id) ON DELETE CASCADE
    )
  `);
}
