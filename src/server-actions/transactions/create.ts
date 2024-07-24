'use server';

import { TransactionError } from '@/errors/TransactionError';
import { transactionsModel } from '@/models';
import {
  CreateTransactionZodSchema,
  TCreateTransactionTypeSchema,
} from '@/validators/createTransaction.validator';

export const createTransactionServerAction = async (
  data: TCreateTransactionTypeSchema
) => {
  try {
    const validation = CreateTransactionZodSchema.safeParse(data);
    if (!validation.success) {
      throw new Error('There was an error: ' + validation.error.issues);
    }

    await transactionsModel.create(data);
    return {
      message: 'Transaction Created',
      errors: [],
    };
  } catch (error) {
    throw new TransactionError((error as Error).message);
  }
};
