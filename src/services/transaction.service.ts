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
    return {};
  }
};
