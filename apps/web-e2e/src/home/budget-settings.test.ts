import { expect, test } from '@playwright/test';

test.describe.serial('Budget settings Flow', () => {
  test('Should show my current budget', async ({ page, context }) => {
    await page.goto('/');

    const summaryLabel = page.getByText('Summary');
    await summaryLabel.textContent();
    expect(await summaryLabel.isVisible()).toBeTruthy();

    const userGreetings = page.getByText('Welcome Back Cesar Alvan');
    await userGreetings.textContent();
    expect(await userGreetings.isVisible()).toBeTruthy();
  });
});
