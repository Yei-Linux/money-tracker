import { TransactionsContent } from './Content';
import { TransactionsHeader } from './Header';

export const Transactions = () => {
  return (
    <div className="bg-muted w-full min-h-[inherit]">
      <div className="flex flex-col gap-14 max-w-[1200px] p-7 md:p-14 w-full h-full mx-auto">
        <TransactionsHeader />
        <TransactionsContent />
      </div>
    </div>
  );
};
