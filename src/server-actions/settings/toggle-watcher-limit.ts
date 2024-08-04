'use server';

import { SettingsError } from '@/errors/SettingsError';
import { getAuthSessionInServerAction } from '@/lib/auth/auth-session-handler';
import { moneyAccountModel } from '@/models';

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
