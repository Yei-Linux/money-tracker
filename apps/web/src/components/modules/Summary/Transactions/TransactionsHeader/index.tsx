'use client';

import { TransactionDialog } from '../../../@shared/Transactions/TransactionDialog';
import { CategoryFilters } from '../CategoryFilters';
import { TransactionTypeFilters } from '../TransactionTypesFilters';
import { useFetchTransactionsStats } from '@moneytrack/web/hooks/useFetchTransactionStats';
import { pickIncomesAndExpenses } from './utils';
import { Title } from '@moneytrack/web/components/ui/title';
import { sectionsTestIds } from '@moneytrack/shared/constants';

export const TransactionHeader = () => {
  const { transactionStats } = useFetchTransactionsStats();
  const { incomes, expenses } = pickIncomesAndExpenses(transactionStats);

  return (
    <header
      data-testid={sectionsTestIds.TRANSACTIONS_FILTER_SECTION}
      className="flex flex-col gap-3 md:gap-1"
    >
      <Title as="h2">My Transactions</Title>

      <div className="flex justify-between items-center w-100 flex-wrap gap-3">
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
