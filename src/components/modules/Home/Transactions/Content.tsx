'use client';

import { useFetchTransactionsAdapter } from '@/hooks/@shared/useTransactionAdapter';
import { getShortResumeTransactionsService } from '@/services/transaction.service';
import { useShortTransactionsStore } from '@/store/transactions';
import { TTransaction } from '@/types/transactions';
import { TransactionsPagination } from '../../@shared/Transactions/TransactionsPagination';
import { TransactionItem } from './TransactionItem';

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
      <div className="flex flex-col gap-6 items-center">
        {transactions?.map((transaction) => (
          <TransactionItem {...transaction} key={transaction._id} />
        ))}
      </div>

      {nextCursor && (
        <TransactionsPagination useStore={useShortTransactionsStore} />
      )}
    </div>
  );
};
