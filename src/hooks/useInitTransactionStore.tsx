import { useTransactionStore } from '@/store/transactions';
import { TCategories } from '@/types/categories';
import { TTransactionTypes } from '@/types/transaction-types';
import { useEffect } from 'react';

type TUseInitTransactionStore = {
  categories: TCategories;
  transactionTypes: TTransactionTypes;
};

export const useInitTransactionStore = ({
  categories,
  transactionTypes,
}: TUseInitTransactionStore) => {
  const setCategories = useTransactionStore((store) => store.setCategories);
  const setTransactionTypes = useTransactionStore(
    (store) => store.setTransactionTypes
  );

  useEffect(() => {
    if (!categories?.length) return;
    setCategories(categories);
  }, [categories]);

  useEffect(() => {
    if (!transactionTypes?.length) return;
    setTransactionTypes(transactionTypes);
  }, [transactionTypes]);
};
