import { useState, type FormEvent } from 'react';
import styles from './add-game-form.module.css';

interface Props {
  onAdd: (gameId: string) => Promise<void>;
}

export function AddGameForm({ onAdd }: Props) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    try {
      await onAdd(trimmed);
      setValue('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add game');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.row}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Game ID (e.g. 5515325815)"
          className={styles.input}
          disabled={loading}
          aria-label="Game ID"
        />
        <button type="submit" className={styles.button} disabled={loading || !value.trim()}>
          {loading ? 'Importing…' : 'Add Game'}
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
