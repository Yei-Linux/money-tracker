import { CURRENCY } from '@moneytrack/web/mocks/summary';
import { TransactionTypeInfo } from '../../@shared/Transactions/TransactionTypeInfo';

import type { FC } from 'react';
import { TrendAnalyzer } from '../../@shared/TrendAnalyzer';
import { TTransactionStats } from '@moneytrack/web/types/transaction-stats';
import { TThemes } from './utils';
import { sectionsTestIds } from '@moneytrack/shared/constants';

interface ITransactionTypeList {
  summaryListSplit: TTransactionStats;
}

export const TransactionTypeList: FC<ITransactionTypeList> = ({
  summaryListSplit,
}) => {
  return (
    <ul
      className="flex justify-between w-100 gap-10 flex-wrap"
      data-testid={sectionsTestIds.TRANSACTION_TYPES_STATS_SECTION}
    >
      {summaryListSplit.map(({ theme, type, value }, index) => (
        <li key={index}>
          <TransactionTypeInfo
            title={type}
            theme={theme as TThemes}
            value={value}
            currency={CURRENCY}
          />
          <TrendAnalyzer trend="up" percent={8} />
        </li>
      ))}
    </ul>
  );
};
