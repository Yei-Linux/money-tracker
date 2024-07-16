'use client';

import { TransactionTypeList } from './TransactionTypeList';
import { ChartTotal } from './ChartTotal';
import { Chart } from './Chart';
import { useFetchTransactionsStore } from '@/hooks/useFetchTransactionStats';
import { Title } from '@/components/ui/title';

export const Stats = () => {
  const { transactionStats } = useFetchTransactionsStore();
  const filterTerm = 'Total';

  if (!transactionStats) return;

  const total = transactionStats.find((item) => item.type === filterTerm);
  const summaryListSplit = transactionStats.filter(
    (item) => item.type !== filterTerm
  );

  return (
    <div className="flex flex-col gap-7 w-100">
      <Title as="h2">Summary of this Month</Title>

      {total && (
        <ChartTotal total={total}>
          <Chart info={summaryListSplit} totalValue={total.value} />
        </ChartTotal>
      )}

      <TransactionTypeList summaryListSplit={summaryListSplit} />
    </div>
  );
};
