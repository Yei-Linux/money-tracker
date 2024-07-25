import { TransactionTypeIds } from '../../db/seeders/transaction-types';

export const trendEmojis = {
  up: '↗️',
  down: '↙️',
};

export const transactionTypeEmojis = {
  [TransactionTypeIds.Income]: '↗️',
  [TransactionTypeIds.Expense]: '↙️',
};

export const DEFAULT_LIMIT = 4;

export const INTIAL_STEP = 0;
export const MAX_AUTH_FORM_STEP = 1;

export const PASSWORD_VALIDATOR_SETTINGS = {
  min: 8,
};

export const AUTH_HEADER = 'x-user-id';
export const I_DONT_HAVE_MONEY = 0;

export const operationsForTransactionTypes = {
  [TransactionTypeIds.Income]: (money: number, transaction: number) =>
    money + transaction,
  [TransactionTypeIds.Expense]: (money: number, transaction: number) =>
    money - transaction,
};
