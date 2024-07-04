import { transactionTypesSeeder } from '../../../db/seeders/transaction-types';

export const trendEmojis = {
  up: '↗️',
  down: '↙️',
};

export const transactionTypeEmojis = {
  [transactionTypesSeeder[0]._id]: '↗️',
  [transactionTypesSeeder[1]._id]: '↙️',
};

export const DEFAULT_LIMIT = 4;
