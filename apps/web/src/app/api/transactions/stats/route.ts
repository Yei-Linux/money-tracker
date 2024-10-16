import { catchApiError } from '@moneytrack/web/lib/api-error-handler';
import { getUserIdFromReq } from '@moneytrack/web/lib/auth/auth';
import { getMonthDateFromRequest } from '@moneytrack/web/lib/utils';
import { getStatsByMonth } from '@moneytrack/web/repository/stats';
import { getStats } from '@moneytrack/web/use-cases/transactions';
import { NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const monthDate = getMonthDateFromRequest(req);
    const userId = getUserIdFromReq(req);
    const transactionsStats = await getStatsByMonth(userId, monthDate);

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
