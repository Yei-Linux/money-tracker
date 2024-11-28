import { catchApiError } from '@moneytrack/web/lib/api-error-handler';
import { getUserIdFromReq } from '@moneytrack/web/lib/auth/auth';
import { getMyPaymentSettings } from '@moneytrack/web/use-cases/settings';
import { NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const user = getUserIdFromReq(req);
    const response = await getMyPaymentSettings(user);

    return NextResponse.json({
      data: response,
      message: 'This is your personal payment settings',
    });
  } catch (error) {
    return catchApiError(error);
  }
};

export const revalidate = 10;
