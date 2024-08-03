'use client';

import { useFetchTransactionsAdapter } from '@/hooks/@shared/useTransactionAdapter';
import { getShortResumeTransactionsService } from '@/services/transaction.service';
import { useShortTransactionsStore } from '@/store/transactions';
import { TTransaction } from '@/types/transactions';
import { TransactionsPagination } from '../../../@shared/Transactions/TransactionsPagination';
import { useDimensions } from '@/hooks/@shared/useDimensions';
import { PhoneContent } from './PhoneContent';
import { DesktopContent } from './DesktopContent';

export const TransactionsContent = () => {
  const { device } = useDimensions();
  const { transactions, nextCursor } = useFetchTransactionsAdapter<
    Array<TTransaction>
  >({
    useStore: useShortTransactionsStore,
    queryKey: 'transactions/short-resume',
    service: getShortResumeTransactionsService,
  });

  return (
    <div className="flex flex-col gap2">
      {device === 'phone' ? (
        <PhoneContent transactions={transactions} />
      ) : (
        <DesktopContent transactions={transactions} />
      )}

      {nextCursor && (
        <TransactionsPagination useStore={useShortTransactionsStore} />
      )}
    </div>
  );
};
