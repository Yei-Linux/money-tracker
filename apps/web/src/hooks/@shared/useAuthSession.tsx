import { useSession } from '@moneytrack/web/lib/auth/auth';

export const useAuthSession = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  return { user, status };
};
