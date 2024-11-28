import { Button } from '@moneytrack/web/components/ui/button';
import { CardSelector } from '../../../@shared/CardSelector';
import { MoneyCurrency } from '../../../@shared/MoneyCurrency';
import { cn } from '@moneytrack/web/lib/utils';
import { CheckIcon } from 'lucide-react';
import { TPricingPlans } from '@moneytrack/web/types/payment';

export const Plans = ({
  plans,
  plan,
}: {
  plans: TPricingPlans;
  plan?: string;
}) => {
  return (
    <div className="flex flex-wrap gap-3">
      {plans.map(({ _id, type, description, price }) => (
        <CardSelector
          className={cn('border border-2 relative', {
            'border-purple': _id === plan,
          })}
          key={_id}
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold text-md">{type}</h3>
              <p className="text-xs max-w-[220px]">{description}</p>
            </div>
            <span className="flex items-center gap-1 text-sm">
              <MoneyCurrency money={price} variant="xl" /> <span>/ month</span>
            </span>
          </div>

          <Button
            variant="outline"
            className={cn('!text-sm w-fit !bg-purple !text-white')}
          >
            {_id === plan ? 'Cancel Suscription' : 'Upgrade'}
          </Button>

          {_id === plan && (
            <CheckIcon className="rounded-full bg-purple text-white absolute -right-[10px] -top-[10px]" />
          )}
        </CardSelector>
      ))}
    </div>
  );
};
