import { FC } from "react";

import { TransactionsHomeContent } from "./type";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { TransactionTypeIds } from "../../../../../../db/seeders/transaction-types";
import { Badge } from "@/components/ui/badge";
import { getEmoji, getPriceSymbol } from "@/utils/transactions";
import { TransactionTypeIcon } from "./TransactionTypeIcon";
import { MoneyCurrency } from "../../MoneyCurrency";
import { EmptyState } from "@/components/ui/empty";

type TransactionsDesktop = TransactionsHomeContent;

export const TransactionsDesktop: FC<TransactionsDesktop> = ({
  transactions,
}) => {
  return (
    <Table>
      <TableBody>
        <EmptyState isOnTable>
          {transactions?.map(
            ({ _id, category, title, price, description, transactionType }) => (
              <TableRow className="!border-none" key={_id}>
                <TableCell className="font-medium">
                  <TransactionTypeIcon transactionType={transactionType} />
                </TableCell>
                <TableCell className="font-medium">
                  {getEmoji(transactionType)} {title}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{category.category}</Badge>
                </TableCell>
                <TableCell>{description}</TableCell>
                <TableCell
                  className={cn("text-right font-bold", {
                    "text-success":
                      transactionType._id === TransactionTypeIds.Income,
                    "text-danger":
                      transactionType._id === TransactionTypeIds.Expense,
                  })}
                >
                  <span className="flex gap-2">
                    {getPriceSymbol(transactionType)}
                    <MoneyCurrency money={price} variant="sm" />
                  </span>
                </TableCell>
              </TableRow>
            )
          )}
        </EmptyState>
      </TableBody>
    </Table>
  );
};
