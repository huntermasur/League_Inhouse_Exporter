import { useGameDetail } from "../hooks/use-game-detail";
import type { StoredPlayer, StoredBan } from "../../../shared/types";
import styles from "./game-detail.module.css";

interface Props {
  matchId: string | null;
}

function kdaRatio(kills: number, deaths: number, assists: number): string {
  if (deaths === 0) return "Perfect";
  return ((kills + assists) / deaths).toFixed(2);
}

function TeamSection({
  teamId,
  players,
  bans,
  won,
}: {
  teamId: number;
  players: StoredPlayer[];
  bans: StoredBan[];
  won: boolean;
}) {
  const label = teamId === 100 ? "Blue Side" : "Red Side";
  return (
    <div className={styles.team}>
      <div className={styles.teamHeader}>
        <span
          className={`${styles.teamLabel} ${teamId === 100 ? styles.blue : styles.red}`}
        >
          {label}
        </span>
        <span className={`${styles.result} ${won ? styles.win : styles.loss}`}>
          {won ? "Victory" : "Defeat"}
        </span>
      </div>

      {bans.length > 0 && (
        <div className={styles.bans}>
          <span className={styles.bansLabel}>Bans:</span>
          {bans.map((b) => (
            <span key={b.id} className={styles.ban}>
              {b.champion}
            </span>
          ))}
        </div>
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Player</th>
            <th className={styles.th}>Champion</th>
            <th className={styles.th}>K</th>
            <th className={styles.th}>D</th>
            <th className={styles.th}>A</th>
            <th className={styles.th}>KDA</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p) => (
            <tr key={p.id} className={styles.row}>
              <td className={styles.td}>{p.summoner_name}</td>
              <td className={`${styles.td} ${styles.champion}`}>
                {p.champion}
              </td>
              <td className={styles.td}>{p.kills}</td>
              <td className={styles.td}>{p.deaths}</td>
              <td className={styles.td}>{p.assists}</td>
              <td className={`${styles.td} ${styles.kda}`}>
                {kdaRatio(p.kills, p.deaths, p.assists)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function GameDetail({ matchId }: Props) {
  const { detail, loading, error } = useGameDetail(matchId);

  if (!matchId) {
    return (
      <p className={styles.placeholder}>
        Select a game from the list to view details.
      </p>
    );
  }

  if (loading) {
    return <p className={styles.placeholder}>Loading…</p>;
  }

  if (error) {
    return <p className={styles.errorMsg}>{error}</p>;
  }

  if (!detail) return null;

  const { game, players, bans } = detail;
  const numericId = game.match_id.replace("NA1_", "");

  const blueTeam = players.filter((p) => p.team === 100);
  const redTeam = players.filter((p) => p.team === 200);
  const blueBans = bans.filter((b) => b.team === 100);
  const redBans = bans.filter((b) => b.team === 200);
  const blueWon = blueTeam[0]?.win === 1;

  const durationMins = Math.floor(game.game_duration / 60);
  const durationSecs = game.game_duration % 60;
  const dateStr = new Date(game.game_date).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.matchId}>
          Game <span className={styles.mono}>#{numericId}</span>
        </h2>
        <span className={styles.info}>
          {dateStr} · {durationMins}m {durationSecs}s
        </span>
      </div>

      <TeamSection
        teamId={100}
        players={blueTeam}
        bans={blueBans}
        won={blueWon}
      />
      <TeamSection
        teamId={200}
        players={redTeam}
        bans={redBans}
        won={!blueWon}
      />
    </div>
  );
}
