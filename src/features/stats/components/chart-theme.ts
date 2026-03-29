export const CHART_COLORS = {
  blue: '#5b9cf6',
  red: '#f6706a',
  amber: '#c9853a',
  green: '#34d399',
  purple: '#a78bfa',
  teal: '#2dd4bf',
} as const;

export const AXIS_STYLE = {
  tick: { fill: '#9ca3af', fontSize: 11 },
  axisLine: { stroke: '#374151' },
  tickLine: { stroke: '#374151' },
};

export const GRID_STYLE = {
  stroke: '#1f2937',
  strokeDasharray: '3 3',
};

export const LABEL_STYLE = {
  fill: '#e5e7eb',
  fontSize: 11,
};

export const TOOLTIP_STYLE = {
  contentStyle: {
    background: '#111827',
    border: '1px solid #374151',
    borderRadius: 6,
    fontSize: 12,
    color: '#f9fafb',
  },
  cursor: { fill: 'rgba(255,255,255,0.04)' },
};
