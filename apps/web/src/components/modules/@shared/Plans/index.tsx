'use client';

import { mercadoPagoSuscriptionServerAction } from '@moneytrack/web/server-actions/payment/mercado-pago/suscription';
import { Plan } from './Plan';
import { TPricingPlans } from '@moneytrack/web/types/payment';
import { formatReasonPayment } from '@moneytrack/web/utils/payment';
import toast from 'react-hot-toast';

type TPlans = { plans: TPricingPlans };

export const Plans = ({ plans }: TPlans) => {
  if (!plans.length) return <></>;

  const handlePayment = async (
    plan: Omit<TPricingPlans[number], 'benefits'>
  ) => {
    if (!plan.id) return;

    try {
      const uri = await mercadoPagoSuscriptionServerAction(
        formatReasonPayment(plan.type),
        plan.price,
        plan.id
      );

      window.location.href = uri;
    } catch (error) {
      toast.error((error as Error).message);
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
