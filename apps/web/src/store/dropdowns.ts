import { TCategories } from '@moneytrack/web/types/categories';
import { TTransactionTypes } from '@moneytrack/web/types/transaction-types';
import { create } from 'zustand';

export type UseDropdownsStore = {
  categories: TCategories;
  transactionTypes: TTransactionTypes;
  setCategories: (req: TCategories) => void;
  setTransactionTypes: (req: TTransactionTypes) => void;
};

export const useDropdownsStore = create<UseDropdownsStore>((set, get) => ({
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
