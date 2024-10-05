import { resolve } from 'node:path';
import { chromium } from '@playwright/test';
import { userModel } from '@moneytrack/shared/models';
import connectDB from '@moneytrack/shared/lib/mongoose';
import { testingInformation } from '../core/constants';
import { resetMainTablesToTestAgainFlows } from './db';

const globaltSetup = async () => {
  const storagePath = resolve(__dirname, 'storageState.json');

  const browser = await chromium.launch();
  const userPage = await browser.newPage();

  await connectDB();
  const user = await userModel.findOne({ email: testingInformation.userEmail });
  if (!user) {
    await userModel.create({
      name: 'Cesar Alvan',
      email: testingInformation.userEmail,
      password: testingInformation.userPassword,
      phone: '999888777',
    });
  }
  await resetMainTablesToTestAgainFlows();

  await userPage.goto(testingInformation.appUrl);
  const signInButtonLaunchPopup = userPage.locator('button', {
    hasText: 'Sign In',
  });
  await signInButtonLaunchPopup.click();
  const signInButton = userPage.locator('button', {
    hasText: 'Continue with Email',
  });
  await signInButton.click();

  await userPage.getByPlaceholder('Email').fill(testingInformation.userEmail);
  await userPage
    .getByPlaceholder('Password')
    .fill(testingInformation.userPassword);
  const submitButton = userPage.locator('button', {
    hasText: 'Submit',
  });
  await submitButton.click();

  await userPage.waitForURL((url) => url.origin === testingInformation.appUrl, {
    waitUntil: 'networkidle',
  });
  await userPage.context().storageState({ path: storagePath });
  await browser.close();

  console.log('Running global setup...');
};

export default globaltSetup;
