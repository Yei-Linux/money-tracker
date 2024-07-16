import { useSession } from 'next-auth/react';

export const useAuthSession = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return { user };
};
