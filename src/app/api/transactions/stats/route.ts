import { getStatsOfMonth } from '@/repository/stats';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    const transactionsStats = await getStatsOfMonth();

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
