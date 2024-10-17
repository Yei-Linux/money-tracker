import { assertPercentValue, computePercent } from './settings';
import { moneyAccountModel } from '../models';
import { getIncomesAndExpensesRepositoryByMonth } from '../repositories/sum-transactions';
import { getExpenseLimitIncomeGoalsByMonth } from '../repositories/money-settings';

export const getExpenseByUser = async (
  user: string
): Promise<{ percent: number; expensesOfMonth: number }> => {
  const moneyAccount = await moneyAccountModel.findOne({ user });
  if (!moneyAccount) {
    throw new Error('You dont have any money account asigned yet');
  }

  const currentMonth = new Date();

  const { expenses } = await getIncomesAndExpensesRepositoryByMonth(
    user,
    currentMonth
  );
  const { expenseLimit } = await getExpenseLimitIncomeGoalsByMonth(
    moneyAccount._id,
    currentMonth
  );

  const expensePercent = computePercent(expenses, expenseLimit);

  const percent = assertPercentValue(expensePercent, expenseLimit) ?? 0;
  const expensesOfMonth = expenses;

  return { percent, expensesOfMonth };
};
