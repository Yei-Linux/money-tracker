'use server';

import { TransactionError } from '@moneytrack/web/errors/TransactionError';
import {
  moneyAccountModel,
  transactionsModel,
} from '@moneytrack/shared/models';
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
import { sendEmailWatchingExpenseLimit } from '@moneytrack/shared/use-cases';
import { toastMessages } from '@moneytrack/shared/constants';

export const createTransactionServerAction = async (
  data: TCreateTransactionTypeSchema
) => {
  const validation = CreateTransactionZodSchema.safeParse(data);
  if (!validation.success) {
    throw new InvalidFieldFormError(
      `There was an error: ${validation.error.issues}`
    );
  }
  const user = await getAuthSessionInServerAction();

  try {
    const moneyAccount = await moneyAccountModel.findOne({ user });
    if (moneyAccount === undefined) {
      throw new Error(
        toastMessages.CREATE_TRANSACTION_ERROR_WHEN_YOU_DONT_HAVE_MONEY_ACCOUNT
      );
    }
    if (
      moneyAccount?.money === I_DONT_HAVE_MONEY &&
      data.transactionType === TransactionTypeIds.Expense
    ) {
      throw new Error(
        toastMessages.CREATE_TRANSACTION_ERROR_WHEN_YOU_DONT_HAVE_ENOUGH_MONEY
      );
    }

    const transaction = await transactionsModel.create({ ...data, user });
    const moneyUpdated = operationsForTransactionTypes[data.transactionType]?.(
      moneyAccount.money,
      transaction.price
    );
    if (isNaN(moneyUpdated)) {
      throw new Error(
        toastMessages.CREATE_TRANSACTION_ERROR_WHEN_GENERAL_ERROR_HAPPENED
      );
    }

    await moneyAccountModel.updateOne({ user }, { money: moneyUpdated });

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
