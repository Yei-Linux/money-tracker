import { Button } from '@moneytrack/web/components/ui/button';
import { CardSelector } from '../../../@shared/CardSelector';
import { MoneyCurrency } from '../../../@shared/MoneyCurrency';
import { cn } from '@moneytrack/web/lib/utils';
import { CheckIcon } from 'lucide-react';

const plans = [
  {
    plan: 'Beginner',
    description: 'Basic plan',
    price: 5,
    active: true,
  },
  {
    plan: 'Intermediate',
    description: 'Intermediate plan',
    price: 10,
    active: false,
  },
  {
    plan: 'Pro',
    description: 'Pro plan',
    price: 15,
    active: false,
  },
];

export const Plans = () => {
  return (
    <div className="flex flex-wrap gap-3">
      {plans.map(({ plan, description, price, active }) => (
        <CardSelector
          className={cn('border border-2 relative', {
            'border-purple': active,
          })}
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold text-md">{plan}</h3>
              <p className="text-xs">{description}</p>
            </div>
            <span className="flex items-center gap-1 text-sm">
              <MoneyCurrency money={price} variant="xl" /> <span>/ month</span>
            </span>
          </div>

          <Button
            variant="outline"
            className={cn('!text-sm w-fit !bg-purple !text-white')}
          >
            {active ? 'Cancel Suscription' : 'Upgrade'}
          </Button>

          {active && (
            <CheckIcon className="rounded-full bg-purple text-white absolute -right-[10px] -top-[10px]" />
          )}
        </CardSelector>
      ))}
    </div>
  );
};
