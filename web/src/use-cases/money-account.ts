import { ServerError } from "@/errors/ServerError";
import {
  assertPercentValue,
  computePercent,
} from "@/helpers/money-account/settings";
import { moneyAccountModel } from "@/models";
import { getTotalTransactionTypes } from "@/repository/total-transactions-type";
import mongoose from "mongoose";

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

export const getSettingsMoneyAccount = async (user: string) => {
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
    throw new ServerError("You dont have any money account asigned yet");
  }

  const expensePercent = computePercent(
    moneyAccount.expenses,
    moneyAccount.expenseLimit
  );
  const incomePercent = computePercent(
    moneyAccount.incomes,
    moneyAccount.incomeGoal
  );

  const { counterExpenses, counterIncomes } = await getTotalTransactionTypes({
    user,
  });

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
      settingValue: assertPercentValue(incomePercent, moneyAccount.incomeGoal),
    },
  };

  return response;
};
