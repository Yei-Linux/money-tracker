import { ServerError } from '@/errors/ServerError';
import { TTransactionStats } from '@/types/transaction-stats';

export const getTransactionStatsByUserService =
  async (): Promise<TTransactionStats> => {
    try {
      const response = await fetch('/api/transactions/stats');
      const json = await response.json();

      return json.data;
    } catch (error) {
      throw new ServerError(
        'There was an error wile we are trying to retrieve yours stats'
      );
    }
  };
