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
