import { catchApiError } from '@/lib/api-error-handler';
import { getUserIdFromReq } from '@/lib/auth/auth';
import { getStatsOfMonth } from '@/repository/stats';
import { NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const userId = getUserIdFromReq(req);
    const transactionsStats = await getStatsOfMonth(userId);

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
    return catchApiError(error);
  }
};
