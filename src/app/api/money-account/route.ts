import { ServerError } from '@/errors/ServerError';
import { catchApiError } from '@/lib/api-error-handler';
import { getUserIdFromReq } from '@/lib/auth/auth';
import {
  assertPercentValue,
  computePercent,
} from '@/lib/money-account/settings';
import moneyAccountModel from '@/models/money-account.model';
import { getTotalTransactionTypes } from '@/repository/total-transactions-type';
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

    const { counterExpenses, counterIncomes } = await getTotalTransactionTypes({
      user,
    });

    const expensePercent = computePercent(
      moneyAccount.expenses,
      moneyAccount.expenseLimit
    );
    const incomePercent = computePercent(
      moneyAccount.incomes,
      moneyAccount.incomeGoal
    );

    const response = {
      money: moneyAccount.money,
      user: moneyAccount.user,
      watcherLimit: moneyAccount.watcherLimit,
      expenseLimit: {
        counter: counterExpenses,
        goal: +moneyAccount.expenseLimit,
        currentResult: +moneyAccount.expenses,
        settingValue: assertPercentValue(
          expensePercent,
          moneyAccount.expenseLimit
        ),
      },
      incomeGoal: {
        counter: counterIncomes,
        goal: +moneyAccount.incomeGoal,
        currentResult: +moneyAccount.incomes,
        settingValue: assertPercentValue(
          incomePercent,
          moneyAccount.incomeGoal
        ),
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
