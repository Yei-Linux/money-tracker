import { FC } from 'react';
import { TransactionTypeItem } from './Item';
import { sectionsTestIds } from '@moneytrack/shared/constants';

type IncomesWithExpenses = {
  transactionIncomes: number;
  transactionExpenses: number;
};

export const IncomesWithExpenses: FC<IncomesWithExpenses> = ({
  transactionExpenses,
  transactionIncomes,
}) => {
  return (
    <div
      data-testid={sectionsTestIds.INCOME_WITH_EXPENSES_SECTION}
      className="flex gap-3 w-full border p-4 rounded-xl h-fit"
    >
      <TransactionTypeItem
        type="Income(s)"
        counter={transactionIncomes}
        fillIcon="green"
        data-testid={sectionsTestIds.INCOMES_SECTION}
      />
      <TransactionTypeItem
        type="Expense(s)"
        counter={transactionExpenses}
        fillIcon="red"
        data-testid={sectionsTestIds.EXPENSES_SECTION}
      />
    </div>
  );
};
