'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { AuthError } from '@/errors/AuthError';
import { TransactionError } from '@/errors/TransactionError';
import { transactionsModel } from '@/models';
import {
  CreateTransactionZodSchema,
  TCreateTransactionTypeSchema,
} from '@/validators/createTransaction.validator';
import { getServerSession } from 'next-auth';

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

    await transactionsModel.create({ ...data, user });
    return {
      message: 'Transaction Created',
      errors: [],
    };
  } catch (error) {
    throw new TransactionError((error as Error).message);
  }
};
