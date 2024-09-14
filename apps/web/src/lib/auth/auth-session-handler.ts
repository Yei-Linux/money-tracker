import { AuthError } from '@moneytrack/web/errors/AuthError';
import { getServerSession } from 'next-auth';
import { authOptions } from './next-auth-options';

export const getAuthSessionInServerAction = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user.id;
  if (!user) throw new AuthError('You are not logged in');

  return user;
};
