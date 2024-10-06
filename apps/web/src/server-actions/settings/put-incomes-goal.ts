'use server';

import { InvalidFieldFormError } from '@moneytrack/web/errors/InvalidFieldFormError';
import { SettingsError } from '@moneytrack/web/errors/SettingsError';
import { getAuthSessionInServerAction } from '@moneytrack/web/lib/auth/auth-session-handler';
import { moneyAccountModel } from '@moneytrack/shared/models';
import {
  IncomesGoalZodSchema,
  TIncomesGoalSchema,
} from '@moneytrack/web/validators/incomes-goal.validator';
import { toastMessages } from '@moneytrack/shared/constants';

export const putIncomesGoalServerAction = async (data: TIncomesGoalSchema) => {
  const validation = IncomesGoalZodSchema.safeParse(data);
  if (!validation.success) {
    throw new InvalidFieldFormError(
      `There was an error: ${validation.error.issues}`
    );
  }
  const user = await getAuthSessionInServerAction();

  try {
    const moneyAccount = await moneyAccountModel.findOne({ user });
    if (!moneyAccount)
      throw new Error(toastMessages.SET_INCOME_GOAL_NOT_MONEY_ERROR);
    if (moneyAccount.incomes >= data.incomesGoal)
      throw new Error(toastMessages.SET_INCOME_GOAL_NEEDS_TO_BE_GREATER_ERROR);
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
