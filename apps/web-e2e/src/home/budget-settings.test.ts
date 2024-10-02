import { expect, test } from '@playwright/test';

test.describe.serial('Budget settings Flow', () => {
  test('Should show my current budget', async ({ page, context }) => {
    await page.goto('/');

    expect(await page.getByText('Summary').isVisible()).toBeTruthy();
  });
});
