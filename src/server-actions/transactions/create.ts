'use server';

import { TCreateTransactionTypeSchema } from '@/validators/createTransaction.validator';

export const createTransactionServerAction = async (
  data: TCreateTransactionTypeSchema
) => {
  console.log('test', data);

  return {
    message: 'Transaction Created',
    data: {},
  };
};
