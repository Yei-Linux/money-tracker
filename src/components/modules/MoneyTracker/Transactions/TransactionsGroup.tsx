'use client';

import { useFetchTransactions } from '@/hooks/useFetchTransactions';
import { TransactionsTable } from './TransactionsTable';

export const TransactionsGroup = () => {
  const { transactions } = useFetchTransactions();

  return (
    <>
      {transactions &&
        transactions.map(([title, transactions]) => (
          <div className="flex flex-col gap-2" key={title}>
            <h4 className="text-neutral_1">{title}</h4>
            <TransactionsTable transactions={transactions} />
          </div>
        ))}
    </>
  );
};
