import { CardSelector } from '../../../@shared/CardSelector';
import { cn } from '@moneytrack/web/lib/utils';
import { CheckIcon, PlusCircleIcon } from 'lucide-react';

const paymentMethods = [
  {
    cardType: 'Credit Card',
    cardMask: '***** **** **** 3542',
    active: true,
  },
  {
    cardType: 'Debit Card',
    cardMask: '***** **** **** 3542',
    active: false,
  },
];

export const PaymentMethods = () => {
  return (
    <div className="flex flex-wrap gap-3">
      {paymentMethods.map(({ cardType, cardMask, active }) => (
        <CardSelector
          className={cn('border border-2 relative', {
            'border-purple': active,
          })}
        >
          <h3 className="font-semibold text-sm text-neutral_1">{cardType}</h3>
          <div>
            <p className="font-bold text-sm">{cardMask}</p>
          </div>

          {active && (
            <CheckIcon className="rounded-full bg-purple text-white absolute -right-[10px] -top-[10px]" />
          )}
        </CardSelector>
      ))}

      <CardSelector
        className={cn(
          'border border-2 flex justify-center items-center cursor-pointer'
        )}
      >
        <PlusCircleIcon size={40} />
      </CardSelector>
    </div>
  );
};
