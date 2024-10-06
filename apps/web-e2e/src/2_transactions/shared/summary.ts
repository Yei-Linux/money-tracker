import {
  elementTestIds,
  sectionsTestIds,
  toastMessages,
} from '@moneytrack/shared/constants';
import { Page, expect } from '@playwright/test';

export const testShouldShowAllSummarySectionsPage = async ({
  page,
}: {
  page: Page;
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
};

export const testShouldShowCorrectStats = async ({ page }: { page: Page }) => {
  await page.goto('/summary');
};
