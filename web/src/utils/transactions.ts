import { transactionTypeEmojis } from '@/constants';
import { TTransaction } from '@/types/transactions';

import { transactionTypesSeeder } from '../../db/seeders/transaction-types';

export const getEmoji = (transactionType: TTransaction['transactionType']) => {
  if (!Object.hasOwn(transactionTypeEmojis, transactionType._id)) {
    return '';
  }

  return transactionTypeEmojis[
    transactionType._id as keyof typeof transactionTypeEmojis
  ];
};

export const getPriceSymbol = (
  transactionType: TTransaction['transactionType']
) => (transactionType._id === transactionTypesSeeder[0]._id ? '+' : '-');
