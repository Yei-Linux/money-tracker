'use client';

import { FC } from 'react';
import { TransactionDialog } from './TransactionDialog';
import { TCategories } from '@/types/categories';
import { useInitTransactionStore } from '@/hooks/useInitTransactionStore';
import { TTransactionTypes } from '@/types/transaction-types';
import { CategoryFilters } from './CategoryFilters';
import { TransactionTypeFilters } from './TransactionTypesFilters';

interface ITransactionHeader {
  incomes: number;
  expenses: number;
  categories: TCategories;
  transactionTypes: TTransactionTypes;
}

export const TransactionHeader: FC<ITransactionHeader> = ({
  incomes,
  expenses,
  categories,
  transactionTypes,
}) => {
  useInitTransactionStore({ categories, transactionTypes });

  return (
    <header className="flex flex-col">
      <h2 className="font-bold text-2xl">Transactions</h2>
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
