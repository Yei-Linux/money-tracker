'use client';

import { Plan } from './Plan';
import { TPricingPlans } from '@moneytrack/web/types/payment';

type TPlans = { plans: TPricingPlans; currentPlan?: string };

export const Plans = ({ plans, currentPlan }: TPlans) => {
  if (!plans.length) return <></>;

  return (
    <div className="flex justify-center items-center gap-3 flex-wrap">
      {plans.map(({ benefits, ...props }, index) => (
        <Plan {...props} key={index} currentPlanId={currentPlan}>
          {benefits.map((benefit, indexBen) => (
            <Plan.Item item={benefit} key={indexBen} />
          ))}
        </Plan>
      ))}
    </div>
  );
};
