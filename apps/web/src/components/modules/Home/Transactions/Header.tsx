import { Title } from '@moneytrack/web/components/ui/title';
import { TransactionDialog } from '../../@shared/Transactions/TransactionDialog';

export const TransactionsHeader = () => {
  return (
    <div className="flex justify-between w-full">
      <Title as="h2">My Transactions</Title>
      <TransactionDialog />
    </div>
  );
};
