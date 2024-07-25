'use client';

import { useFetchMoneyAccount } from '@/hooks/useFetchMoneyAccount';
import { FakeCard } from './FakeCard';
import { useAuthSession } from '@/hooks/useAuthSession';
import { Title } from '@/components/ui/title';

export const MoneyAccount = () => {
  const { user } = useAuthSession();
  const { myMoneyAccount } = useFetchMoneyAccount();
  if (!myMoneyAccount) return;
  if (!user) return;

  return (
    <div className="flex flex-col gap-7 w-100">
      <Title as="h2">My Personal Budget</Title>
      <div className="flex justify-center">
        <FakeCard
          moneyAccount={myMoneyAccount.money}
          userName={user?.name ?? ''}
        />
      </div>
    </div>
  );
};
