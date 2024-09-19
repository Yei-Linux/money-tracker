import { expect, test } from '@playwright/test';

test('Sign Up successfull', async ({ page }) => {
  await page.goto('/');
  const signInButtonLaunchPopup = page.locator('button', {
    hasText: 'Sign In',
  });
  const signUpButtonLaunchPopup = page.locator('button', { hasText: 'Join' });

  expect(await signInButtonLaunchPopup.isVisible()).toBeTruthy();
  expect(await signUpButtonLaunchPopup.isVisible()).toBeTruthy();

  await signUpButtonLaunchPopup.click();

  const signUpButton = page.locator('button', {
    hasText: 'Register with Email',
  });

  expect(await signUpButton.isVisible()).toBeTruthy();

  await signUpButton.click();
});
