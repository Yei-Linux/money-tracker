import { getStartEndDateByMonth } from '@moneytrack/shared/lib/date';
import { transactionsModel } from '@moneytrack/shared/models';
import { TTransactionStats } from '@moneytrack/web/types/transaction-stats';
import mongoose from 'mongoose';

export const getStatsByMonth = async (
  userId: string,
  monthDate: Date
): Promise<TTransactionStats> => {
  const { startDate, endDate } = getStartEndDateByMonth(monthDate);

  return await transactionsModel.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
        user: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: 'transactiontypes',
        localField: 'transactionType',
        foreignField: '_id',
        as: 'transactionTypeDetails',
      },
    },
    {
      $unwind: '$transactionTypeDetails',
    },
    {
      $group: {
        _id: {
          id: '$transactionTypeDetails._id',
          type: '$transactionTypeDetails.type',
          theme: '$transactionTypeDetails.theme',
        },
        total: { $sum: '$price' },
        length: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: '$_id.id',
        type: '$_id.type',
        value: '$total',
        theme: '$_id.theme',
        length: '$length',
      },
    },
  ]);
};
