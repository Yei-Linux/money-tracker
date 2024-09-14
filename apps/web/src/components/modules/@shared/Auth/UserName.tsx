'use client';

import { useAuthStore } from '@moneytrack/web/store/auth';

export const UserName = () => {
  const session = useAuthStore((store) => store.session);

  return <span className="font-bold">{session?.name}</span>;
};
