import { TTransactionStats } from '@moneytrack/web/types/transaction-stats';

const themes = {
  primary: 'black',
  success: '#84cc16',
  danger: '#f43f5e',
  purple: '#8b5cf6',
  sunny: '#eab308',
};

export type TThemes = keyof typeof themes;

export const processInfoChart = (
  chartInfo: TTransactionStats,
  totalValue: number
) => {
  const labels = [];
  const data = [];
  const backgrounds = [];
  for (const { type, value, theme } of chartInfo) {
    labels.push(type);
    data.push(value ? (+value * 100) / totalValue : 0);
    backgrounds.push(themes[theme as TThemes]);
  }
  return { labels, data, backgrounds };
};
