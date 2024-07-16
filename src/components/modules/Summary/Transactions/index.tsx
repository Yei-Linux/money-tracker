import { TransactionHeader } from './TransactionsHeader';
import { getCategoriesService } from '@/services/categories.service';
import { getTransactionTypesService } from '@/services/transaction-types.service';
import { TransactionsGroup } from './TransactionsGroup';

export const Transactions = async () => {
  const categories = await getCategoriesService();
  const transactionTypes = await getTransactionTypesService();

  return (
    <div className="flex flex-col gap-7 w-100">
      <TransactionHeader
        transactionTypes={transactionTypes}
        categories={categories}
      />
      <TransactionsGroup />
    </div>
  );
};
