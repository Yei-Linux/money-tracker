import { DEFAULT_LIMIT } from '@/components/constants';
import { TCategories } from '@/types/categories';
import { TTransactionTypes } from '@/types/transaction-types';
import { create } from 'zustand';

type TObjectID = string;
export type TFilterKeys = 'category' | 'transactionType';

type TTransactionStore = {
  categories: TCategories;
  transactionTypes: TTransactionTypes;
  setCategories: (req: TTransactionStore['categories']) => void;
  setTransactionTypes: (req: TTransactionStore['transactionTypes']) => void;

  skip: number;
  limit: number;
  nextPage: () => void;

  filters: Record<TFilterKeys, TObjectID[]>;
  updateFiltersByKey: (key: TFilterKeys, values: TObjectID[]) => void;
};

export const useTransactionStore = create<TTransactionStore>((set, get) => ({
  categories: [],
  transactionTypes: [],
  filters: { category: [], transactionType: [] },
  skip: 0,
  limit: DEFAULT_LIMIT,

  setCategories: (categoriesReq) =>
    set(() => ({
      categories: categoriesReq,
    })),
  setTransactionTypes: (transactionTypesReq) =>
    set(() => ({
      transactionTypes: transactionTypesReq,
    })),
  updateFiltersByKey: (key, values) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: values,
      },
      limit: DEFAULT_LIMIT,
    })),
  nextPage: () =>
    set((state) => ({
      limit: state.limit + DEFAULT_LIMIT,
    })),
}));
