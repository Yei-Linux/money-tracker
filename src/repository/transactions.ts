import { transactionsModel } from '@/models';
import { TFilterKeys } from '@/store/transactions';

export const getAllTransactionsRepository = async ({
  filters,
  skip,
  limit,
}: {
  filters: {
    $match: {
      $and: {
        $or: Record<TFilterKeys, string>[];
      }[];
    };
  }[];

  skip: number;
  limit: number;
}) => {
  return await transactionsModel.aggregate([
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
};
