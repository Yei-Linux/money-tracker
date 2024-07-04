import { transactionTypeEmojis } from '@/components/constants';
import { Badge } from '@/components/ui/badge';
import { Table, TableRow, TableBody, TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { TTransaction } from '@/types/transactions';
import { FC } from 'react';
import { transactionTypesSeeder } from '../../../../../db/seeders/transaction-types';

interface ITransactionTable {
  transactions: Array<TTransaction>;
}

export const TransactionsTable: FC<ITransactionTable> = ({ transactions }) => {
  const getEmoji = (transactionType: TTransaction['transactionType']) => {
    if (!Object.hasOwn(transactionTypeEmojis, transactionType._id)) {
      return '';
    }

    return transactionTypeEmojis[
      transactionType._id as keyof typeof transactionTypeEmojis
    ];
  };

  const getPriceSymbol = (transactionType: TTransaction['transactionType']) =>
    transactionType._id === transactionTypesSeeder[0]._id ? '+' : '-';

  return (
    <Table>
      <TableBody>
        {transactions.map(
          ({ _id, category, title, price, description, transactionType }) => (
            <TableRow className="!border-b-2 border-b-accent" key={_id}>
              <TableCell className="font-medium">
                {getEmoji(transactionType)} {title}
              </TableCell>
              <TableCell>
                <Badge variant="outline">{category.category}</Badge>
              </TableCell>
              <TableCell>{description}</TableCell>
              <TableCell
                className={cn('text-right font-bold', {
                  'text-success':
                    transactionType._id === transactionTypesSeeder[0]._id,
                })}
              >
                {getPriceSymbol(transactionType)}
                {price}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};
