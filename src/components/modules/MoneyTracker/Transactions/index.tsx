import { TransactionHeader } from './TransactionsHeader';
import { getCategoriesService } from '@/services/categories.service';
import { getTransactionTypesService } from '@/services/transaction-types.service';
import { TransactionsGroup } from './TransactionsGroup';
import { TransactionsPagination } from './TransactionsPagination';

export const Transactions = async () => {
  const categories = await getCategoriesService();
  const transactionTypes = await getTransactionTypesService();

  const incomes = 2;
  const expenses = 24;

  return (
    <div className="flex flex-col gap-7 w-100">
      <TransactionHeader
        transactionTypes={transactionTypes}
        categories={categories}
        incomes={incomes}
        expenses={expenses}
      />
      <TransactionsGroup />
      <TransactionsPagination />
    </div>
  );
};
