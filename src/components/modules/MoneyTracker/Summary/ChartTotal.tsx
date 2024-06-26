import { TransactionTypeInfo } from '../../shared/TransactionTypeInfo';
import { CURRENCY } from '@/mocks/summary';

import type { TSummaryItem, TSummaryTransactionTypes } from '@/types/summary';
import type { FC } from 'react';
import { TrendAnalyzer } from '../../shared/TrendAnalyzer';

export interface IChartTotal {
  total: TSummaryItem;
  children: React.ReactNode;
}

export const ChartTotal: FC<IChartTotal> = ({ total, children }) => {
  const { type, theme, value, trend, percent } = total;

  return (
    <div className="flex flex-wrap justify-between gap-3">
      <div className="flex flex-col">
        <TransactionTypeInfo
          title={type}
          value={value}
          theme={theme}
          currency={CURRENCY}
        />
        <TrendAnalyzer trend={trend} percent={percent} />
      </div>
      {children}
    </div>
  );
};
