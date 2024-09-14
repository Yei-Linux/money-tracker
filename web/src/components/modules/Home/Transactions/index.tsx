import { TransactionsContent } from './Content';
import { TransactionsHeader } from './Header';

export const Transactions = () => {
  return (
    <div className="flex flex-col gap-10 max-w-[1200px] w-full h-full mx-auto">
      <TransactionsHeader />
      <TransactionsContent />
    </div>
  );
};
