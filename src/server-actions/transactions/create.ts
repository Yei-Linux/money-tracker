'use server';

import { transactionsModel } from '@/models';
import {
  CreateTransactionZodSchema,
  TCreateTransactionTypeSchema,
} from '@/validators/createTransaction.validator';

export const createTransactionServerAction = async (
  data: TCreateTransactionTypeSchema
) => {
  const validation = CreateTransactionZodSchema.safeParse(data);
  if (!validation.success) {
    return {
      message: 'There was an error',
      errors: validation.error.issues,
    };
  }

  await transactionsModel.create(data);
  return {
    message: 'Transaction Created',
    errors: [],
  };
};
