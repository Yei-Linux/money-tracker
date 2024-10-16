import { useQuery } from '@tanstack/react-query';
import { useDropdownsStore } from '../store/dropdowns';
import { getMoneyAccountService } from '../services/money-account.service';

export const useFechMoneyAccount = () => {
  const month = useDropdownsStore((store) => store.month);

  const { data } = useQuery({
    queryKey: ['@money-acount', month],
    queryFn: async () => await getMoneyAccountService(month),
  });

  return { myMoneyAccount: data };
};
