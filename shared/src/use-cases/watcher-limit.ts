import {
  expenseLimitEmailTemplate,
  WATCHER_LIMIT_SUBJECTS,
} from '../constants';
import { getExpenseByUser } from '../helpers';
import { sendGridProxy } from '../lib';
import { userModel } from '../models';

export const sendEmailWatchingExpenseLimit = async (
  user: string,
  transactionExpenseName?: string
) => {
  const expense = await getExpenseByUser(user);
  const percentOfExpenseLimit = expense.percent;

  if (percentOfExpenseLimit <= 50) return;

  const userFound = await userModel.findById(user);
  if (!userFound) throw new Error('User not found');

  const messageBody = expenseLimitEmailTemplate({
    userName: userFound.name,
    monthExpenses: expense.expensesOfMonth,
    percentExpensesLimit: percentOfExpenseLimit,
    transactionExpenseName,
  });

  await sendGridProxy().send(
    userFound.email,
    messageBody,
    WATCHER_LIMIT_SUBJECTS.AFTER_EXPENSE_DONE
  );
};
