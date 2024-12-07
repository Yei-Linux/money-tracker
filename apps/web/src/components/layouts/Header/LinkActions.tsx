'use client';

import { useAuthStore } from '@moneytrack/web/store/auth';
import Link from 'next/link';
import { SubscriptionAction } from './SubscriptionAction';

export const LinkActions = () => {
  const session = useAuthStore((store) => store.session);

  if (!session) return;
  return (
    <>
      <Link href="/summary" className="hidden md:flex">
        Summary
      </Link>

      {!!session && <SubscriptionAction />}
    </>
  );
};
