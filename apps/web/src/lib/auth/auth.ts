import {
  signIn as signInNextAuth,
  signOut as signOutNextAuth,
  useSession as useSessionNextAuth,
} from 'next-auth/react';

import { UserSession } from '@moneytrack/web/types/auth';
import { ServerError } from '@moneytrack/web/errors/ServerError';
import { AUTH_HEADER } from '@moneytrack/web/constants/auth';

import { Crypt } from '@moneytrack/shared/helpers';
import { userModel } from '@moneytrack/shared/models';

export const signIn = signInNextAuth;
export const signOut = signOutNextAuth;
export const useSession = useSessionNextAuth;

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
  const isSamePass = await Crypt.compare(passwordDB, password);
  if (!isSamePass) return null;

  return {
    id: userFound.id,
    email: userFound.email,
    name: userFound.name,
    image: userFound.image,
  };
};

export const getUserIdFromReq = (req: NextRequest) => {
  const userId = req.headers.get(AUTH_HEADER);
  if (!userId) throw new ServerError('UserId is required');

  return userId;
};
