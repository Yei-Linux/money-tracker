import { ServerError } from '@/errors/ServerError';
import { catchApiError } from '@/lib/api-error-handler';
import { getUserIdFromReq } from '@/lib/auth';
import moneyAccountModel from '@/models/money-account.model';
import { NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const user = getUserIdFromReq(req);
    const moneyAccount = await moneyAccountModel.findOne({ user }).select({
      money: true,
      user: true,
    });
    if (!moneyAccount) {
      throw new ServerError('You dont have any money account asigned yet');
    }

    return NextResponse.json({
      data: moneyAccount,
      message: 'This is your money account',
    });
  } catch (error) {
    return catchApiError(error);
  }
};
