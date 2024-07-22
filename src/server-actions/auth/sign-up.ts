'use server';

import userModel from '@/models/auth/user.model';
import { SignUpZodSchema, TSignUpSchema } from '@/validators/sign-up.validator';

export const signUpServerAction = async (data: TSignUpSchema) => {
  const validation = SignUpZodSchema.safeParse(data);
  if (!validation.success) {
    return {
      message: 'There was an error',
      errors: validation.error.issues,
    };
  }

  await userModel.create({ data });
  return {
    message: 'User Created',
    errors: [],
  };
};
