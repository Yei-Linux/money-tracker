import { transformRecordArrayToFormData } from '@/lib/utils';
import { TTransactionStore } from '@/store/@shared';
import {
  TGetTransactionService,
  TransactionApiResponse,
} from '@/types/transactions';
import { useQuery } from '@tanstack/react-query';
import { StoreApi, UseBoundStore } from 'zustand';

type UseFetchTransactionsAdapter<T> = {
  useStore: UseBoundStore<StoreApi<TTransactionStore>>;
  queryKey: string;
  service: TGetTransactionService<TransactionApiResponse<T>>;
};

export const useFetchTransactionsAdapter = <T, R = T>({
  useStore,
  queryKey,
  service,
}: UseFetchTransactionsAdapter<T>) => {
  const skip = useStore((store) => store.skip);
  const limit = useStore((store) => store.limit);
  const filters = useStore((store) => store.filters);
  const formDataFilters = transformRecordArrayToFormData({
    ...filters,
    skip: skip.toString(),
    limit: limit.toString(),
  });

  const {
    data: transactionsResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [queryKey, filters, skip, limit],
    queryFn: () => service(formDataFilters),
    select: ({ transactions, nextCursor }) => ({
      transactions:
        transactions instanceof Object && !Array.isArray(transactions)
          ? Object.entries(transactions)
          : transactions,
      nextCursor: nextCursor,
    }),
  });

  return {
    transactions: transactionsResponse?.transactions as R | undefined,
    nextCursor: transactionsResponse?.nextCursor,
    isLoading,
    isError,
  };
};
