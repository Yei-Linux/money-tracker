import { getPreviousMonthDate } from '@moneytrack/shared/lib/date';
import { catchApiError } from '@moneytrack/web/lib/api-error-handler';
import { getUserIdFromReq } from '@moneytrack/web/lib/auth/auth';
import { getMonthDateFromRequest } from '@moneytrack/web/lib/utils';
import { getStatsByMonth } from '@moneytrack/web/repository/stats';
import {
  addTrendingFieldsToStats,
  getStats,
} from '@moneytrack/web/use-cases/transactions';
import { NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const monthDate = getMonthDateFromRequest(req);
    const previousMonthDate = getPreviousMonthDate(monthDate);
    const userId = getUserIdFromReq(req);

    const transactionsStatsOfPreviousMonth = await getStatsByMonth(
      userId,
      previousMonthDate
    );
    const transactionsStats = await getStatsByMonth(userId, monthDate);

    const prevTotalStats = transactionsStatsOfPreviousMonth.reduce(
      (acc, item) => {
        return acc + item.value;
      },
      0
    );
    const totalStats = transactionsStats.reduce((acc, item) => {
      return acc + item.value;
    }, 0);

    const completedStatsOfPrevMonth = getStats(
      transactionsStatsOfPreviousMonth,
      totalStats
    );
    const completedStats = getStats(transactionsStats, prevTotalStats);

    const completedStatsWithTrending = addTrendingFieldsToStats(
      completedStats,
      completedStatsOfPrevMonth
    );

    return NextResponse.json({
      data: completedStatsWithTrending,
      message: 'Transactions Stats',
    });
  } catch (error) {
    return catchApiError(error);
  }
};
