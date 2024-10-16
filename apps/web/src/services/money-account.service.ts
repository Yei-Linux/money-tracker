import { ServerError } from '@moneytrack/web/errors/ServerError';
import { MyMoneyAccount } from '@moneytrack/web/types/money-account';
import { getMonthQueryParam } from '../utils/transactions';

export const getMoneyAccountService = async (
  monthDate: Date
): Promise<MyMoneyAccount> => {
  try {
    const response = await fetch(
      `/api/money-account?${getMonthQueryParam(monthDate)}`
    );
    const json = await response.json();
    return json.data;
  } catch (error) {
    throw new ServerError(
      'There was an error getting your transaction. Please try again...'
    );
  }
};
