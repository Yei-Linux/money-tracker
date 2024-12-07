import { Button } from '@moneytrack/web/components/ui/button';
import { isValidPricing } from '@moneytrack/web/helpers/payment';
import { useCreatePayment } from '@moneytrack/web/hooks/payments/useCreatePayment';
import { useUpdatePayment } from '@moneytrack/web/hooks/payments/useUpdatePayment';
import { cn } from '@moneytrack/web/lib/utils';
import { TPricingPlans } from '@moneytrack/web/types/payment';

type TPlanButtonActions = {
  className?: string;
  currentPlanId?: string;
  callToActionText: string;
  plan: Pick<TPricingPlans[number], '_id' | 'price' | 'type' | 'disable'>;
};

export const PlanButtonAction = ({
  className,
  callToActionText,
  currentPlanId,
  plan,
}: TPlanButtonActions) => {
  const validPrice = isValidPricing(plan.price);
  const { isLoading: isLoadingUpdate, handleUpdateSubscription } =
    useUpdatePayment();
  const { isLoading: isLoadingCreate, handleCreateSubscription } =
    useCreatePayment();

  const isMyCurrentPlan = plan._id === currentPlanId;

  const getLoading = () => {
    if (!currentPlanId) return isLoadingCreate;
    return isLoadingUpdate;
  };

  const getPaymentHandler = () => {
    if (!currentPlanId) return handleCreateSubscription(plan);
    return handleUpdateSubscription(plan._id);
  };

  const getPaymentText = () => {
    if (!currentPlanId) return callToActionText;

    return isMyCurrentPlan ? 'You are subscribed here' : callToActionText;
  };

  const getDisable = () => {
    if (!validPrice) return true;
    if (!currentPlanId) return false;
    if (plan.disable) return true;
    return isMyCurrentPlan;
  };

  const isDisable = getDisable();
  const text = getPaymentText();
  const isLoading = getLoading();

  return (
    <Button
      className={cn('rounded-full', className, {
        '!bg-muted text-black': isMyCurrentPlan || isDisable,
      })}
      loading={isLoading}
      onClick={getPaymentHandler}
      disabled={isDisable}
    >
      {text}
    </Button>
  );
};
