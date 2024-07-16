'use client';

import { FC } from 'react';
import { TransactionDialog } from '../TransactionDialog';
import { TCategories } from '@/types/categories';
import { useInitTransactionStore } from '@/hooks/useInitTransactionStore';
import { TTransactionTypes } from '@/types/transaction-types';
import { CategoryFilters } from '../CategoryFilters';
import { TransactionTypeFilters } from '../TransactionTypesFilters';
import { useFetchTransactionsStore } from '@/hooks/useFetchTransactionStats';
import { pickIncomesAndExpenses } from './utils';

interface ITransactionHeader {
  categories: TCategories;
  transactionTypes: TTransactionTypes;
}

export const TransactionHeader: FC<ITransactionHeader> = ({
  categories,
  transactionTypes,
}) => {
  const { transactionStats } = useFetchTransactionsStore();
  useInitTransactionStore({ categories, transactionTypes });
  const { incomes, expenses } = pickIncomesAndExpenses(transactionStats);

  return (
    <header className="flex flex-col">
      <h2 className="font-bold text-2xl">My Transactions</h2>
      <div className="flex justify-between items-center w-100">
        <p className="text-sm text-neutral_1">
          You had {incomes} incomes and {expenses} expenses this month
        </p>

        <ul className="flex gap-4">
          <li>
            <TransactionTypeFilters />
          </li>
          <li>
            <CategoryFilters />
          </li>
          <li>
            <TransactionDialog />
          </li>
        </ul>
      </div>
    </header>
  );
};
