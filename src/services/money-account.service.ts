import { ServerError } from '@/errors/ServerError';
import { MyMoneyAccount } from '@/types/money-account';

export const getMoneyAccountService = async (
  cookie = ''
): Promise<MyMoneyAccount> => {
  try {
    const response = await fetch(`${process.env.URL}/api/money-account`, {
      headers: {
        cookie,
      },
    });
    const json = await response.json();
    return json.data;
  } catch (error) {
    throw new ServerError(
      'There was an error getting your transaction. Please try again...'
    );
  }
};
