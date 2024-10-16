import { ServerError } from '@moneytrack/web/errors/ServerError';
import { TTransactionStats } from '@moneytrack/web/types/transaction-stats';
import { getMonthQueryParam } from '../utils/transactions';

export const getTransactionStatsByUserService = async (
  monthDate: Date
): Promise<TTransactionStats> => {
  try {
    const response = await fetch(
      `/api/transactions/stats?${getMonthQueryParam(monthDate)}`
    );
    const json = await response.json();

    return json.data;
  } catch (error) {
    throw new ServerError(
      'There was an error wile we are trying to retrieve yours stats'
    );
  }
};
