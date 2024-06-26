import { summaryList } from '@/mocks/summary';

export type TSummaryTransactionTypes = typeof summaryList;
export type TSummaryItem = TSummaryTransactionTypes[number];

export type TransactionItem = {
  id: string;
  category: string;
  title: string;
  cost: number;
  description: string;
  date: string;
};
export type TransactionList = Record<string, Array<TransactionItem>>;
