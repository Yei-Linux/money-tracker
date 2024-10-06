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

export const putExpenseLimitServerAction = async (
  data: TExpenseLimitSchema
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
    if (moneyAccount.expenses >= data.expenseLimit)
      throw new Error(
        toastMessages.SET_EXPENSE_LIMIT_NEEDS_TO_BE_GREATER_ERROR
      );

    await moneyAccountModel.updateOne(
      {
        user,
      },
      {
        expenseLimit: data.expenseLimit,
      }
    );
  } catch (error) {
    throw new SettingsError((error as Error).message);
  }
};
