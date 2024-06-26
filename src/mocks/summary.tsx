export const CURRENCY = '$';

export const summaryList = [
  {
    type: 'Net Total',
    value: 135_780.47,
    theme: 'primary' as const,
    trend: 'up' as const,
    percent: 8,
  },
  {
    type: 'Income',
    value: 35_780.47,
    theme: 'success' as const,
    trend: 'up' as const,
    percent: 8,
  },
  {
    type: 'Expenses',
    value: 20_000.47,
    theme: 'danger' as const,
    trend: 'down' as const,
    percent: 8,
  },
  {
    type: 'Investment',
    value: 5_000.47,
    theme: 'purple' as const,
    trend: 'up' as const,
    percent: 8,
  },
  {
    type: 'Savings',
    value: 3_000.47,
    theme: 'sunny' as const,
    trend: 'down' as const,
    percent: 8,
  },
];
