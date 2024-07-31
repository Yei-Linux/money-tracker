import { DEFAULT_LIMIT } from '@/constants';
import { createTransactionStoreFactory } from './@shared';

export const useTransactionStore = createTransactionStoreFactory(DEFAULT_LIMIT);
export const useShortTransactionsStore =
  createTransactionStoreFactory(DEFAULT_LIMIT);
