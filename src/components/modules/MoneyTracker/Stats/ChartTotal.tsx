import { TransactionTypeInfo } from '../../shared/TransactionTypeInfo';
import { CURRENCY } from '@/mocks/summary';

import type { FC } from 'react';
import { TrendAnalyzer } from '../../shared/TrendAnalyzer';
import { TTransactionStatItem } from '@/types/transaction-stats';
import { TThemes } from './utils';

export interface IChartTotal {
  total: TTransactionStatItem;
  children: React.ReactNode;
}

export const ChartTotal: FC<IChartTotal> = ({ total, children }) => {
  const { type, theme, value } = total;

  return (
    <div className="flex flex-wrap justify-between gap-3">
      <div className="flex flex-col">
        <TransactionTypeInfo
          title={type}
          value={value}
          theme={theme as TThemes}
          currency={CURRENCY}
        />
        <TrendAnalyzer trend="up" percent={8} />
      </div>
      {children}
    </div>
  );
};
