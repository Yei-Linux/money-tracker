import { CreditCardIcon, CrownIcon } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import Link from 'next/link';
import { useFetchPaymentSettings } from '@moneytrack/web/hooks/useFetchPaymentSettings';

export const SubscriptionAction = () => {
  const { paymentSettings } = useFetchPaymentSettings();

  return (
    <>
      {paymentSettings?.plan?.type ? (
        <Badge className="py-2 px-4 rounded-sm text-sm flex gap-2">
          Suscribed <CrownIcon />
        </Badge>
      ) : (
        <Link href="/plans">
          <Button className="font-bold gap-1 flex">
            Start Subscription <CreditCardIcon />
          </Button>
        </Link>
      )}
    </>
  );
};
