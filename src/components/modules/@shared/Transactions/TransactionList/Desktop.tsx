import { FC } from 'react';

import { TransactionsHomeContent } from './type';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { transactionTypesSeeder } from '../../../../../../db/seeders/transaction-types';
import { Badge } from '@/components/ui/badge';
import { getEmoji, getPriceSymbol } from '@/utils/transactions';

type TransactionsDesktop = TransactionsHomeContent;

export const TransactionsDesktop: FC<TransactionsDesktop> = ({
  transactions,
}) => {
  return (
    <Table>
      <TableBody>
        {transactions?.map(
          ({ _id, category, title, price, description, transactionType }) => (
            <TableRow className="!border-b-2 border-b-muted" key={_id}>
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
