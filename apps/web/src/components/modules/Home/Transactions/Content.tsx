'use client';

import { useFetchTransactionsAdapter } from '@moneytrack/web/hooks/@shared/useTransactionAdapter';
import { getShortResumeTransactionsService } from '@moneytrack/web/services/transaction.service';
import { useShortTransactionsStore } from '@moneytrack/web/store/transactions';
import { TTransaction } from '@moneytrack/web/types/transactions';
import { TransactionsPagination } from '../../@shared/Transactions/TransactionsPagination';
import { TransactionsByDevice } from '@moneytrack/web/components/modules/@shared/Transactions/TransactionList';

export const TransactionsContent = () => {
  const { transactions, nextCursor } = useFetchTransactionsAdapter<
    Array<TTransaction>
  >({
    useStore: useShortTransactionsStore,
    queryKey: 'transactions/short-resume',
    service: getShortResumeTransactionsService,
  });

  return (
    <div className="flex flex-col gap2">
      <TransactionsByDevice transactions={transactions} />

      {nextCursor && (
        <TransactionsPagination useStore={useShortTransactionsStore} />
      )}
    </div>
  );
};
