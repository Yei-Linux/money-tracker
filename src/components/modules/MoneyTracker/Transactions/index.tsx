import { transactionsGroup } from '@/mocks/transactions';
import { TransactionsTable } from './TransactionsTable';
import { TransactionHeader } from './TransactionsHeader';

export const Transactions = () => {
  const entries = Object.entries(transactionsGroup);
  const incomes = 2;
  const expenses = 24;

  return (
    <div className="flex flex-col gap-7 w-100">
      <TransactionHeader incomes={incomes} expenses={expenses} />
      {entries.map(([title, transactions]) => (
        <div className="flex flex-col gap-2" key={title}>
          <h4 className="text-neutral_1">{title}</h4>
          <TransactionsTable transactions={transactions} />
        </div>
      ))}
    </div>
  );
};
