import {
  getSession,
  signIn as signInNextAuth,
  signOut as signOutNextAuth,
} from 'next-auth/react';

import userModel from '@/models/auth/user.model';
import { UserSession } from '@/types/auth';
import { Crypt } from './crypt';
import { ServerError } from '@/errors/ServerError';
import { NextResponse } from 'next/server';
import { AUTH_HEADER } from '@/constants';

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

export const getUserIdFromReq = (req: NextRequest) => {
  const userId = req.headers.get(AUTH_HEADER);
  if (!userId) throw new ServerError('UserId is required');

  return userId;
};

export const isAuthenticatedOnServer = async (
  req: NextRequest,
  resp: NextResponse
) => {
  try {
    const requestForNextAuth = {
      headers: {
        cookie: req.headers.get('cookie') ?? '',
      },
    };

    const session = await getSession({
      req: requestForNextAuth,
    });

    if (session?.user.id) {
      resp.headers.set(AUTH_HEADER, session.user.id);
    }

    return !!session;
  } catch (error) {
    return false;
  }
};
