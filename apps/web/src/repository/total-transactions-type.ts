import { transactionsModel } from '@moneytrack/web/models';
import mongoose from 'mongoose';
import { TransactionTypeIds } from '../../db/seeders/transaction-types';

type GetTotalTransactionTypes = {
  user: string;
};

export const getTotalTransactionTypes = async ({
  user,
}: GetTotalTransactionTypes) => {
  const counterIncomes = await transactionsModel.countDocuments({
    user: new mongoose.Types.ObjectId(user),
    transactionType: new mongoose.Types.ObjectId(TransactionTypeIds.Income),
  });
  const counterExpenses = await transactionsModel.countDocuments({
    user: new mongoose.Types.ObjectId(user),
    transactionType: new mongoose.Types.ObjectId(TransactionTypeIds.Expense),
  });

  return { counterIncomes, counterExpenses };
};
