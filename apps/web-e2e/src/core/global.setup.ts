import { resolve } from 'node:path';
import { chromium } from '@playwright/test';
import { userModel } from '@moneytrack/shared/models';

const APP_URL = 'http://localhost:3000';
const userEmail = 'jesusalvan2010@gmail.com';

const globaltSetup = async () => {
  const storagePath = resolve(__dirname, 'storageState.json');

  const browser = await chromium.launch();
  const userPage = await browser.newPage();

  await userModel.findOneAndUpdate(
    { where: { email: userEmail } },
    { upsert: true }
  );

  await userPage.goto(APP_URL);
  const signInButtonLaunchPopup = userPage.locator('button', {
    hasText: 'Sign In',
  });
  await signInButtonLaunchPopup.click();
  const signInButton = userPage.locator('button', {
    hasText: 'Continue with Email',
  });
  await signInButton.click();

  await userPage.getByPlaceholder('Email').fill(userEmail);
  await userPage.getByPlaceholder('Password').fill('12345678');
  const submitButton = userPage.locator('button', {
    hasText: 'Submit',
  });
  await submitButton.click();

  await userPage.waitForURL((url) => url.origin === APP_URL, {
    waitUntil: 'networkidle',
  });
  await userPage.context().storageState({ path: storagePath });
  await browser.close();

  console.log('Running global setup...');
};

export default globaltSetup;
