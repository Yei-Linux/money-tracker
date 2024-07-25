import { getMoneyAccountService } from '@/services/money-account.service';
import { useQuery } from '@tanstack/react-query';

export const useFetchMoneyAccount = () => {
  const { data: myMoneyAccount, isLoading } = useQuery({
    queryKey: ['user/money-account'],
    queryFn: getMoneyAccountService,
  });

  return { myMoneyAccount, isLoading };
};
