import { ServerError } from '@/errors/ServerError';
import {
  TGetTransactionService,
  TransactionsGroup,
  TransactionsShortResume,
} from '@/types/transactions';

export const getTransactionsService: TGetTransactionService<
  TransactionsGroup
> = async (filters: FormData) => {
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

export const getShortResumeTransactionsService: TGetTransactionService<
  TransactionsShortResume
> = async (filters: FormData) => {
  try {
    const params = `?${new URLSearchParams(
      filters as unknown as Record<string, string>
    ).toString()}`;

    const promise = await fetch(`/api/transactions/short-resume${params}`);
    const json = await promise.json();
    return json?.data ?? {};
  } catch (error) {
    throw new ServerError(
      'There was an error getting your transaction. Please try again...'
    );
  }
};
