'use client';

import { useTransactionStore } from '@/store/transactions';

export const TransactionsPagination = () => {
  const nextPage = useTransactionStore((store) => store.nextPage);

  return (
    <div className="flex justify-center">
      <button className="text-xs" onClick={nextPage}>
        Load More
      </button>
    </div>
  );
};
