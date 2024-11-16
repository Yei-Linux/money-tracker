import { catchApiError } from '@moneytrack/web/lib/api-error-handler';
import { getUserIdFromReq } from '@moneytrack/web/lib/auth/auth';
import { getMySettings } from '@moneytrack/web/use-cases/settings';
import { NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const user = getUserIdFromReq(req);
    const response = await getMySettings(user);

    return NextResponse.json({
      data: response,
      message: 'This is your personal settings',
    });
  } catch (error) {
    return catchApiError(error);
  }
};
