import { TCategories } from '@/types/categories';
import { TTransactionTypes } from '@/types/transaction-types';
import { create } from 'zustand';

type TTransactionStore = {
  categories: TCategories;
  transactionTypes: TTransactionTypes;
  setCategories: (req: TTransactionStore['categories']) => void;
  setTransactionTypes: (req: TTransactionStore['transactionTypes']) => void;
};

export const useTransactionStore = create<TTransactionStore>((set) => ({
  categories: [],
  transactionTypes: [],
  setCategories: (categoriesReq) =>
    set(() => ({
      categories: categoriesReq,
    })),
  setTransactionTypes: (transactionTypesReq) =>
    set(() => ({
      transactionTypes: transactionTypesReq,
    })),
}));
