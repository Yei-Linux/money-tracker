import {
  elementTestIds,
  sectionsTestIds,
  toastMessages,
} from '@moneytrack/shared/constants';
import { Page, expect } from '@playwright/test';

export const testVerifyAllSectionBlocks = async ({ page }: { page: Page }) => {
  await page.goto('/');

  const summaryLabel = page.getByText('Summary');
  await summaryLabel.textContent();
  expect(await summaryLabel.isVisible()).toBeTruthy();

  const userGreetings = page.getByText('Welcome Back Cesar Alvan');
  await userGreetings.textContent();
  expect(await userGreetings.isVisible()).toBeTruthy();

  for (const value of Object.values(sectionsTestIds)) {
    if (
      [
        sectionsTestIds.CHART_STATS_SECTION,
        sectionsTestIds.TRANSACTION_TYPES_STATS_SECTION,
      ].includes(value)
    )
      continue;
    const isVisible = await page.getByTestId(value).isVisible();
    expect(isVisible).toBeTruthy();
  }
};

export const testCannotCreateExpenseTransactionBecauseWeDontHaveMoney = async ({
  page,
}: {
  page: Page;
}) => {
  await page.goto('/');

  const addBtn = page.getByTestId(
    elementTestIds.ADD_POPUP_TRANSACTION_BTN_ELEMENT
  );
  await addBtn.click();

  const transactionForm = page.getByTestId(
    elementTestIds.TRANSACTION_FORM_ELEMENT
  );
  expect(await transactionForm.isVisible()).toBeTruthy();

  await page
    .getByTestId(elementTestIds.TRANSACTIONTYPE_TRANSACTION_SELECT_ELEMENT)
    .press('Enter');
  await page
    .getByTestId(elementTestIds.TRANSACTIONTYPE_TRANSACTION_SELECTLIST_ELEMENT)
    .getByText('↙️ Expense')
    .click();

  await page
    .getByTestId(elementTestIds.CATEGORY_TRANSACTION_SELECT_ELEMENT)
    .press('Enter');
  await page
    .getByTestId(elementTestIds.CATEGORY_TRANSACTION_SELECTLIST_ELEMENT)
    .getByText('🎒 Bought')
    .click();

  await page
    .getByTestId(elementTestIds.TITLE_TRANSACTION_INPUT_ELEMENT)
    .fill('Buying pizza on weeked!');

  await page
    .getByTestId(elementTestIds.DESCRIPTION_TRANSACTION_INPUT_ELEMENT)
    .fill('Just fast food this time');

  await page
    .getByTestId(elementTestIds.PRICE_TRANSACTION_INPUT_ELEMENT)
    .fill('15');

  const createExpenseTransactionBtn = page.getByTestId(
    elementTestIds.ADD_FORM_TRANSACTION_BTN_ELEMENT
  );
  await createExpenseTransactionBtn.click();

  const toast = page.getByText(
    toastMessages.CREATE_TRANSACTION_ERROR_WHEN_YOU_DONT_HAVE_ENOUGH_MONEY
  );
  await page.waitForTimeout(3000);
  expect(await toast.isVisible()).toBeTruthy();
};

export const testCanCreateIncomeTransactionSuccessfully = async ({
  page,
}: {
  page: Page;
}) => {
  await page.goto('/');

  const addBtn = page.getByTestId(
    elementTestIds.ADD_POPUP_TRANSACTION_BTN_ELEMENT
  );
  await addBtn.click();

  const transactionForm = page.getByTestId(
    elementTestIds.TRANSACTION_FORM_ELEMENT
  );
  expect(await transactionForm.isVisible()).toBeTruthy();

  await page
    .getByTestId(elementTestIds.TRANSACTIONTYPE_TRANSACTION_SELECT_ELEMENT)
    .press('Enter');
  await page
    .getByTestId(elementTestIds.TRANSACTIONTYPE_TRANSACTION_SELECTLIST_ELEMENT)
    .getByText('↗️ Income')
    .click();

  await page
    .getByTestId(elementTestIds.CATEGORY_TRANSACTION_SELECT_ELEMENT)
    .press('Enter');
  await page
    .getByTestId(elementTestIds.CATEGORY_TRANSACTION_SELECTLIST_ELEMENT)
    .getByText('💵 Salary')
    .click();

  await page
    .getByTestId(elementTestIds.TITLE_TRANSACTION_INPUT_ELEMENT)
    .fill('Payment for main job!');

  await page
    .getByTestId(elementTestIds.DESCRIPTION_TRANSACTION_INPUT_ELEMENT)
    .fill('Every month is the same amount');

  await page
    .getByTestId(elementTestIds.PRICE_TRANSACTION_INPUT_ELEMENT)
    .fill('4000');

  const createExpenseTransactionBtn = page.getByTestId(
    elementTestIds.ADD_FORM_TRANSACTION_BTN_ELEMENT
  );
  await createExpenseTransactionBtn.click();

  const toast = page.getByText(toastMessages.CREATE_TRANSACTION_SUCCESS);
  await page.waitForTimeout(3000);
  expect(await toast.isVisible()).toBeTruthy();

  const transactionRowTable = page
    .getByTestId(sectionsTestIds.TRANSACTIONS_TABLE_SECTION)
    .getByText('Payment for main job!');
  expect(await transactionRowTable.first().isVisible()).toBeTruthy();
};

export const testCanCreateExpenseTransactionSuccessfully = async ({
  page,
}: {
  page: Page;
}) => {
  await page.goto('/');

  const addBtn = page.getByTestId(
    elementTestIds.ADD_POPUP_TRANSACTION_BTN_ELEMENT
  );
  await addBtn.click();

  const transactionForm = page.getByTestId(
    elementTestIds.TRANSACTION_FORM_ELEMENT
  );
  expect(await transactionForm.isVisible()).toBeTruthy();

  await page
    .getByTestId(elementTestIds.TRANSACTIONTYPE_TRANSACTION_SELECT_ELEMENT)
    .press('Enter');
  await page
    .getByTestId(elementTestIds.TRANSACTIONTYPE_TRANSACTION_SELECTLIST_ELEMENT)
    .getByText('↙️ Expense')
    .click();

  await page
    .getByTestId(elementTestIds.CATEGORY_TRANSACTION_SELECT_ELEMENT)
    .press('Enter');
  await page
    .getByTestId(elementTestIds.CATEGORY_TRANSACTION_SELECTLIST_ELEMENT)
    .getByText('🎒 Bought')
    .click();

  await page
    .getByTestId(elementTestIds.TITLE_TRANSACTION_INPUT_ELEMENT)
    .fill('Buying pizza on weeked!');

  await page
    .getByTestId(elementTestIds.DESCRIPTION_TRANSACTION_INPUT_ELEMENT)
    .fill('Just fast food this time');

  await page
    .getByTestId(elementTestIds.PRICE_TRANSACTION_INPUT_ELEMENT)
    .fill('15');

  const createExpenseTransactionBtn = page.getByTestId(
    elementTestIds.ADD_FORM_TRANSACTION_BTN_ELEMENT
  );
  await createExpenseTransactionBtn.click();

  const toast = page.getByText(toastMessages.CREATE_TRANSACTION_SUCCESS);
  await page.waitForTimeout(3000);
  expect(await toast.isVisible()).toBeTruthy();

  const transactionRowTable = page
    .getByTestId(sectionsTestIds.TRANSACTIONS_TABLE_SECTION)
    .getByText('Buying pizza on weeked!');
  expect(await transactionRowTable.first().isVisible()).toBeTruthy();
};
