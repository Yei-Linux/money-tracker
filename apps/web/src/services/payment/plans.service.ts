import { TPricingPlans } from '@moneytrack/web/types/payment';

export const getPlansService = async (): Promise<TPricingPlans> => {
  try {
    const promise = await fetch(`${process.env.URL}/api/payment/plans`);
    const json = await promise.json();
    return json?.data ?? [];
  } catch (error) {
    return [];
  }
};
