'use client';

import { FC } from 'react';
import { TransactionDialog } from '../TransactionDialog';
import { CategoryFilters } from '../CategoryFilters';
import { TransactionTypeFilters } from '../TransactionTypesFilters';
import { useFetchTransactionsStore } from '@/hooks/useFetchTransactionStats';
import { pickIncomesAndExpenses } from './utils';
import { Title } from '@/components/ui/title';

export const TransactionHeader = () => {
  const { transactionStats } = useFetchTransactionsStore();
  const { incomes, expenses } = pickIncomesAndExpenses(transactionStats);

  return (
    <header className="flex flex-col">
      <Title as="h2">My Transactions</Title>

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
