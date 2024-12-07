import { updateSubscriptionServerAction } from '@moneytrack/web/server-actions/payment/mercado-pago/update-subscription';
import { useTransition } from 'react';
import toast from 'react-hot-toast';

export const useUpdatePayment = () => {
  const [isLoading, startStransition] = useTransition();

  const handleUpdateSubscription = async (planIdToUpdate: string) => {
    startStransition(async () => {
      try {
        await updateSubscriptionServerAction(planIdToUpdate);
        toast.success('Subscription updated successfuly');

        window.location.reload();
      } catch (error) {
        toast.error((error as Error).message);
      }
    });
  };

  return { isLoading, handleUpdateSubscription };
};
