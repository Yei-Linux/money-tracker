'use server';

import { InvalidFieldFormError } from '@moneytrack/web/errors/InvalidFieldFormError';
import { SettingsError } from '@moneytrack/web/errors/SettingsError';
import { getAuthSessionInServerAction } from '@moneytrack/web/lib/auth/auth-session-handler';
import { moneyAccountModel } from '@moneytrack/shared/models';
import {
  ExpenseLimitZodSchema,
  TExpenseLimitSchema,
} from '@moneytrack/web/validators/expense-limit.validator';
import { toastMessages } from '@moneytrack/shared/constants';
import { getIncomesAndExpensesRepositoryByMonth } from '@moneytrack/shared/repositories/sum-transactions';
import { upsertExpenseLimitOrIncomeGoalByMonth } from '@moneytrack/shared/repositories/money-settings';

export const putExpenseLimitServerAction = async (
  data: TExpenseLimitSchema,
  monthDate: Date
) => {
  const validation = ExpenseLimitZodSchema.safeParse(data);
  if (!validation.success) {
    throw new InvalidFieldFormError(
      `There was an error: ${validation.error.issues}`
    );
  }
  const user = await getAuthSessionInServerAction();

  try {
    const moneyAccount = await moneyAccountModel.findOne({ user });
    if (!moneyAccount)
      throw new Error(toastMessages.SET_EXPENSE_LIMIT_NOT_MONEY_ERROR);

    const { expenses } = await getIncomesAndExpensesRepositoryByMonth(
      user,
      monthDate
    );
    if (expenses >= data.expenseLimit)
      throw new Error(
        toastMessages.SET_EXPENSE_LIMIT_NEEDS_TO_BE_GREATER_ERROR
      );

    await upsertExpenseLimitOrIncomeGoalByMonth(
      moneyAccount._id,
      monthDate,
      'expenseLimit',
      data.expenseLimit
    );
  } catch (error) {
    throw new SettingsError((error as Error).message);
  }
};
