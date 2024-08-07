'use server';

import { TransactionError } from '@/errors/TransactionError';
import { transactionsModel } from '@/models';
import moneyAccountModel from '@/models/money-account.model';
import {
  CreateTransactionZodSchema,
  TCreateTransactionTypeSchema,
} from '@/validators/createTransaction.validator';
import { TransactionTypeIds } from '../../../db/seeders/transaction-types';
import { I_DONT_HAVE_MONEY, operationsForTransactionTypes } from '@/constants';
import { getAuthSessionInServerAction } from '@/lib/auth/auth-session-handler';
import { InvalidFieldFormError } from '@/errors/InvalidFieldFormError';
import { getIncomesAndExpensesRepository } from '@/repository/sum-transactions';

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
    return {
      message: 'Transaction Created',
      errors: [],
    };
  } catch (error) {
    throw new TransactionError((error as Error).message);
  }
};
