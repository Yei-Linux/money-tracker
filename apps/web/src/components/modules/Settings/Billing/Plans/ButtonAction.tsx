'use client';

import { Button } from '@moneytrack/web/components/ui/button';
import { isValidPricing } from '@moneytrack/web/helpers/payment';
import { useCancelPayment } from '@moneytrack/web/hooks/payments/useCancelPayment';
import { useCreatePayment } from '@moneytrack/web/hooks/payments/useCreatePayment';
import { useUpdatePayment } from '@moneytrack/web/hooks/payments/useUpdatePayment';
import { cn } from '@moneytrack/web/lib/utils';
import { TPricingPlans } from '@moneytrack/web/types/payment';

type TButtonActions = {
  plan: Pick<TPricingPlans[number], '_id' | 'price' | 'type' | 'disable'>;
  currentPlanId?: string;
};

export const ButtonActions = ({ plan, currentPlanId }: TButtonActions) => {
  const validPrice = isValidPricing(plan.price);
  const { isLoading: isLoadingUpdate, handleUpdateSubscription } =
    useUpdatePayment();
  const { isLoading: isLoadingCancel, handleCancelSubscription } =
    useCancelPayment();
  const { isLoading: isLoadingCreate, handleCreateSubscription } =
    useCreatePayment();

  const isMyCurrentPlan = plan._id === currentPlanId;

  const getLoading = () => {
    if (!currentPlanId) return isLoadingCreate;
    return isMyCurrentPlan ? isLoadingCancel : isLoadingUpdate;
  };

  const getPaymentHandler = () => {
    if (!currentPlanId) return handleCreateSubscription(plan);
    return isMyCurrentPlan
      ? handleCancelSubscription()
      : handleUpdateSubscription(plan._id);
  };

  const getPaymentText = () => {
    if (!currentPlanId) return 'Start Subscription';

    return isMyCurrentPlan
      ? 'Cancel Subscription'
      : 'Update to this Subscription';
  };

  const getDisable = () => {
    if (!validPrice) return true;
    if (!currentPlanId) return false;
    if (plan.disable) return true;
    return false;
  };

  const isDisable = getDisable();
  const text = getPaymentText();
  const isLoading = getLoading();

  return (
    <Button
      loading={isLoading}
      variant="outline"
      className={cn('!text-sm w-fit !bg-purple !text-white')}
      onClick={getPaymentHandler}
      disabled={isDisable}
    >
      {text}
    </Button>
  );
};
