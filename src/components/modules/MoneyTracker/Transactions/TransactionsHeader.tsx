import { FC } from 'react';
import { TransactionDialog } from './TransactionDialog';

interface ITransactionHeader {
  incomes: number;
  expenses: number;
}

export const TransactionHeader: FC<ITransactionHeader> = ({
  incomes,
  expenses,
}) => {
  return (
    <header className="flex flex-col">
      <h2 className="font-bold text-2xl">Transactions</h2>
      <div className="flex justify-between items-center w-100">
        <p className="text-sm text-neutral_1">
          You had {incomes} incomes and {expenses} expenses this month
        </p>

        <ul>
          <li>
            <TransactionDialog />
          </li>
        </ul>
      </div>
    </header>
  );
};
