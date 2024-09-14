import { useSession } from '@/lib/auth/auth';
import { useAuthStore } from '@/store/auth';
import { useEffect } from 'react';

export const useInitSessionStore = () => {
  const setSession = useAuthStore((store) => store.setSession);
  const { data } = useSession();
  const user = data?.user;

  useEffect(() => {
    if (!user) return;
    setSession(user);
  }, [JSON.stringify(user)]);

  return {};
};
