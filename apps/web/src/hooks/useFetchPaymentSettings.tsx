import { useQuery } from '@tanstack/react-query';
import { getPaymentSettings } from '../services/settings-profile.service';

export const useFetchPaymentSettings = () => {
  const { data } = useQuery({
    queryKey: ['@my-settings/payment'],
    queryFn: async () => await getPaymentSettings(),
  });

  return { paymentSettings: data };
};
