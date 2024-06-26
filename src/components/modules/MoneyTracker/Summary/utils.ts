import { TSummaryTransactionTypes } from '@/types/summary';

const themes = {
  primary: 'black',
  success: '#84cc16',
  danger: '#f43f5e',
  purple: '#8b5cf6',
  sunny: '#eab308',
};

export const processInfoChart = (
  chartInfo: TSummaryTransactionTypes,
  totalValue: number
) => {
  const labels = [];
  const data = [];
  const backgrounds = [];
  for (const { type, value, theme } of chartInfo) {
    labels.push(type);
    data.push((+value * 100) / totalValue);
    backgrounds.push(themes[theme]);
  }
  return { labels, data, backgrounds };
};
