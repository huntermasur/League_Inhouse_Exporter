import { useState, useEffect } from "react";
import { apiClient } from "../../../shared/utils/api-client";
import type { StatsResponse } from "../../../shared/types";

export function useStats() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get<StatsResponse>("/stats")
      .then(setStats)
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load stats"),
      )
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading, error };
}
