import { expect, test } from '@playwright/test';
import { sectionsTestIds } from '@moneytrack/shared/constants';

test.describe.serial('Home Page when user is logged in', () => {
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
      const isVisible = await page.getByTestId(value).isVisible();
      expect(isVisible).toBeTruthy();
    }
  });
});
