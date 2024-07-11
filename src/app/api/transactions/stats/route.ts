import { firstDayOfMonth } from '@/lib/date';
import { transactionsModel } from '@/models';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    const transactionsStats = await transactionsModel.aggregate([
      {
        $match: { createdAt: { $gte: new Date(firstDayOfMonth()) } },
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
        },
      },
      {
        $project: {
          _id: '$_id.id',
          type: '$_id.type',
          value: '$total',
          theme: '$_id.theme',
        },
      },
    ]);
    const totalStats = transactionsStats.reduce((acc, item) => {
      return acc + item.value;
    }, 0);

    const completedStats = [
      ...transactionsStats,
      { _id: 'total', type: 'Total', value: totalStats, theme: 'primary' },
    ];

    return NextResponse.json({
      data: completedStats,
      message: 'Transactions Stats',
    });
  } catch (error) {
    return NextResponse.json({ message: 'There was an error' });
  }
};
