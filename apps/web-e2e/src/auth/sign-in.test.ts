import { test, expect } from '@playwright/test';
import { signInSetup } from './setup';

// test.use({ storageState: { cookies: [], origins: [] } });

test.describe.serial('Sign In Flow', () => {
  test('Sign In SuccessFully', async ({ page }) => {
    await signInSetup(page);

    await page.getByPlaceholder('Email').fill('jesusalvan2010@gmail.com');
    await page.getByPlaceholder('Password').fill('12345678');
    const submitButton = page.locator('button', {
      hasText: 'Submit',
    });
    expect(await submitButton.isVisible()).toBeTruthy();
    await submitButton.click();

    const toast = page.getByText('Login successfull');
    await page.waitForTimeout(3000);
    expect(await toast.isVisible()).toBeTruthy();
  });

  test('Sign In Wrong', async ({ page }) => {
    await signInSetup(page);

    await page.getByPlaceholder('Email').fill('jesusalvan2010@gmail.com');
    await page.getByPlaceholder('Password').fill('123456789');
    const submitButton = page.locator('button', {
      hasText: 'Submit',
    });
    expect(await submitButton.isVisible()).toBeTruthy();
    await submitButton.click();

    const toast = page.getByText('Invalid Credentials');
    await page.waitForTimeout(3000);

    expect(await toast.isVisible()).toBeTruthy();
  });
});
