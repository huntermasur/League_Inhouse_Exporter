import { StatsDashboard } from '../features/stats';

export function StatsPage() {
  return (
    <div>
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          margin: '0 0 1.5rem',
        }}
      >
        Stats
      </h2>
      <StatsDashboard />
    </div>
  );
}
