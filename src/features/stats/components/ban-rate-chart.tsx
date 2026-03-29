import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from 'recharts';
import type { BanRateRow } from '../../../shared/types';
import { CHART_COLORS, AXIS_STYLE, GRID_STYLE, TOOLTIP_STYLE, LABEL_STYLE } from './chart-theme';
import shared from './chart-shared.module.css';

interface Props {
  data: BanRateRow[];
}

const BAR_WIDTH = 36;

export function BanRateChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className={shared.chartSection}>
        <h3 className={shared.chartTitle}>Champion Ban Rate</h3>
        <p className={shared.empty}>No data yet.</p>
      </div>
    );
  }

  const sorted = [...data].sort((a, b) => b.rate - a.rate);
  const chartWidth = Math.max(sorted.length * BAR_WIDTH + 80, 500);

  return (
    <div className={shared.chartSection}>
      <h3 className={shared.chartTitle}>Champion Ban Rate</h3>
      <div className={shared.scrollWrapper}>
        <BarChart
          width={chartWidth}
          height={300}
          data={sorted}
          margin={{ top: 20, right: 20, left: 0, bottom: 60 }}
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
            tickFormatter={(v: number) => `${v}%`}
            domain={[0, 100]}
            tick={AXIS_STYLE.tick}
            axisLine={AXIS_STYLE.axisLine}
            tickLine={AXIS_STYLE.tickLine}
          />
          <Tooltip
            {...TOOLTIP_STYLE}
            formatter={(value) => value != null ? [`${value}%`, 'Ban Rate'] : []}
          />
          <Bar dataKey="rate" fill={CHART_COLORS.blue} radius={[3, 3, 0, 0]}>
            <LabelList dataKey="rate" position="top" style={LABEL_STYLE} formatter={(v) => v != null ? `${v}%` : ''} />
          </Bar>
        </BarChart>
      </div>
    </div>
  );
}
