import { resolve } from 'node:path';
import connectDB from '@moneytrack/shared/lib/mongoose';
import { userModel, sessionModel } from '@moneytrack/shared/models';
import { chromium } from '@playwright/test';

const globaltSetup = async () => {
  const storagePath = resolve(__dirname, 'storageState.json');
  const date = new Date();
  const timestamp = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getTime();
  const sessionToken = '04456e41-ec3b-4edf-92c1-48c14e57cacd2';

  await connectDB();
  const user = await userModel.findOneAndUpdate(
    {
      email: 'jesusalvan2010@gmail.com',
    },
    {
      name: 'Cesar Alvan',
      email: 'jesusalvan2010@gmail.com',
    },
    { upsert: true }
  );

  await sessionModel.findOneAndUpdate(
    { userId: user._id },
    {
      expires: timestamp,
      sessionToken,
    },
    { upsert: true }
  );

  const browser = await chromium.launch();
  const context = await browser.newContext({ storageState: storagePath });

  await context.addCookies([
    {
      name: 'next-auth.session-token',
      value: sessionToken,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
      expires: timestamp / 1000,
    },
  ]);
  await context.storageState({ path: storagePath });
  await browser.close();

  console.log('Running global setup...');
};

export default globaltSetup;
