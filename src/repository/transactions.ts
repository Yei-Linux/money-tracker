import { transactionsModel } from '@/models';
import { TFilterKeysTransactionsAPI } from '@/types/transactions';

export const getAllTransactionsRepository = async ({
  filters,
  skip,
  limit,
}: {
  filters: {
    $match: {
      $and: {
        $or: Record<TFilterKeysTransactionsAPI, string>[];
      }[];
    };
  }[];

  skip: number;
  limit: number;
}) => {
  const promiseTransactions = transactionsModel.aggregate([
    { $sort: { createdAt: -1 } },

    ...filters,

    { $skip: skip },
    { $limit: limit },

    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'categoryDetails',
      },
    },
    { $unwind: '$categoryDetails' },
    {
      $lookup: {
        from: 'transactiontypes',
        localField: 'transactionType',
        foreignField: '_id',
        as: 'transactionTypeDetails',
      },
    },
    { $unwind: '$transactionTypeDetails' },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        transactions: {
          $push: {
            _id: '$_id',
            title: '$title',
            description: '$description',
            price: '$price',
            category: '$categoryDetails',
            transactionType: '$transactionTypeDetails',
            createdAt: '$createdAt',
          },
        },
      },
    },
  ]);
  const promiseCounter = transactionsModel.aggregate([
    ...filters,
    {
      $count: 'totalCount',
    },
  ]);
  const [transactions, counter] = await Promise.all([
    promiseTransactions,
    promiseCounter,
  ]);

  const totalDocuments = counter[0]?.totalCount || 0;
  const nextCursor = skip + limit < totalDocuments;

  return { transactions, nextCursor };
};
