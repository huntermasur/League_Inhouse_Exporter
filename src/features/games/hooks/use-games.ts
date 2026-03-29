import { useState, useCallback, useEffect } from 'react';
import { apiClient } from '../../../shared/utils/api-client';
import type { StoredGame } from '../../../shared/types';

export function useGames() {
  const [games, setGames] = useState<StoredGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGames = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.get<StoredGame[]>('/games');
      setGames(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load games');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const addGame = useCallback(
    async (gameId: string): Promise<void> => {
      await apiClient.post('/games', { game_id: gameId });
      await fetchGames();
    },
    [fetchGames],
  );

  const removeGame = useCallback(
    async (matchId: string): Promise<void> => {
      await apiClient.delete(`/games/${encodeURIComponent(matchId)}`);
      await fetchGames();
    },
    [fetchGames],
  );

  return { games, loading, error, addGame, removeGame, refetch: fetchGames };
}
