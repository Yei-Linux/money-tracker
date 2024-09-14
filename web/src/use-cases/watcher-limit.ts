import { expenseLimitEmailTemplate } from "@/constants/templates";
import { getSettingsMoneyAccount } from "./money-account";
import userModel from "@/models/auth/user.model";
import { sendGridProxy } from "@/lib/send-grid";
import { WATCHER_LIMIT_SUBJECTS } from "@/constants/watcher-limit";
import { getAllUsersBy } from "@/repository/users";

export const sendEmailWatchingExpenseLimit = async (
  user: string,
  transactionExpenseName?: string
) => {
  const userMoneySettings = await getSettingsMoneyAccount(user);
  const percentOfExpenseLimit = userMoneySettings.expenseLimit.currentResult;

  if (percentOfExpenseLimit <= 50) return;

  const userFound = await userModel.findById(user);
  if (!userFound) throw new Error("User not found");

  const messageBody = expenseLimitEmailTemplate({
    userName: userFound.name,
    monthExpenses: userMoneySettings.expenseLimit.currentResult,
    percentExpensesLimit: percentOfExpenseLimit,
    transactionExpenseName,
  });

  sendGridProxy().send(
    userFound.email,
    messageBody,
    WATCHER_LIMIT_SUBJECTS.AFTER_EXPENSE_DONE
  );
};

export const sendBulkEmailsToAllUsersOnWeekend = async () => {
  const allUsers = await getAllUsersBy();

  for (let { _id } of allUsers) {
    await sendEmailWatchingExpenseLimit(_id);
  }
};
