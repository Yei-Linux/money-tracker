import { transformRecordArrayToFormData } from '@/lib/utils';
import { getTransactionsService } from '@/services/transaction.service';
import { useTransactionStore } from '@/store/transactions';
import { useQuery } from '@tanstack/react-query';

export const useFetchTransactions = () => {
  const skip = useTransactionStore((store) => store.skip);
  const limit = useTransactionStore((store) => store.limit);
  const filters = useTransactionStore((store) => store.filters);
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
    queryKey: ['transactions', filters, skip, limit],
    queryFn: () => getTransactionsService(formDataFilters),
    select: ({ transactions, nextCursor }) => ({
      transactions: Object.entries(transactions),
      nextCursor: nextCursor,
    }),
  });

  return {
    transactions: transactionsResponse?.transactions,
    nextCursor: transactionsResponse?.nextCursor,
    isLoading,
    isError,
  };
};
