import { getTransactionStatsByUserService } from '@moneytrack/web/services/transactions-stats.service';
import { useQuery } from '@tanstack/react-query';
import { useDropdownsStore } from '../store/dropdowns';

export const useFetchTransactionsStats = () => {
  const month = useDropdownsStore((store) => store.month);
  const { data } = useQuery({
    queryKey: ['transaction/stats', month],
    queryFn: () => getTransactionStatsByUserService(month),
  });

  return { transactionStats: data };
};
