import { useState } from "react";
import { AddGameForm, GameList, GameDetail, useGames } from "../features/games";
import styles from "./games-page.module.css";

export function GamesPage() {
  const { games, loading, error, addGame, removeGame } = useGames();
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);

  function handleDelete(matchId: string) {
    removeGame(matchId).catch(() => {});
    if (selectedMatchId === matchId) setSelectedMatchId(null);
  }

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <h2 className={styles.heading}>Games</h2>
        <AddGameForm onAdd={addGame} />
        {loading && <p className={styles.status}>Loading…</p>}
        {error && <p className={styles.error}>{error}</p>}
        <GameList
          games={games}
          selectedId={selectedMatchId}
          onSelect={setSelectedMatchId}
          onDelete={handleDelete}
        />
      </div>

      <div className={styles.detail}>
        <GameDetail matchId={selectedMatchId} />
      </div>
    </div>
  );
}
