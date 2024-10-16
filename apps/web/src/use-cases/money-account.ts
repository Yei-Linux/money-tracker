import { assertPercentValue, computePercent } from '@moneytrack/shared/helpers';
import { ServerError } from '@moneytrack/web/errors/ServerError';
import { moneyAccountModel } from '@moneytrack/shared/models';
import { getTotalTransactionTypesByMonth } from '@moneytrack/web/repository/total-transactions-type';
import mongoose from 'mongoose';
import { getIncomesAndExpensesRepository } from '../repository/sum-transactions';

export const createMoneyAccountIfIsNewUser = async (userId: string) => {
  try {
    const moneyAccount = await moneyAccountModel.findOne({
      user: new mongoose.Types.ObjectId(userId),
    });
    if (moneyAccount) return;

    await moneyAccountModel.create({
      money: 0,
      user: userId,
    });
  } catch (error) {
    console.error((error as Error).message);
  }
};

export const getSettingsMoneyAccountByMonth = async (
  user: string,
  monthDate: Date
) => {
  const moneyAccount = await moneyAccountModel.findOne({ user }).select({
    money: true,
    user: true,
    watcherLimit: true,
    expenseLimit: true,
    incomeGoal: true,
  });

  if (!moneyAccount) {
    throw new ServerError('You dont have any money account asigned yet');
  }

  const { expenses, incomes } = await getIncomesAndExpensesRepository(
    user,
    monthDate
  );

  const expensePercent = computePercent(expenses, moneyAccount.expenseLimit);
  const incomePercent = computePercent(incomes, moneyAccount.incomeGoal);

  const { counterExpenses, counterIncomes } =
    await getTotalTransactionTypesByMonth({
      user,
      monthDate,
    });

  const response = {
    money: moneyAccount.money,
    user: moneyAccount.user,
    watcherLimit: moneyAccount.watcherLimit,
    expenseLimit: {
      counter: counterExpenses,
      goal: +moneyAccount.expenseLimit,
      currentResult: expenses,
      settingValue: assertPercentValue(
        expensePercent,
        moneyAccount.expenseLimit
      ),
    },
    incomeGoal: {
      counter: counterIncomes,
      goal: +moneyAccount.incomeGoal,
      currentResult: incomes,
      settingValue: assertPercentValue(incomePercent, moneyAccount.incomeGoal),
    },
  };

  return response;
};
