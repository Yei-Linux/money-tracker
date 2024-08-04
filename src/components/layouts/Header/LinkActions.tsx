'use client';

import { useAuthStore } from '@/store/auth';
import Link from 'next/link';

export const LinkActions = () => {
  const session = useAuthStore((store) => store.session);
  if (!session) return;
  return (
    <>
      <li>
        <Link href="/summary">Summary</Link>
      </li>
    </>
  );
};
