import { transactionsModel } from '@moneytrack/shared/models';
import mongoose from 'mongoose';
import { TransactionTypeIds } from '../../db/seeders/transaction-types';
import { getStartEndDateByMonth } from '../lib/date';

type GetTotalTransactionTypes = {
  user: string;
  monthDate: Date;
};

export const getTotalTransactionTypesByMonth = async ({
  user,
  monthDate,
}: GetTotalTransactionTypes) => {
  const { startDate, endDate } = getStartEndDateByMonth(monthDate);

  const counterIncomes = await transactionsModel.countDocuments({
    createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
    user: new mongoose.Types.ObjectId(user),
    transactionType: new mongoose.Types.ObjectId(TransactionTypeIds.Income),
  });
  const counterExpenses = await transactionsModel.countDocuments({
    createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
    user: new mongoose.Types.ObjectId(user),
    transactionType: new mongoose.Types.ObjectId(TransactionTypeIds.Expense),
  });

  return { counterIncomes, counterExpenses };
};
