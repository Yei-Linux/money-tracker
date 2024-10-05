import { cn } from '@moneytrack/web/lib/utils';
import { FC } from 'react';

type MoneyVariants = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

type MoneyCurrency = {
  money: number;
  variant?: MoneyVariants;
};

export const MoneyCurrency: FC<MoneyCurrency> = ({
  money = 0,
  variant = 'md',
}) => {
  const variants: Record<
    MoneyVariants,
    { moneySize: string; currencySize: string }
  > = {
    sm: { moneySize: 'text-[14px]', currencySize: 'text-xs' },
    md: { moneySize: 'text-lg', currencySize: 'text-xs' },
    lg: { moneySize: 'text-lg', currencySize: 'text-sm' },
    xl: { moneySize: 'text-xl', currencySize: 'text-sm' },
    '2xl': { moneySize: 'text-2xl', currencySize: 'text-sm' },
  };
  const variantChoosen = variants[variant];

  return (
    <data
      className={cn(
        'flex gap-1 items-center font-roboto',
        variantChoosen.moneySize
      )}
      value={money}
    >
      <span className={cn('text-sm', variantChoosen.currencySize)}>$</span>{' '}
      {money}
    </data>
  );
};
