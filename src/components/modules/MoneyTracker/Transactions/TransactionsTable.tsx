import { Table, TableRow, TableBody, TableCell } from '@/components/ui/table';
import { TransactionItem } from '@/types/summary';
import { FC } from 'react';

interface ITransactionTable {
  transactions: Array<TransactionItem>;
}

export const TransactionsTable: FC<ITransactionTable> = ({ transactions }) => {
  return (
    <Table>
      <TableBody>
        {transactions.map(({ id, category, title, cost, description }) => (
          <TableRow className="!border-b-2 border-b-accent" key={id}>
            <TableCell className="font-medium">{title}</TableCell>
            <TableCell>{category}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell className="text-right">{cost}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
