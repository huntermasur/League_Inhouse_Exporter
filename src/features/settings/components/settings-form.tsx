import { useState, type FormEvent } from 'react';
import { useSettings } from '../hooks/use-settings';
import styles from './settings-form.module.css';

export function SettingsForm() {
  const [apiKey, setApiKey] = useState('');
  const { saving, error, successMessage, saveApiKey } = useSettings();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (apiKey.trim()) {
      saveApiKey(apiKey.trim());
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Settings</h2>

      <section className={styles.section}>
        <h3 className={styles.sectionHeading}>Riot API Key</h3>
        <p className={styles.description}>
          Enter your Riot Games API key. Development keys expire every 24 hours
          and can be refreshed at{' '}
          <a
            href="https://developer.riotgames.com"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            developer.riotgames.com
          </a>
          .
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="api-key" className={styles.label}>
              API Key
            </label>
            <input
              id="api-key"
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="RGAPI-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              className={styles.input}
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}
          {successMessage && <p className={styles.success}>{successMessage}</p>}

          <button
            type="submit"
            className={styles.button}
            disabled={saving || !apiKey.trim()}
          >
            {saving ? 'Saving…' : 'Save API Key'}
          </button>
        </form>
      </section>
    </div>
  );
}
