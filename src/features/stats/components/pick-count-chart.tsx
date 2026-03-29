import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from 'recharts';
import type { PickCountRow } from '../../../shared/types';
import { CHART_COLORS, AXIS_STYLE, GRID_STYLE, TOOLTIP_STYLE, LABEL_STYLE } from './chart-theme';
import shared from './chart-shared.module.css';

interface Props {
  data: PickCountRow[];
}

const BAR_WIDTH = 36;

export function PickCountChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className={shared.chartSection}>
        <h3 className={shared.chartTitle}>Champion Pick Count</h3>
        <p className={shared.empty}>No data yet.</p>
      </div>
    );
  }

  const sorted = [...data].sort((a, b) => b.count - a.count);
  const chartWidth = Math.max(sorted.length * BAR_WIDTH + 80, 500);

  return (
    <div className={shared.chartSection}>
      <h3 className={shared.chartTitle}>Champion Pick Count</h3>
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
            allowDecimals={false}
            label={{ value: 'Number of Games', angle: -90, position: 'insideLeft', fill: '#9ca3af', fontSize: 11 }}
            tick={AXIS_STYLE.tick}
            axisLine={AXIS_STYLE.axisLine}
            tickLine={AXIS_STYLE.tickLine}
          />
          <Tooltip
            {...TOOLTIP_STYLE}
            formatter={(value) => value != null ? [value, 'Games'] : []}
          />
          <Bar dataKey="count" name="Games" fill={CHART_COLORS.blue} radius={[3, 3, 0, 0]}>
            <LabelList dataKey="count" position="top" style={LABEL_STYLE} />
          </Bar>
        </BarChart>
      </div>
    </div>
  );
}
