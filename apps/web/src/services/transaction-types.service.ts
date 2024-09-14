import { TTransactionTypes } from '@moneytrack/web/types/transaction-types';

export const getTransactionTypesService =
  async (): Promise<TTransactionTypes> => {
    try {
      const promise = await fetch(`${process.env.URL}/api/transaction-types`);
      const json = await promise.json();
      return json?.data ?? [];
    } catch (error) {
      return [];
    }
  };
