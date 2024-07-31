'use server';

import { InvalidFieldFormError } from '@/errors/InvalidFieldFormError';
import { SettingsError } from '@/errors/SettingsError';
import { getAuthSessionInServerAction } from '@/lib/auth-session-handler';
import { moneyAccountModel } from '@/models';
import {
  IncomesGoalZodSchema,
  TIncomesGoalSchema,
} from '@/validators/incomes-goal.validator';

export const putIncomesGoalServerAction = async (data: TIncomesGoalSchema) => {
  const validation = IncomesGoalZodSchema.safeParse(data);
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
        incomeGoal: data.incomesGoal,
      }
    );
  } catch (error) {
    throw new SettingsError((error as Error).message);
  }
};
