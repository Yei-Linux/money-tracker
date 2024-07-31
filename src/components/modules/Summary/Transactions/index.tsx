import { TransactionHeader } from './TransactionsHeader';
import { TransactionsGroup } from './TransactionsGroup';

export const Transactions = async () => {
  return (
    <div className="flex flex-col gap-7 w-100">
      <TransactionHeader />
      <TransactionsGroup />
    </div>
  );
};
