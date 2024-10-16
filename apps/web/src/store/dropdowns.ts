import { TCategories } from '@moneytrack/web/types/categories';
import { TTransactionTypes } from '@moneytrack/web/types/transaction-types';
import { create } from 'zustand';

export type UseDropdownsStore = {
  month: Date;
  categories: TCategories;
  transactionTypes: TTransactionTypes;
  setCategories: (req: TCategories) => void;
  setTransactionTypes: (req: TTransactionTypes) => void;
  setMonth: (req: UseDropdownsStore['month']) => void;
};

export const useDropdownsStore = create<UseDropdownsStore>((set, get) => ({
  month: new Date(),
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
  setMonth: (month) =>
    set(() => ({
      month,
    })),
}));
