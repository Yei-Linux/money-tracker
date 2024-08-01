'use client';

import { TransactionsTable } from './TransactionsTable';
import { TransactionsPagination } from '../../@shared/Transactions/TransactionsPagination';
import { useFetchTransactionsAdapter } from '@/hooks/@shared/useTransactionAdapter';
import { TTransaction } from '@/types/transactions';
import { useTransactionStore } from '@/store/transactions';
import { getTransactionsService } from '@/services/transaction.service';

export const TransactionsGroup = () => {
  const { transactions, nextCursor } = useFetchTransactionsAdapter<
    Record<string, Array<TTransaction>>,
    [string, TTransaction[]][] | undefined
  >({
    useStore: useTransactionStore,
    queryKey: 'transactions',
    service: getTransactionsService,
  });

  return (
    <>
      {transactions &&
        transactions.map(([title, transactions]) => (
          <div className="flex flex-col gap-2" key={title}>
            <h4 className="text-neutral_1">{title}</h4>
            <TransactionsTable transactions={transactions} />
          </div>
        ))}

      {nextCursor && <TransactionsPagination useStore={useTransactionStore} />}
    </>
  );
};
