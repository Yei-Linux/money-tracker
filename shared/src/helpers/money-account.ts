import { assertPercentValue, computePercent } from './settings';
import { moneyAccountModel } from '../models';

export const getExpenseByUser = async (
  user: string
): Promise<{ percent: number; expensesOfMonth: number }> => {
  const moneyAccount = await moneyAccountModel.findOne({ user }).select({
    money: true,
    incomes: true,
    expenses: true,
    user: true,
    watcherLimit: true,
    expenseLimit: true,
  });

  if (!moneyAccount) {
    throw new Error('You dont have any money account asigned yet');
  }

  const expensePercent = computePercent(
    moneyAccount.expenses,
    moneyAccount.expenseLimit
  );

  const percent =
    assertPercentValue(expensePercent, moneyAccount.expenseLimit) ?? 0;
  const expensesOfMonth = moneyAccount.expenses;

  return { percent, expensesOfMonth };
};
