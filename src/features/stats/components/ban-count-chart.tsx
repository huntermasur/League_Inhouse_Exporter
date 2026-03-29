import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";
import type { BanCountRow } from "../../../shared/types";
import {
  CHART_COLORS,
  AXIS_STYLE,
  GRID_STYLE,
  TOOLTIP_STYLE,
  LABEL_STYLE,
} from "./chart-theme";
import shared from "./chart-shared.module.css";

interface Props {
  data: BanCountRow[];
}

const BAR_WIDTH = 36;

export function BanCountChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className={shared.chartSection}>
        <h3 className={shared.chartTitle}>Champion Ban Count</h3>
        <p className={shared.empty}>No data yet.</p>
      </div>
    );
  }

  const chartWidth = Math.max(data.length * BAR_WIDTH + 80, 500);

  return (
    <div className={shared.chartSection}>
      <h3 className={shared.chartTitle}>Champion Ban Count</h3>
      <div className={shared.scrollWrapper}>
        <BarChart
          width={chartWidth}
          height={300}
          data={data}
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
            tick={AXIS_STYLE.tick}
            axisLine={AXIS_STYLE.axisLine}
            tickLine={AXIS_STYLE.tickLine}
          />
          <Tooltip {...TOOLTIP_STYLE} />
          <Bar dataKey="count" fill={CHART_COLORS.blue} radius={[3, 3, 0, 0]}>
            <LabelList dataKey="count" position="top" style={LABEL_STYLE} />
          </Bar>
        </BarChart>
      </div>
    </div>
  );
}
