import { cancelSubscriptionServerAction } from '@moneytrack/web/server-actions/payment/mercado-pago/cancel-subscription';
import { useTransition } from 'react';
import toast from 'react-hot-toast';

export const useCancelPayment = () => {
  const [isLoading, startStransition] = useTransition();

  const handleCancelSubscription = async () => {
    startStransition(async () => {
      try {
        await cancelSubscriptionServerAction();
        toast.success('Subscription updated successfuly');
        window.location.reload();
      } catch (error) {
        toast.error((error as Error).message);
      }
    });
  };

  return { isLoading, handleCancelSubscription };
};
