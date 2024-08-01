import { TFilterKeys } from '@/types/transactions';
import { create } from 'zustand';

type TObjectID = string;
export type TTransactionStore = {
  skip: number;
  limit: number;
  filters: Record<TFilterKeys, TObjectID[]>;

  nextPage: () => void;
  updateFiltersByKey: (key: TFilterKeys, values: TObjectID[]) => void;
};

export const createTransactionStoreFactory = (limit: number) =>
  create<TTransactionStore>((set, get) => ({
    filters: { category: [], transactionType: [] },
    skip: 0,
    limit: limit,

    updateFiltersByKey: (key, values) =>
      set((state) => ({
        filters: {
          ...state.filters,
          [key]: values,
        },
        limit: limit,
      })),
    nextPage: () =>
      set((state) => ({
        limit: state.limit + limit,
      })),
  }));
