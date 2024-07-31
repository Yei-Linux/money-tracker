import { TransactionsContent } from './Content';
import { TransactionsHeader } from './Header';

export const Transactions = () => {
  return (
    <div className="flex flex-col gap-7 max-w-[1200px] p-7 md:py-7 md:px-14 w-full">
      <TransactionsHeader />
      <TransactionsContent />
    </div>
  );
};
