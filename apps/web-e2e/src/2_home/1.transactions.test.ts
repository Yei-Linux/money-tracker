import {
  elementTestIds,
  sectionsTestIds,
  toastMessages,
} from '@moneytrack/shared/constants';
import { expect, test } from '@playwright/test';

test.describe.serial('Transactions flow', () => {
  test('Should show all section block of home page when user is logged in', async ({
    page,
  }) => {
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
  });

  test('Should cannot create an expense transaction because we dont have enough money', async ({
    page,
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
      .getByTestId(
        elementTestIds.TRANSACTIONTYPE_TRANSACTION_SELECTLIST_ELEMENT
      )
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
  });

  test('Should can create an income transaction successfuly', async ({
    page,
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
      .getByTestId(
        elementTestIds.TRANSACTIONTYPE_TRANSACTION_SELECTLIST_ELEMENT
      )
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
  });

  test('Should can create an expense transaction successfuly', async ({
    page,
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
      .getByTestId(
        elementTestIds.TRANSACTIONTYPE_TRANSACTION_SELECTLIST_ELEMENT
      )
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
  });

  test('Should can see balance with expenses and incomes computed also categories used in that month successfuly', async ({
    page,
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
  });

  test('Should create EXPENSE LIMIT when user click on My Expense limit card', async ({
    page,
  }) => {
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
  });

  test('Should create INCOME GOAL when user click on My Income goal card', async ({
    page,
  }) => {
    await page.goto('/');

    await page.getByTestId(elementTestIds.INCOME_GOAL_CARD_ELEMENT).click();
    await page
      .getByTestId(elementTestIds.INCOME_GOAL_INPUT_ELEMENT)
      .fill('4500');
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
  });

  test('Should active EXPENSE WATCHER when user click on My Expense watcher card', async ({
    page,
  }) => {
    await page.goto('/');

    await page
      .getByTestId(elementTestIds.EXPENSE_WATCHER_TOGGLE_ELEMENT)
      .click();
    const toast = page.getByText(toastMessages.EXPENSE_WATCHER_ENABLED);
    await page.waitForTimeout(3000);
    expect(await toast.isVisible()).toBeTruthy();
    expect(
      await page
        .getByTestId(elementTestIds.EXPENSE_WATCHER_CARD_ELEMENT)
        .getByText('You have actived it! 😉')
        .isVisible()
    ).toBeTruthy();

    await page
      .getByTestId(elementTestIds.EXPENSE_WATCHER_TOGGLE_ELEMENT)
      .click();
    const toastDisabled = page.getByText(
      toastMessages.EXPENSE_WATCHER_DISABLED
    );
    await page.waitForTimeout(3000);
    expect(await toastDisabled.isVisible()).toBeTruthy();
    expect(
      await page
        .getByTestId(elementTestIds.EXPENSE_WATCHER_CARD_ELEMENT)
        .getByText('You dont active it yet 😔')
        .isVisible()
    ).toBeTruthy();
  });
});
