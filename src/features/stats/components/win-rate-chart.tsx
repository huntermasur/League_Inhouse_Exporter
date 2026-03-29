import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import type { WinRateRow } from '../../../shared/types';
import { CHART_COLORS, AXIS_STYLE, GRID_STYLE } from './chart-theme';
import shared from './chart-shared.module.css';

interface Props {
  data: WinRateRow[];
}

const ROW_HEIGHT = 28;

interface TooltipEntry {
  active?: boolean;
  payload?: Array<{ payload: WinRateRow }>;
}

function WinRateTooltip({ active, payload }: TooltipEntry) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: '#111827', border: '1px solid #374151', borderRadius: 6, padding: '8px 12px', fontSize: 12, color: '#f9fafb' }}>
      <p style={{ margin: 0, fontWeight: 600 }}>{d.summoner_name}</p>
      <p style={{ margin: '4px 0 0' }}>Win Rate: {d.rate}% ({d.wins}W / {d.games}G)</p>
    </div>
  );
}

export function WinRateChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className={shared.chartSection}>
        <h3 className={shared.chartTitle}>Histogram of Win %</h3>
        <p className={shared.empty}>No data yet.</p>
      </div>
    );
  }

  const sorted = [...data].sort((a, b) => a.rate - b.rate);
  const chartHeight = Math.max(sorted.length * ROW_HEIGHT + 60, 200);

  return (
    <div className={shared.chartSection}>
      <h3 className={shared.chartTitle}>Histogram of Win %</h3>
      <BarChart
        layout="vertical"
        width={600}
        height={chartHeight}
        data={sorted}
        margin={{ top: 5, right: 50, left: 120, bottom: 5 }}
      >
        <CartesianGrid {...GRID_STYLE} horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 100]}
          tickFormatter={(v: number) => `${v}%`}
          tick={AXIS_STYLE.tick}
          axisLine={AXIS_STYLE.axisLine}
          tickLine={AXIS_STYLE.tickLine}
        />
        <YAxis
          type="category"
          dataKey="summoner_name"
          width={115}
          tick={{ ...AXIS_STYLE.tick, fontSize: 10 }}
          axisLine={AXIS_STYLE.axisLine}
          tickLine={AXIS_STYLE.tickLine}
        />
        <Tooltip content={<WinRateTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
        <Bar dataKey="rate" name="Win %" fill={CHART_COLORS.blue} radius={[0, 3, 3, 0]} />
      </BarChart>
    </div>
  );
}

