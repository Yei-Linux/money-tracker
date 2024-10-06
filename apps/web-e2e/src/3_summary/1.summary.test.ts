import { sectionsTestIds } from '@moneytrack/shared/constants';
import { expect, test } from '@playwright/test';

test.describe.serial('Summary Page', () => {
  test('Should show all section block of summary page when user is logged in', async ({
    page,
  }) => {
    await page.goto('/summary');
    await page.waitForTimeout(3000);

    expect(
      await page.getByTestId(sectionsTestIds.CHART_STATS_SECTION).isVisible()
    ).toBeTruthy();
    expect(
      await page
        .getByTestId(sectionsTestIds.TRANSACTION_TYPES_STATS_SECTION)
        .isVisible()
    ).toBeTruthy();
    expect(
      await page
        .getByTestId(sectionsTestIds.TRANSACTIONS_FILTER_SECTION)
        .isVisible()
    ).toBeTruthy();
    expect(
      await page
        .getByTestId(sectionsTestIds.TRANSACTIONS_TABLE_SECTION)
        .isVisible()
    ).toBeTruthy();
  });

  test('Should show correct stats when user creates transaction successfully', async ({
    page,
  }) => {
    await page.goto('/summary');
  });
});
