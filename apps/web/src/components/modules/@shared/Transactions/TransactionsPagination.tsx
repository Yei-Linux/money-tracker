'use client';

import { TTransactionStore } from '@moneytrack/web/store/@shared';
import { FC } from 'react';
import { StoreApi, UseBoundStore } from 'zustand';

type TransactionsPagination = {
  useStore: UseBoundStore<StoreApi<TTransactionStore>>;
};

export const TransactionsPagination: FC<TransactionsPagination> = ({
  useStore,
}) => {
  const nextPage = useStore((store) => store.nextPage);

  return (
    <div className="flex justify-center">
      <button className="text-xs" onClick={nextPage}>
        Load More
      </button>
    </div>
  );
};
