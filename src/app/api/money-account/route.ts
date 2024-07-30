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
      incomes: true,
      expenses: true,
      user: true,
      watcherLimit: true,
      expenseLimit: true,
      incomeGoal: true,
    });
    if (!moneyAccount) {
      throw new ServerError('You dont have any money account asigned yet');
    }

    const expensePercent =
      (+moneyAccount.expenses * 100) / +moneyAccount.expenseLimit;
    const incomePercent =
      (+moneyAccount.incomes * 100) / +moneyAccount.incomeGoal;
    const response = {
      money: moneyAccount.money,
      user: moneyAccount.user,
      watcherLimit: moneyAccount.watcherLimit,
      expenseLimit: {
        goal: +moneyAccount.expenseLimit,
        currentResult: +moneyAccount.expenses,
        settingValue: isNaN(expensePercent) ? 0 : expensePercent,
      },
      incomeGoal: {
        goal: +moneyAccount.incomeGoal,
        currentResult: +moneyAccount.incomes,
        settingValue: isNaN(incomePercent) ? 0 : incomePercent,
      },
    };

    return NextResponse.json({
      data: response,
      message: 'This is your money account',
    });
  } catch (error) {
    return catchApiError(error);
  }
};
