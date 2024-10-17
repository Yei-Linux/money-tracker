'use client';

import { TransactionTypeList } from './TransactionTypeList';
import { ChartTotal } from './ChartTotal';
import { Chart } from './Chart';
import { useFetchTransactionsStats } from '@moneytrack/web/hooks/useFetchTransactionStats';
import { Title } from '@moneytrack/web/components/ui/title';
import { getCurrentMonth } from '@moneytrack/shared/lib/date';

export const Stats = () => {
  const { transactionStats } = useFetchTransactionsStats();
  const filterTerm = 'Total';

  if (!transactionStats) return;

  const total = transactionStats.find((item) => item.type === filterTerm);
  const summaryListSplit = transactionStats.filter(
    (item) => item.type !== filterTerm
  );
  const textMonth = getCurrentMonth();

  return (
    <div className="flex flex-col gap-10 w-100">
      <Title as="h2">Summary of {textMonth}</Title>

      {total && (
        <ChartTotal total={total}>
          <Chart info={summaryListSplit} totalValue={total.value} />
        </ChartTotal>
      )}

      <TransactionTypeList summaryListSplit={summaryListSplit} />
    </div>
  );
};
