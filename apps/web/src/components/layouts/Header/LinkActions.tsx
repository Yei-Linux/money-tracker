'use client';

import { useAuthStore } from '@moneytrack/web/store/auth';
import { CreditCardIcon, CrownIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { useFetchPaymentSettings } from '@moneytrack/web/hooks/useFetchPaymentSettings';

export const LinkActions = () => {
  const session = useAuthStore((store) => store.session);
  const { paymentSettings } = useFetchPaymentSettings();

  if (!session) return;
  return (
    <>
      <Link href="/summary" className="hidden md:flex">
        Summary
      </Link>

      {paymentSettings?.plan.type ? (
        <Badge className="py-2 px-4 rounded-sm text-sm flex gap-2">
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
