import { useState, useCallback } from 'react';
import { apiClient } from '../../../shared/utils/api-client';

interface SaveResult {
  success: boolean;
  message?: string;
}

export function useSettings() {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const saveApiKey = useCallback(async (key: string) => {
    setSaving(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const result = await apiClient.post<SaveResult>('/settings', { riot_api_key: key });
      setSuccessMessage(result.message ?? 'Saved!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  }, []);

  return { saving, error, successMessage, saveApiKey };
}
