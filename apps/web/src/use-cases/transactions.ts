import { TTransactionStats } from '@moneytrack/web/types/transaction-stats';
import { TransactionTypeIds } from '../../db/seeders/transaction-types';

export const getStats = (
  transactionsStats: TTransactionStats,
  totalStats: number
): TTransactionStats => {
  if (transactionsStats.length)
    return [
      ...transactionsStats,
      {
        _id: 'total',
        type: 'Total',
        value: totalStats,
        theme: 'primary',
        length: 1,
      },
    ];

  return [
    {
      _id: TransactionTypeIds.Income,
      type: '↗️ Income',
      value: 0,
      theme: 'success',
      length: 0,
    },
    {
      _id: TransactionTypeIds.Expense,
      type: '↙️ Expense',
      value: 0,
      theme: 'danger',
      length: 0,
    },
    { _id: 'total', type: 'Total', value: 0, theme: 'primary', length: 1 },
  ];
};

const computeTrendingOnTransactionStats = (
  prevStatsByType: number,
  statsByType: number
): TTransactionStats[number]['trend'] => {
  const diff = statsByType - prevStatsByType;
  const percent = ((statsByType - prevStatsByType) / prevStatsByType) * 100;

  return {
    direction: diff >= 0 ? 'up' : 'down',
    percent: isNaN(percent) ? 0 : percent,
  };
};

export const addTrendingFieldsToStats = (
  completedStatsOfThisMonth: TTransactionStats,
  completedStatsOfPrevMonth: TTransactionStats
) => {
  completedStatsOfThisMonth.forEach((stats) => {
    const prevStats = completedStatsOfPrevMonth.find(
      ({ type }) => type === stats.type
    );
    if (!prevStats) return;

    const trending = computeTrendingOnTransactionStats(
      prevStats.value,
      stats.value
    );
    stats['trend'] = trending;
  });

  return completedStatsOfThisMonth;
};
