'use client';

import { useAuthStore } from '@moneytrack/web/store/auth';
import { CreditCardIcon, CrownIcon, PlayIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

export const LinkActions = () => {
  const session = useAuthStore((store) => store.session);
  if (!session) return;
  return (
    <>
      <Link href="/summary" className="hidden md:flex">
        Summary
      </Link>

      {session.planId ? (
        <Badge>
          Suscribed <CrownIcon />
        </Badge>
      ) : (
        <Link href="/plans">
          <Button className="font-bold gap-1 flex">
            Upgrade <CreditCardIcon />
          </Button>
        </Link>
      )}
    </>
  );
};
