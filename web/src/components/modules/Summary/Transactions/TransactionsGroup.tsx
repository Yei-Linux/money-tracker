"use client";

import { TransactionsPagination } from "../../@shared/Transactions/TransactionsPagination";
import { useFetchTransactionsAdapter } from "@/hooks/@shared/useTransactionAdapter";
import { TTransaction } from "@/types/transactions";
import { useTransactionStore } from "@/store/transactions";
import { getTransactionsService } from "@/services/transaction.service";
import { TransactionsByDevice } from "../../@shared/Transactions/TransactionList";
import { EmptyState } from "@/components/ui/empty";

export const TransactionsGroup = () => {
  const { transactions: transactionsGroups, nextCursor } =
    useFetchTransactionsAdapter<
      Record<string, Array<TTransaction>>,
      [string, TTransaction[]][] | undefined
    >({
      useStore: useTransactionStore,
      queryKey: "transactions",
      service: getTransactionsService,
    });

  return (
    <>
      <EmptyState>
        {transactionsGroups?.map(([title, transactions]) => (
          <div className="flex flex-col gap-2" key={title}>
            <h4 className="text-neutral_1">{title}</h4>

            <TransactionsByDevice transactions={transactions} />
          </div>
        ))}
      </EmptyState>

      {nextCursor && <TransactionsPagination useStore={useTransactionStore} />}
    </>
  );
};
