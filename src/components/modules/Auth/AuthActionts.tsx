'use client';
import { useAuthSession } from '@/hooks/useAuthSession';
import { signIn } from '@/lib/auth';
import { Signup } from './Popup';

export const AuthActions = () => {
  const { user } = useAuthSession();

  return (
    <>
      {!user && (
        <li
          onClick={() =>
            signIn('credentials', {
              email: 'test@gmail.com',
              password: '123',
              redirect: false,
            })
          }
        >
          Sign In
        </li>
      )}
      {!user && <Signup />}
    </>
  );
};
