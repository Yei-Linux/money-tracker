import { useDropdownsStore } from '@moneytrack/web/store/dropdowns';
import { TCategories } from '@moneytrack/web/types/categories';
import { TTransactionTypes } from '@moneytrack/web/types/transaction-types';
import { useEffect } from 'react';

type TUseInitTransactionStore = {
  categories: TCategories;
  transactionTypes: TTransactionTypes;
};

export const useInitTransactionStore = ({
  categories,
  transactionTypes,
}: TUseInitTransactionStore) => {
  const setCategories = useDropdownsStore((store) => store.setCategories);
  const setTransactionTypes = useDropdownsStore(
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
