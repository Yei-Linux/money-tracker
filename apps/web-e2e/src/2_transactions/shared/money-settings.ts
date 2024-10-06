import {
  elementTestIds,
  sectionsTestIds,
  toastMessages,
} from '@moneytrack/shared/constants';
import { Page, expect } from '@playwright/test';

export const testCanSeeBalanceWithExpensesAndIncomes = async ({
  page,
}: {
  page: Page;
}) => {
  await page.goto('/');

  expect(
    await page
      .getByTestId(sectionsTestIds.FAKECARD_TOTAL_BALANCE_SECTION)
      .getByText('3985')
      .isVisible()
  ).toBeTruthy();

  expect(
    await page
      .getByTestId(sectionsTestIds.BALANCE_SECTION)
      .getByText('3985')
      .isVisible()
  ).toBeTruthy();

  expect(
    await page
      .getByTestId(sectionsTestIds.INCOMES_SECTION)
      .getByText('1')
      .isVisible()
  ).toBeTruthy();

  expect(
    await page
      .getByTestId(sectionsTestIds.EXPENSES_SECTION)
      .getByText('1')
      .isVisible()
  ).toBeTruthy();

  expect(
    await page
      .getByTestId(sectionsTestIds.MY_CATEGORIES_SECTION)
      .getByText('💵 Salary')
      .isVisible()
  ).toBeTruthy();
  expect(
    await page
      .getByTestId(sectionsTestIds.MY_CATEGORIES_SECTION)
      .getByText('🎒 Bought')
      .isVisible()
  ).toBeTruthy();
};

export const testCanCreateExpenseLimit = async ({ page }: { page: Page }) => {
  await page.goto('/');

  await page.getByTestId(elementTestIds.EXPENSE_LIMIT_CARD_ELEMENT).click();
  await page
    .getByTestId(elementTestIds.EXPENSE_LIMIT_INPUT_ELEMENT)
    .fill('100');
  await page.getByTestId(elementTestIds.EXPENSE_LIMIT_BUTTON_ELEMENT).click();

  const toast = page.getByText(toastMessages.SET_EXPENSE_LIMIT_SUCCESS);
  await page.waitForTimeout(3000);
  expect(await toast.isVisible()).toBeTruthy();

  expect(
    await page
      .getByTestId(elementTestIds.EXPENSE_LIMIT_CURRENT_VALUE_CARD_ELEMENT)
      .getByText('15')
      .isVisible()
  ).toBeTruthy();
  expect(
    await page
      .getByTestId(elementTestIds.EXPENSE_LIMIT_CURRENT_VALUE_CARD_ELEMENT)
      .getByText('100')
      .isVisible()
  ).toBeTruthy();
  expect(
    await page
      .getByTestId(elementTestIds.EXPENSE_LIMIT_PERCENT_CARD_ELEMENT)
      .getByText('15%')
      .isVisible()
  ).toBeTruthy();
};

export const testCanCreateIncomeGoal = async ({ page }: { page: Page }) => {
  await page.goto('/');

  await page.getByTestId(elementTestIds.INCOME_GOAL_CARD_ELEMENT).click();
  await page.getByTestId(elementTestIds.INCOME_GOAL_INPUT_ELEMENT).fill('4500');
  await page.getByTestId(elementTestIds.INCOME_GOAL_BUTTON_ELEMENT).click();

  const toast = page.getByText(toastMessages.SET_INCOME_GOAL_SUCCESS);
  await page.waitForTimeout(3000);
  expect(await toast.isVisible()).toBeTruthy();

  expect(
    await page
      .getByTestId(elementTestIds.INCOME_GOAL_CURRENT_VALUE_CARD_ELEMENT)
      .getByText('4000')
      .isVisible()
  ).toBeTruthy();
  expect(
    await page
      .getByTestId(elementTestIds.INCOME_GOAL_CURRENT_VALUE_CARD_ELEMENT)
      .getByText('4500')
      .isVisible()
  ).toBeTruthy();
  expect(
    await page
      .getByTestId(elementTestIds.INCOME_GOAL_PERCENT_CARD_ELEMENT)
      .getByText('88.89%')
      .isVisible()
  ).toBeTruthy();
};

export const testCanActiveExpenseWatcher = async ({ page }: { page: Page }) => {
  await page.goto('/');

  await page.getByTestId(elementTestIds.EXPENSE_WATCHER_TOGGLE_ELEMENT).click();
  const toast = page.getByText(toastMessages.EXPENSE_WATCHER_ENABLED);
  await page.waitForTimeout(3000);
  expect(await toast.isVisible()).toBeTruthy();
  expect(
    await page
      .getByTestId(elementTestIds.EXPENSE_WATCHER_CARD_ELEMENT)
      .getByText('You have actived it! 😉')
      .isVisible()
  ).toBeTruthy();

  await page.getByTestId(elementTestIds.EXPENSE_WATCHER_TOGGLE_ELEMENT).click();
  const toastDisabled = page.getByText(toastMessages.EXPENSE_WATCHER_DISABLED);
  await page.waitForTimeout(3000);
  expect(await toastDisabled.isVisible()).toBeTruthy();
  expect(
    await page
      .getByTestId(elementTestIds.EXPENSE_WATCHER_CARD_ELEMENT)
      .getByText('You dont active it yet 😔')
      .isVisible()
  ).toBeTruthy();
};
