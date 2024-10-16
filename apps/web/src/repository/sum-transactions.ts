import { transactionsModel } from '@moneytrack/shared/models';
import { TransactionTypeIds } from '../../db/seeders/transaction-types';
import mongoose from 'mongoose';
import { getStartEndDateByMonth } from '../lib/date';

const getCountFromTransactionAggregate = (transactionRow: any[]): number =>
  !transactionRow.length ? 0 : transactionRow?.[0]?.count;

export const getIncomesAndExpensesRepository = async (
  user: string,
  monthDate: Date
) => {
  const { startDate, endDate } = getStartEndDateByMonth(monthDate);
  const expenses = await transactionsModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
        user: new mongoose.Types.ObjectId(user),
        transactionType: new mongoose.Types.ObjectId(
          TransactionTypeIds.Expense
        ),
      },
    },
    { $group: { _id: null, count: { $sum: '$price' } } },
  ]);
  const incomes = await transactionsModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
        user: new mongoose.Types.ObjectId(user),
        transactionType: new mongoose.Types.ObjectId(TransactionTypeIds.Income),
      },
    },
    { $group: { _id: null, count: { $sum: '$price' } } },
  ]);

  return {
    expenses: +getCountFromTransactionAggregate(expenses),
    incomes: +getCountFromTransactionAggregate(incomes),
  };
};
