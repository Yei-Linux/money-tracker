import { mercadoPagoSuscriptionServerAction } from '@moneytrack/web/server-actions/payment/mercado-pago/suscription';
import { useAuthFormStore } from '@moneytrack/web/store/auth-form';
import { TPricingPlans } from '@moneytrack/web/types/payment';
import { formatReasonPayment } from '@moneytrack/web/utils/payment';
import { useTransition } from 'react';
import toast from 'react-hot-toast';

export const useCreatePayment = () => {
  const [isLoading, startStransition] = useTransition();
  const setOpen = useAuthFormStore((store) => store.setOpen);
  const switchState = useAuthFormStore((store) => store.switchState);
  const setCallbackUrl = useAuthFormStore((store) => store.setCallbackUrl);

  const handleCreateSubscription = async (
    plan: Pick<TPricingPlans[number], '_id' | 'price' | 'type'>
  ) => {
    if (!plan._id) return;

    startStransition(async () => {
      try {
        const uri = await mercadoPagoSuscriptionServerAction(
          formatReasonPayment(plan.type),
          plan.price,
          plan._id
        );

        window.location.href = uri;
      } catch (error) {
        const message = (error as Error).message;

        if (message === 'You are not logged in') {
          setCallbackUrl('/plans');
          switchState('signin');
          setOpen(true);
        }

        toast.error(message);
      }
    });
  };

  return { isLoading, handleCreateSubscription };
};
