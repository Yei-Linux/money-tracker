import { CardSelector } from '../../../@shared/CardSelector';
import { cn } from '@moneytrack/web/lib/utils';
import { CheckIcon, PlusCircleIcon } from 'lucide-react';

type TCards = 'visa' | 'mastercard' | 'amex' | 'paypal';

const cardIcons: Record<TCards, string> = {
  visa: 'visa.png',
  mastercard: 'mastercard.webp',
  amex: 'amex.png',
  paypal: 'paypal.png',
};

type PaymentMethod = Array<{
  cardType: string;
  cardMask: string;
  type: TCards;
  active: boolean;
}>;

const paymentMethods: PaymentMethod = [
  {
    cardType: 'Credit Card',
    cardMask: '***** **** **** 3542',
    type: 'visa',
    active: true,
  },
  {
    cardType: 'Debit Card',
    cardMask: '***** **** **** 3542',
    type: 'mastercard',
    active: false,
  },
];

export const PaymentMethods = () => {
  return (
    <div className="flex flex-wrap gap-3">
      {paymentMethods.map(({ cardType, cardMask, active, type }) => (
        <CardSelector
          className={cn('border border-2 relative', {
            'border-purple': active,
          })}
        >
          <h3 className="font-semibold text-sm text-neutral_1">{cardType}</h3>

          <div className="flex gap-3 items-center">
            <img
              src={`/assets/cards/${cardIcons[type]}`}
              className="w-[30px] h-[20px] rounded-sm shadow-sm"
            />
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
