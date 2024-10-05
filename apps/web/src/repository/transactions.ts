import { transactionsModel } from '@moneytrack/shared/models';
import { Pagination } from '@moneytrack/web/types/@shared/pagination';
import { TFilterKeysTransactionsAPI } from '@moneytrack/web/types/transactions';

export const getAllSimpleTransactionsRepository = async ({
  skip,
  limit,
  filters,
}: Pagination<{
  $and: {
    $or: Record<TFilterKeysTransactionsAPI, string>[];
  }[];
}>) => {
  const promiseTransactions = transactionsModel
    .find({ ...filters })
    .select({
      _id: true,
      title: true,
      description: true,
      price: true,
      category: true,
      transactionType: true,
      createdAt: true,
    })
    .populate('category', '_id category')
    .populate('transactionType', '_id type')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  const promiseCounter = transactionsModel.countDocuments({ ...filters });

  const [transactions, totalDocuments] = await Promise.all([
    promiseTransactions,
    promiseCounter,
  ]);
  const nextCursor = skip + limit < totalDocuments;

  return { transactions, nextCursor };
};

export const getAllTransactionsRepository = async ({
  filters,
  skip,
  limit,
}: Pagination<
  {
    $match: {
      $and: {
        $or: Record<TFilterKeysTransactionsAPI, string>[];
      }[];
    };
  }[]
>) => {
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
