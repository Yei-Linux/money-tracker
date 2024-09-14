import { transactionsModel } from '@/models';
import { TransactionTypeIds } from '../../db/seeders/transaction-types';
import mongoose from 'mongoose';

const getCountFromTransactionAggregate = (transactionRow: any[]): number =>
  !transactionRow.length ? 0 : transactionRow?.[0]?.count;

export const getIncomesAndExpensesRepository = async (user: string) => {
  const expenses = await transactionsModel.aggregate([
    {
      $match: {
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
        user: new mongoose.Types.ObjectId(user),
        transactionType: new mongoose.Types.ObjectId(TransactionTypeIds.Income),
      },
    },
    { $group: { _id: null, count: { $sum: '$price' } } },
  ]);

  return {
    expenses: getCountFromTransactionAggregate(expenses),
    incomes: getCountFromTransactionAggregate(incomes),
  };
};
