'use client';

import { mercadoPagoSuscriptionServerAction } from '@moneytrack/web/server-actions/payment/mercado-pago/suscription';
import { Plan } from './Plan';
import { TPricingPlans } from '@moneytrack/web/types/payment';
import { formatReasonPayment } from '@moneytrack/web/utils/payment';
import toast from 'react-hot-toast';
import { useAuthFormStore } from '@moneytrack/web/store/auth-form';

type TPlans = { plans: TPricingPlans };

export const Plans = ({ plans }: TPlans) => {
  const setOpen = useAuthFormStore((store) => store.setOpen);
  const switchState = useAuthFormStore((store) => store.switchState);
  const setCallbackUrl = useAuthFormStore((store) => store.setCallbackUrl);
  if (!plans.length) return <></>;

  const handlePayment = async (
    plan: Omit<TPricingPlans[number], 'benefits'>
  ) => {
    if (!plan._id) return;

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
  };

  return (
    <div className="flex justify-center items-center gap-3 flex-wrap">
      {plans.map(({ benefits, ...props }, index) => (
        <Plan {...props} key={index} onSubmit={() => handlePayment(props)}>
          {benefits.map((benefit, indexBen) => (
            <Plan.Item item={benefit} key={indexBen} />
          ))}
        </Plan>
      ))}
    </div>
  );
};
