import { cn } from '@/lib/utils';
import type { FC } from 'react';

const themes = {
  primary: 'text-primary',
  success: 'text-success',
  danger: 'text-danger',
  purple: 'text-purple',
  sunny: 'text-sunny',
};

type Themes = keyof typeof themes;

interface ITransactionTypeInfo {
  title: string;
  value: number;
  currency: string;
  theme: Themes;
}

export const TransactionTypeInfo: FC<ITransactionTypeInfo> = ({
  title,
  value,
  currency,
  theme,
}) => {
  return (
    <dl className={cn('font-semibold')}>
      <dt>
        <span className={cn('text-sm', themes[theme])}>{title}</span>
      </dt>
      <dd className="flex items-center">
        {value}
        <abbr className="text-xs text-[#6b7280]" title="Currency">
          {currency}
        </abbr>
      </dd>
    </dl>
  );
};
