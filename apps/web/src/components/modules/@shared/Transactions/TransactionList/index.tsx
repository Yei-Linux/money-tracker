'use client';

import { useDimensions } from '@moneytrack/web/hooks/@shared/useDimensions';
import { TransactionsPhone } from './Phone';
import { TransactionsDesktop } from './Desktop';
import { TransactionsHomeContent } from './type';
import { FC } from 'react';

type TransactionsByDevice = TransactionsHomeContent;

export const TransactionsByDevice: FC<TransactionsByDevice> = ({
  transactions,
}) => {
  const { device } = useDimensions();

  return (
    <>
      {device === 'phone' ? (
        <TransactionsPhone transactions={transactions} />
      ) : (
        <TransactionsDesktop transactions={transactions} />
      )}
    </>
  );
};
