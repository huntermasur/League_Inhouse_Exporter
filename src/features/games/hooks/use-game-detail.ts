import { useState, useEffect } from "react";
import { apiClient } from "../../../shared/utils/api-client";
import type { GameDetail } from "../../../shared/types";

export function useGameDetail(matchId: string | null) {
  const [detail, setDetail] = useState<GameDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!matchId) {
      setDetail(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    apiClient
      .get<GameDetail>(`/games/${encodeURIComponent(matchId)}`)
      .then((data) => {
        if (!cancelled) setDetail(data);
      })
      .catch((err) => {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Failed to load");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [matchId]);

  return { detail, loading, error };
}
