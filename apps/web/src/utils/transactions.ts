import { transactionTypeEmojis } from '@moneytrack/web/constants';
import { TTransaction } from '@moneytrack/web/types/transactions';

import { transactionTypesSeeder } from '../../db/seeders/transaction-types';
import { format } from 'date-fns';

export const getEmoji = (transactionType: TTransaction['transactionType']) => {
  if (!transactionTypeEmojis.hasOwnProperty(transactionType._id)) {
    return '';
  }

  return transactionTypeEmojis[
    transactionType._id as keyof typeof transactionTypeEmojis
  ];
};

export const getPriceSymbol = (
  transactionType: TTransaction['transactionType']
) => (transactionType._id === transactionTypesSeeder[0]._id ? '+' : '-');

export const getMonthQueryParam = (monthDate: Date): string =>
  new URLSearchParams({
    month: format(monthDate, 'MM/dd/yyyy'),
  }).toString();
