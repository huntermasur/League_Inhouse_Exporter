import { useStats } from '../hooks/use-stats';
import { BanCountChart } from './ban-count-chart';
import { BanDistributionChart } from './ban-distribution-chart';
import { BanRateChart } from './ban-rate-chart';
import { PickCountChart } from './pick-count-chart';
import { KdaChart } from './kda-chart';
import { GamesParticipatedChart } from './games-participated-chart';
import { WinRateChart } from './win-rate-chart';
import styles from './stats-dashboard.module.css';

export function StatsDashboard() {
  const { stats, loading, error } = useStats();

  if (loading) {
    return <p className={styles.status}>Loading stats…</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!stats || stats.totalGames === 0) {
    return (
      <p className={styles.status}>
        No games in the database yet. Add some games to see stats.
      </p>
    );
  }

  return (
    <div className={styles.grid}>
      <GamesParticipatedChart data={stats.gamesParticipated} />
      <WinRateChart data={stats.winRate} />
      <BanCountChart data={stats.banCount} />
      <BanDistributionChart data={stats.banCount} />
      <BanRateChart data={stats.banRate} />
      <PickCountChart data={stats.pickCount} />
      <KdaChart data={stats.kda} />
    </div>
  );
}
