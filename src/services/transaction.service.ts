import { ServerError } from '@/errors/ServerError';
import { TransactionsGroup } from '@/types/transactions';

export const getTransactionsService = async (
  filters: FormData
): Promise<TransactionsGroup> => {
  try {
    const params = `?${new URLSearchParams(
      filters as unknown as Record<string, string>
    ).toString()}`;

    const promise = await fetch(`/api/transactions${params}`);
    const json = await promise.json();
    return json?.data ?? {};
  } catch (error) {
    throw new ServerError(
      'There was an error getting your transaction. Please try again...'
    );
  }
};
