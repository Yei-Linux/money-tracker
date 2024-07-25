'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { AuthError } from '@/errors/AuthError';
import { TransactionError } from '@/errors/TransactionError';
import { transactionsModel } from '@/models';
import moneyAccountModel from '@/models/money-account.model';
import {
  CreateTransactionZodSchema,
  TCreateTransactionTypeSchema,
} from '@/validators/createTransaction.validator';
import { getServerSession } from 'next-auth';
import { TransactionTypeIds } from '../../../db/seeders/transaction-types';
import { I_DONT_HAVE_MONEY, operationsForTransactionTypes } from '@/constants';

export const createTransactionServerAction = async (
  data: TCreateTransactionTypeSchema
) => {
  const session = await getServerSession(authOptions);
  const user = session?.user.id;
  if (!user) {
    throw new AuthError('You are not logged in');
  }

  try {
    const validation = CreateTransactionZodSchema.safeParse(data);
    if (!validation.success) {
      throw new Error('There was an error: ' + validation.error.issues);
    }

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

    await moneyAccountModel.updateOne({ user }, { money: moneyUpdated });
    return {
      message: 'Transaction Created',
      errors: [],
    };
  } catch (error) {
    throw new TransactionError((error as Error).message);
  }
};
