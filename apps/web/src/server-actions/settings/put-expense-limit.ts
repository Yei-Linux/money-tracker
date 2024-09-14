'use server';

import { InvalidFieldFormError } from '@moneytrack/web/errors/InvalidFieldFormError';
import { SettingsError } from '@moneytrack/web/errors/SettingsError';
import { getAuthSessionInServerAction } from '@moneytrack/web/lib/auth/auth-session-handler';
import { moneyAccountModel } from '@moneytrack/web/models';
import {
  ExpenseLimitZodSchema,
  TExpenseLimitSchema,
} from '@moneytrack/web/validators/expense-limit.validator';

export const putExpenseLimitServerAction = async (
  data: TExpenseLimitSchema
) => {
  const validation = ExpenseLimitZodSchema.safeParse(data);
  if (!validation.success) {
    throw new InvalidFieldFormError(
      'There was an error: ' + validation.error.issues
    );
  }
  const user = await getAuthSessionInServerAction();

  try {
    const moneyAccount = await moneyAccountModel.findOne({ user });
    if (!moneyAccount) throw new Error('You dont have a money account');
    if (moneyAccount.expenses >= data.expenseLimit)
      throw new Error(
        'Your expense limit needs to be greater than your current expenses'
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
