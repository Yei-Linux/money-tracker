import {
  signIn as signInNextAuth,
  signOut as signOutNextAuth,
} from 'next-auth/react';

import userModel from '@/models/auth/user.model';
import { UserSession } from '@/types/auth';
import { Crypt } from './crypt';

export const signIn = signInNextAuth;
export const signOut = signOutNextAuth;

export const authorize = async (
  credentials: Record<'email' | 'password', string> | undefined
): Promise<UserSession | null> => {
  const email = credentials?.email;
  const password = credentials?.password;

  if (!email) return null;
  if (!password) return null;

  const userFound = await userModel.findOne({ email });
  if (!userFound) return null;

  const passwordDB = userFound.password;
  const isSamePass = Crypt.compare(passwordDB, password);
  if (!isSamePass) return null;

  return {
    id: userFound.id,
    email: userFound.email,
    name: userFound.name,
  };
};
