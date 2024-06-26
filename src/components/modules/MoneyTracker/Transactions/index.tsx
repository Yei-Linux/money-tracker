import { transactionsGroup } from '@/mocks/transactions';
import { TransactionsTable } from './TransactionsTable';

export const Transactions = () => {
  const entries = Object.entries(transactionsGroup);
  return (
    <div className="flex flex-col gap-7 w-100">
      <h2 className="font-bold text-2xl">Transactions</h2>

      {entries.map(([title, transactions]) => (
        <div className="flex flex-col gap-2">
          <h4 className="text-[#8b8b8b]">{title}</h4>
          <TransactionsTable transactions={transactions} />
        </div>
      ))}
    </div>
  );
};
