import { useSession } from '@moneytrack/web/lib/auth/auth';
import { useAuthStore } from '@moneytrack/web/store/auth';
import { useEffect } from 'react';

export const useInitSessionStore = () => {
  const setIsLoading = useAuthStore((store) => store.setIsLoading);
  const setSession = useAuthStore((store) => store.setSession);
  const { data, status } = useSession();
  const user = data?.user;

  useEffect(() => {
    if (!user) return;
    setSession(user);
  }, [JSON.stringify(user)]);

  const handleLoading = () => {
    if (status === 'loading') {
      return setIsLoading(true);
    }

    return setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    handleLoading();
  }, [status]);

  return {};
};
