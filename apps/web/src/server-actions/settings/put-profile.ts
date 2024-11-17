'use server';

import { InvalidFieldFormError } from '@moneytrack/web/errors/InvalidFieldFormError';
import { SettingsError } from '@moneytrack/web/errors/SettingsError';
import { getAuthSessionInServerAction } from '@moneytrack/web/lib/auth/auth-session-handler';
import { userModel } from '@moneytrack/shared/models';
import {
  ProfileZodSchema,
  TProfileSchema,
} from '@moneytrack/web/validators/profile.validator';

export const putProfileServerAction = async (data: TProfileSchema) => {
  const validation = ProfileZodSchema.safeParse(data);
  if (!validation.success) {
    throw new InvalidFieldFormError(
      `There was an error: ${validation.error.issues}`
    );
  }
  const user = await getAuthSessionInServerAction();

  try {
    await userModel.updateOne(
      { _id: user },
      {
        name: data.name,
        phone: data.phone,
        country: data.country,
        address: data.address,
      }
    );
  } catch (error) {
    throw new SettingsError((error as Error).message);
  }
};
