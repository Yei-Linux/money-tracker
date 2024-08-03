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

export const WatcherToggleSettings = {
  Active: 'You have actived it! 😉',
  Inactive: 'You dont active it yet 😔',
};

export const COOKIES = {
  NextAuthSession: 'next-auth.session-token',
};

export const SettingsOptionsKeys = {
  IncomeGoal: 'IncomeGoal',
  ExpenseLimit: 'ExpenseLimit',
  ExpenseWatch: 'ExpenseWatch',
};

export const Breakpoints = {
  phone: 768,
  tablet: 1024,
};
