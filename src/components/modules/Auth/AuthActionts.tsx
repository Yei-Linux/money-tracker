'use client';
import { useAuthSession } from '@/hooks/useAuthSession';
import { signIn } from '@/lib/auth';

export const AuthActions = () => {
  const { user } = useAuthSession();

  return (
    <>
      {!user && <li onClick={() => signIn()}>Sign In</li>}
      {!user && <li>Sign Up</li>}
    </>
  );
};
