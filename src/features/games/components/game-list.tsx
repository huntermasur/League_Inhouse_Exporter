import type { StoredGame } from '../../../shared/types';
import styles from './game-list.module.css';

interface Props {
  games: StoredGame[];
  selectedId: string | null;
  onSelect: (matchId: string) => void;
  onDelete: (matchId: string) => void;
}

function formatDate(timestampMs: number): string {
  return new Date(timestampMs).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

export function GameList({ games, selectedId, onSelect, onDelete }: Props) {
  if (games.length === 0) {
    return (
      <p className={styles.empty}>No games yet. Add a game ID above to get started.</p>
    );
  }

  return (
    <ul className={styles.list}>
      {games.map((g) => {
        const numericId = g.match_id.replace('NA1_', '');
        const isSelected = g.match_id === selectedId;
        return (
          <li
            key={g.match_id}
            className={`${styles.item} ${isSelected ? styles.selected : ''}`}
          >
            <button
              className={styles.selectBtn}
              onClick={() => onSelect(g.match_id)}
              aria-pressed={isSelected}
            >
              <span className={styles.gameId}>#{numericId}</span>
              <span className={styles.meta}>
                {formatDate(g.game_date)} · {formatDuration(g.game_duration)}
              </span>
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => onDelete(g.match_id)}
              aria-label={`Delete game ${numericId}`}
              title="Delete game"
            >
              ✕
            </button>
          </li>
        );
      })}
    </ul>
  );
}
