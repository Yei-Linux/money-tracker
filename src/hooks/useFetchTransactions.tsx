import { getTransactionsService } from '@/services/transaction.service';
import { useQuery } from '@tanstack/react-query';

export const useFetchTransactions = () => {
  const {
    data: transactions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactionsService,
    select: (data) => Object.entries(data),
  });

  return { transactions, isLoading, isError };
};
