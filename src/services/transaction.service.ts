import { TransactionsGroup } from '@/types/transactions';

export const getTransactionsService = async (): Promise<TransactionsGroup> => {
  try {
    const promise = await fetch(`/api/transactions`);
    const json = await promise.json();
    return json?.data ?? {};
  } catch (error) {
    return {};
  }
};
