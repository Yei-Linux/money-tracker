import { catchApiError } from '@moneytrack/web/lib/api-error-handler';
import { getUserIdFromReq } from '@moneytrack/web/lib/auth/auth';
import { getStatsOfMonth } from '@moneytrack/web/repository/stats';
import { getStats } from '@moneytrack/web/use-cases/transactions';
import { NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const userId = getUserIdFromReq(req);
    const transactionsStats = await getStatsOfMonth(userId);

    const totalStats = transactionsStats.reduce((acc, item) => {
      return acc + item.value;
    }, 0);

    const completedStats = getStats(transactionsStats, totalStats);

    return NextResponse.json({
      data: completedStats,
      message: 'Transactions Stats',
    });
  } catch (error) {
    return catchApiError(error);
  }
};
