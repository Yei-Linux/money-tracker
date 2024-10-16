'use client';

import { useAuthStore } from '@moneytrack/web/store/auth';
import Link from 'next/link';

export const LinkActions = () => {
  const session = useAuthStore((store) => store.session);
  if (!session) return;
  return (
    <>
      <Link href="/summary">Summary</Link>
    </>
  );
};
