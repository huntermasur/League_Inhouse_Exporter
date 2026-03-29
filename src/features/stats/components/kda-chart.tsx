import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import type { KdaRow } from '../../../shared/types';
import { CHART_COLORS, AXIS_STYLE, GRID_STYLE, TOOLTIP_STYLE } from './chart-theme';
import shared from './chart-shared.module.css';

interface Props {
  data: KdaRow[];
}

const BAR_WIDTH = 18; // 3 bars per champion, keep them narrow

export function KdaChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className={shared.chartSection}>
        <h3 className={shared.chartTitle}>Champion KDA</h3>
        <p className={shared.empty}>No data yet.</p>
      </div>
    );
  }

  const chartWidth = Math.max(data.length * BAR_WIDTH * 3 + 80, 600);
  const LEGEND_STYLE = { fontSize: 12, color: '#9ca3af' };

  return (
    <div className={shared.chartSection}>
      <h3 className={shared.chartTitle}>Champion KDA</h3>
      <div className={shared.scrollWrapper}>
        <BarChart
          width={chartWidth}
          height={340}
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 70 }}
        >
          <CartesianGrid {...GRID_STYLE} vertical={false} />
          <XAxis
            dataKey="champion"
            angle={-45}
            textAnchor="end"
            interval={0}
            tick={AXIS_STYLE.tick}
            axisLine={AXIS_STYLE.axisLine}
            tickLine={AXIS_STYLE.tickLine}
          />
          <YAxis
            label={{ value: 'Number of Games', angle: -90, position: 'insideLeft', fill: '#9ca3af', fontSize: 11 }}
            tick={AXIS_STYLE.tick}
            axisLine={AXIS_STYLE.axisLine}
            tickLine={AXIS_STYLE.tickLine}
          />
          <Tooltip
            {...TOOLTIP_STYLE}
            formatter={(value, name) => value != null ? [Number(value).toFixed(2), String(name)] : []}
          />
          <Legend
            wrapperStyle={LEGEND_STYLE}
            formatter={(value) => <span style={{ color: '#9ca3af' }}>{value}</span>}
          />
          <Bar dataKey="avg_kills" name="AVERAGE of K" fill={CHART_COLORS.blue} radius={[2, 2, 0, 0]} />
          <Bar dataKey="avg_deaths" name="AVERAGE of D" fill={CHART_COLORS.red} radius={[2, 2, 0, 0]} />
          <Bar dataKey="avg_assists" name="AVERAGE of A" fill={CHART_COLORS.amber} radius={[2, 2, 0, 0]} />
        </BarChart>
      </div>
    </div>
  );
}
