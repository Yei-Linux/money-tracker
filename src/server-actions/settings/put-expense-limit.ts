'use server';

import { InvalidFieldFormError } from '@/errors/InvalidFieldFormError';
import { SettingsError } from '@/errors/SettingsError';
import { getAuthSessionInServerAction } from '@/lib/auth-session-handler';
import { moneyAccountModel } from '@/models';
import {
  ExpenseLimitZodSchema,
  TExpenseLimitSchema,
} from '@/validators/expense-limit.validator';

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
