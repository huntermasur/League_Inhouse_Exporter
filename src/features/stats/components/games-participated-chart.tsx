import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import type { GamesParticipatedRow } from "../../../shared/types";
import {
  CHART_COLORS,
  AXIS_STYLE,
  GRID_STYLE,
  TOOLTIP_STYLE,
} from "./chart-theme";
import shared from "./chart-shared.module.css";

interface Props {
  data: GamesParticipatedRow[];
}

const ROW_HEIGHT = 28;

export function GamesParticipatedChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className={shared.chartSection}>
        <h3 className={shared.chartTitle}>Histogram of Games Participated</h3>
        <p className={shared.empty}>No data yet.</p>
      </div>
    );
  }

  const sorted = [...data].sort((a, b) => a.count - b.count);
  const chartHeight = Math.max(sorted.length * ROW_HEIGHT + 60, 200);

  return (
    <div className={shared.chartSection}>
      <h3 className={shared.chartTitle}>Histogram of Games Participated</h3>
      <BarChart
        layout="vertical"
        width={600}
        height={chartHeight}
        data={sorted}
        margin={{ top: 5, right: 40, left: 120, bottom: 5 }}
      >
        <CartesianGrid {...GRID_STYLE} horizontal={false} />
        <XAxis
          type="number"
          allowDecimals={false}
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
        <Tooltip
          {...TOOLTIP_STYLE}
          formatter={(value) => (value != null ? [value, "Games"] : [])}
        />
        <Bar
          dataKey="count"
          name="Games"
          fill={CHART_COLORS.blue}
          radius={[0, 3, 3, 0]}
        />
      </BarChart>
    </div>
  );
}
