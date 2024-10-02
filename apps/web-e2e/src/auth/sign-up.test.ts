import { expect, test } from '@playwright/test';
import { signUpSetup } from './setup';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe.serial('Sign Up Flow', () => {
  let uniqueEmail = `jesusalvan2010+${Date.now()}@gmail.com`;

  test('Sign Up successfull', async ({ page }) => {
    await signUpSetup(page);

    await page.getByPlaceholder('Email').fill(uniqueEmail);
    await page.getByPlaceholder('Password').fill('123456789');
    const continueButton = page.locator('button', {
      hasText: 'Continue',
    });
    expect(await continueButton.isVisible()).toBeTruthy();
    await continueButton.click();

    await page.getByPlaceholder('Name').fill('Jesus');
    await page.getByPlaceholder('Phone').fill('956342776');
    const submitButton = page.locator('button', {
      hasText: 'Submit',
    });
    expect(await submitButton.isVisible()).toBeTruthy();
    await submitButton.click();

    const toast = page.getByText('You account was created successfuly');
    await page.waitForTimeout(3000);

    expect(await toast.isVisible()).toBeTruthy();
  });

  test('Sign Up Wrong', async ({ page }) => {
    await signUpSetup(page);

    await page.getByPlaceholder('Email').fill(uniqueEmail);
    await page.getByPlaceholder('Password').fill('123456789');
    const continueButton = page.locator('button', {
      hasText: 'Continue',
    });
    expect(await continueButton.isVisible()).toBeTruthy();
    await continueButton.click();

    await page.getByPlaceholder('Name').fill('Jesus');
    await page.getByPlaceholder('Phone').fill('956342776');
    const submitButton = page.locator('button', {
      hasText: 'Submit',
    });
    expect(await submitButton.isVisible()).toBeTruthy();
    await submitButton.click();

    const toast = page.getByText('This user already exists');
    await page.waitForTimeout(3000);

    expect(await toast.isVisible()).toBeTruthy();
  });
});
