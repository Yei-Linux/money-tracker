'use server';

import { InvalidFieldFormError } from '@/errors/InvalidFieldFormError';
import { SignUpError } from '@/errors/SignUpError';
import userModel from '@/models/auth/user.model';
import { SignUpZodSchema, TSignUpSchema } from '@/validators/sign-up.validator';

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
