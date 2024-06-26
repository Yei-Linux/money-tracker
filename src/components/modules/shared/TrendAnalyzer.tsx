import type { FC } from 'react';

interface ITrendAnalyzer {
  percent: number;
  trend: 'up' | 'down';
}

export const TrendAnalyzer: FC<ITrendAnalyzer> = ({ percent, trend }) => {
  const textTypes = {
    up: '↗️',
    down: '↙️',
  };

  return (
    <p className="text-xs">
      <span>{textTypes[trend]}</span> {percent}% vs last month
    </p>
  );
};
