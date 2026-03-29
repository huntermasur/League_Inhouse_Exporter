import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import type { BanCountRow } from '../../../shared/types';
import { TOOLTIP_STYLE } from './chart-theme';
import shared from './chart-shared.module.css';

interface Props {
  data: BanCountRow[];
}

// A blue-toned palette with enough variety for many slices
const PIE_COLORS = [
  '#5b9cf6', '#34d399', '#a78bfa', '#f6706a', '#2dd4bf',
  '#fbbf24', '#60a5fa', '#f472b6', '#6ee7b7', '#818cf8',
  '#fb923c', '#4ade80', '#c084fc', '#38bdf8', '#facc15',
  '#e879f9', '#34d399', '#f87171', '#a3e635', '#fb7185',
];

export function BanDistributionChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className={shared.chartSection}>
        <h3 className={shared.chartTitle}>Champion Ban Distribution</h3>
        <p className={shared.empty}>No data yet.</p>
      </div>
    );
  }

  const total = data.reduce((sum, d) => sum + d.count, 0);
  const pieData = data.map((d) => ({
    name: d.champion,
    value: d.count,
    pct: ((d.count / total) * 100).toFixed(1),
  }));

  return (
    <div className={shared.chartSection}>
      <h3 className={shared.chartTitle}>Champion Ban Distribution</h3>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <PieChart width={620} height={380}>
          <Pie
            data={pieData}
            cx={300}
            cy={180}
            outerRadius={150}
            dataKey="value"
            label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(1)}%`}
            labelLine={true}
          >
            {pieData.map((_, i) => (
              <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            {...TOOLTIP_STYLE}
            formatter={(value, name) => value != null ? [`${value} bans`, String(name)] : []}
          />
        </PieChart>
      </div>
    </div>
  );
}
