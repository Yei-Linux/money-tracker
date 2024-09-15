'use server';

import { SettingsError } from '@moneytrack/web/errors/SettingsError';
import { getAuthSessionInServerAction } from '@moneytrack/web/lib/auth/auth-session-handler';
import { moneyAccountModel } from '@moneytrack/shared/models';

export const toggleWatcherLimitServerAction = async (
  enableWatcherLimit: boolean
) => {
  const user = await getAuthSessionInServerAction();

  try {
    await moneyAccountModel.updateOne(
      {
        user,
      },
      {
        watcherLimit: enableWatcherLimit,
      }
    );
  } catch (error) {
    throw new SettingsError((error as Error).message);
  }
};
