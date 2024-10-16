import { catchApiError } from '@moneytrack/web/lib/api-error-handler';
import { getUserIdFromReq } from '@moneytrack/web/lib/auth/auth';
import { getMonthDateFromRequest } from '@moneytrack/web/lib/utils';
import { getSettingsMoneyAccountByMonth } from '@moneytrack/web/use-cases';
import { NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const monthDate = getMonthDateFromRequest(req);
    const user = getUserIdFromReq(req);
    const response = await getSettingsMoneyAccountByMonth(user, monthDate);

    return NextResponse.json({
      data: response,
      message: 'This is your money account',
    });
  } catch (error) {
    return catchApiError(error);
  }
};
