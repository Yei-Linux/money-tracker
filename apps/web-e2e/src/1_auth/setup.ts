import { Page, expect } from '@playwright/test';

export const signUpSetup = async (page: Page) => {
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
};

export const signInSetup = async (page: Page) => {
  await page.goto('/');
  const signInButtonLaunchPopup = page.locator('button', {
    hasText: 'Sign In',
  });

  expect(await signInButtonLaunchPopup.isVisible()).toBeTruthy();

  await signInButtonLaunchPopup.click();

  const signInButton = page.locator('button', {
    hasText: 'Continue with Email',
  });

  expect(await signInButton.isVisible()).toBeTruthy();

  await signInButton.click();
};
