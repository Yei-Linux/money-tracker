import { trendEmojis } from '@moneytrack/web/constants';
import type { FC } from 'react';

interface ITrendAnalyzer {
  percent: number;
  trend: 'up' | 'down';
}

export const TrendAnalyzer: FC<ITrendAnalyzer> = ({ percent, trend }) => {
  return (
    <p className="text-xs">
      <span>{trendEmojis[trend]}</span> {percent}% vs last month
    </p>
  );
};
