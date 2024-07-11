import { getTransactionStatsByUserService } from '@/services/transactions-stats.service';
import { useQuery } from '@tanstack/react-query';

export const useFetchTransactionsStore = () => {
  const { data } = useQuery({
    queryKey: ['transaction/stats'],
    queryFn: getTransactionStatsByUserService,
  });

  return { transactionStats: data };
};
