'use server';

import { TransactionError } from '@moneytrack/web/errors/TransactionError';
import { transactionsModel } from '@moneytrack/web/models';
import { moneyAccountModel } from '@moneytrack/shared/models';
import {
  CreateTransactionZodSchema,
  TCreateTransactionTypeSchema,
} from '@moneytrack/web/validators/createTransaction.validator';
import { TransactionTypeIds } from '../../../db/seeders/transaction-types';
import {
  I_DONT_HAVE_MONEY,
  operationsForTransactionTypes,
} from '@moneytrack/web/constants';
import { getAuthSessionInServerAction } from '@moneytrack/web/lib/auth/auth-session-handler';
import { InvalidFieldFormError } from '@moneytrack/web/errors/InvalidFieldFormError';
import { getIncomesAndExpensesRepository } from '@moneytrack/web/repository/sum-transactions';
import { sendEmailWatchingExpenseLimit } from '@moneytrack/shared/use-cases';

export const createTransactionServerAction = async (
  data: TCreateTransactionTypeSchema
) => {
  const validation = CreateTransactionZodSchema.safeParse(data);
  if (!validation.success) {
    throw new InvalidFieldFormError(
      'There was an error: ' + validation.error.issues
    );
  }
  const user = await getAuthSessionInServerAction();

  try {
    const moneyAccount = await moneyAccountModel.findOne({ user });
    if (moneyAccount === undefined) {
      throw new Error("You don't have a money account to do this transaction");
    }
    if (
      moneyAccount?.money === I_DONT_HAVE_MONEY &&
      data.transactionType === TransactionTypeIds.Expense
    ) {
      throw new Error('You don have money to do this transaction');
    }

    const transaction = await transactionsModel.create({ ...data, user });
    const moneyUpdated = operationsForTransactionTypes[data.transactionType]?.(
      moneyAccount.money,
      transaction.price
    );
    if (isNaN(moneyUpdated)) {
      throw new Error('Ocurred an unexpected error doing this transaction');
    }
    const { expenses, incomes } = await getIncomesAndExpensesRepository(user);

    await moneyAccountModel.updateOne(
      { user },
      { money: moneyUpdated, incomes, expenses }
    );

    data.transactionType === TransactionTypeIds.Expense &&
      sendEmailWatchingExpenseLimit(user, transaction.title);
    return {
      message: 'Transaction Created',
      errors: [],
    };
  } catch (error) {
    throw new TransactionError((error as Error).message);
  }
};
