import { transactionsModel } from '@/models';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    const transactions = await transactionsModel.aggregate([
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

    const transactionsResponse = transactions.reduce(
      (acc, transaction) => ({
        ...acc,
        [transaction._id]: transaction.transactions,
      }),
      {}
    );

    return NextResponse.json({
      data: transactionsResponse ?? {},
      message: 'Transactions retrieved successfull',
    });
  } catch (error) {
    return NextResponse.json({
      data: {},
      message: 'There was an error',
    });
  }
};
