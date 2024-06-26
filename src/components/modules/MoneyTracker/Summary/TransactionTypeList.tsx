import { CURRENCY } from '@/mocks/summary';
import { TransactionTypeInfo } from '../../shared/TransactionTypeInfo';

import type { TSummaryTransactionTypes } from '@/types/summary';
import type { FC } from 'react';
import { TrendAnalyzer } from '../../shared/TrendAnalyzer';

interface ITransactionTypeList {
  summaryListSplit: TSummaryTransactionTypes;
}

export const TransactionTypeList: FC<ITransactionTypeList> = ({
  summaryListSplit,
}) => {
  return (
    <ul className="flex justify-between w-100 gap-10 flex-wrap">
      {summaryListSplit.map(({ theme, type, value, trend, percent }) => (
        <div>
          <TransactionTypeInfo
            title={type}
            theme={theme}
            value={value}
            currency={CURRENCY}
          />
          <TrendAnalyzer trend={trend} percent={percent} />
        </div>
      ))}
    </ul>
  );
};
