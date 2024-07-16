import {
  signIn as signInNextAuth,
  signOut as signOutNextAuth,
} from 'next-auth/react';

export const signIn = signInNextAuth;
export const signOut = signOutNextAuth;
