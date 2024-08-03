import { FC } from 'react';
import { TransactionTypeItem } from './Item';

type IncomesWithExpenses = {
  transactionIncomes: number;
  transactionExpenses: number;
};

export const IncomesWithExpenses: FC<IncomesWithExpenses> = ({
  transactionExpenses,
  transactionIncomes,
}) => {
  return (
    <div className="flex gap-3 w-full border p-4 rounded-xl h-fit">
      <TransactionTypeItem
        type="Income"
        counter={transactionIncomes}
        fillIcon="green"
      />
      <TransactionTypeItem
        type="Expense"
        counter={transactionExpenses}
        fillIcon="red"
      />
    </div>
  );
};
