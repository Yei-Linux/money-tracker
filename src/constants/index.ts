import { transactionTypesSeeder } from '../../db/seeders/transaction-types';

export const trendEmojis = {
  up: '↗️',
  down: '↙️',
};

export const transactionTypeEmojis = {
  [transactionTypesSeeder[0]._id]: '↗️',
  [transactionTypesSeeder[1]._id]: '↙️',
};

export const DEFAULT_LIMIT = 4;

export const INTIAL_STEP = 0;
export const MAX_AUTH_FORM_STEP = 1;

export const PASSWORD_VALIDATOR_SETTINGS = {
  min: 8,
};
