import { Title } from '@/components/ui/title';
import { Settings } from './Settings';
import { getMoneyAccountService } from '@/services/money-account.service';
import { FakeCard } from './FakeCard';
import { cookies } from 'next/headers';
import { COOKIES } from '@/constants';
import { getCookieString } from '@/lib/cookies';

export const MoneyAccount = async () => {
  const cookiesRes = cookies();
  const sessionCookie = cookiesRes.get(COOKIES.NextAuthSession);
  const sessionCookieString = getCookieString(sessionCookie);

  const myMoneyAccount = await getMoneyAccountService(sessionCookieString);
  if (!myMoneyAccount) {
    return;
  }

  return (
    <div className="flex flex-col gap-7 w-100">
      <Title as="h2">My Personal Budget</Title>
      <div className="flex justify-center">
        <FakeCard moneyAccount={myMoneyAccount.money} userName={''} />
      </div>
      <Settings
        expenseLimit={myMoneyAccount.expenseLimit}
        incomeGoal={myMoneyAccount.incomeGoal}
        watcherLimit={myMoneyAccount.watcherLimit}
      />
    </div>
  );
};
