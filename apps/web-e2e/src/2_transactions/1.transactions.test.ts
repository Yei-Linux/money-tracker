import { test } from '@playwright/test';
import {
  testCanCreateExpenseTransactionSuccessfully,
  testCanCreateIncomeTransactionSuccessfully,
  testCannotCreateExpenseTransactionBecauseWeDontHaveMoney,
  testVerifyAllSectionBlocks,
} from './shared/transactions';
import {
  testCanActiveExpenseWatcher,
  testCanCreateExpenseLimit,
  testCanCreateIncomeGoal,
  testCanSeeBalanceWithExpensesAndIncomes,
} from './shared/money-settings';
import {
  testShouldShowAllSummarySectionsPage,
  testShouldShowCorrectStats,
} from './shared/summary';

test.describe.serial('Transactions flow', () => {
  test(
    'Should show all section block of home page when user is logged in',
    testVerifyAllSectionBlocks
  );

  test(
    'Should cannot create an expense transaction because we dont have enough money',
    testCannotCreateExpenseTransactionBecauseWeDontHaveMoney
  );

  test(
    'Should can create an income transaction successfuly',
    testCanCreateIncomeTransactionSuccessfully
  );

  test(
    'Should can create an expense transaction successfuly',
    testCanCreateExpenseTransactionSuccessfully
  );

  test(
    'Should can see balance with expenses and incomes computed also categories used in that month successfuly',
    testCanSeeBalanceWithExpensesAndIncomes
  );

  test(
    'Should create EXPENSE LIMIT when user click on My Expense limit card',
    testCanCreateExpenseLimit
  );

  test(
    'Should create INCOME GOAL when user click on My Income goal card',
    testCanCreateIncomeGoal
  );

  test(
    'Should active EXPENSE WATCHER when user click on My Expense watcher card',
    testCanActiveExpenseWatcher
  );

  test(
    'Should show all section block of summary page when user is logged in',
    testShouldShowAllSummarySectionsPage
  );

  test(
    'Should show correct stats when user creates transaction successfully',
    testShouldShowCorrectStats
  );
});
