import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { AuthError } from '@/errors/AuthError';
import { getServerSession } from 'next-auth';

export const getAuthSessionInServerAction = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user.id;
  if (!user) throw new AuthError('You are not logged in');

  return user;
};
