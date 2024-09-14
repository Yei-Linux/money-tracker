import { TTransactionStats } from '@moneytrack/web/types/transaction-stats';
import { TransactionTypeIds } from '../../../../../../db/seeders/transaction-types';

export const pickIncomesAndExpenses = (
  transactionStats: TTransactionStats | undefined
) => {
  if (!transactionStats) return { expenses: 0, incomes: 0 };

  const expense = transactionStats.find(
    ({ _id }) => TransactionTypeIds.Expense === _id
  );
  const income = transactionStats.find(
    ({ _id }) => TransactionTypeIds.Income === _id
  );

  return { expenses: expense?.length ?? 0, incomes: income?.length ?? 0 };
};
