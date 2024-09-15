'use server';

import { InvalidFieldFormError } from '@moneytrack/web/errors/InvalidFieldFormError';
import { SignUpError } from '@moneytrack/web/errors/SignUpError';
import {
  SignUpZodSchema,
  TSignUpSchema,
} from '@moneytrack/web/validators/sign-up.validator';
import { userModel } from '@moneytrack/shared/models';

export const signUpServerAction = async (data: TSignUpSchema) => {
  const validation = SignUpZodSchema.safeParse(data);
  if (!validation.success) {
    throw new InvalidFieldFormError(
      'There was an error: ' + validation.error.issues
    );
  }

  try {
    await userModel.create(data);
    return {
      message: 'User Created',
      errors: [],
    };
  } catch (error) {
    throw new SignUpError((error as Error).message);
  }
};
