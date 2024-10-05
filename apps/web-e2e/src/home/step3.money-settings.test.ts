import { sectionsTestIds } from '@moneytrack/shared/constants';
import { expect, test } from '@playwright/test';

test.describe.serial('Money settings flow', () => {
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

  test('Should create EXPENSE LIMIT when user click on My Expense limit card', async () => {});

  test('Should create INCOME GOAL when user click on My Income goal card', async () => {});

  test('Should active EXPENSE WATCHER when user click on My Expense watcher card', async () => {});
});
