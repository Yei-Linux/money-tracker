import { COOKIES } from '@/constants';
import { getCookieString } from '@/lib/cookies';
import { getMoneyAccountService } from '@/services/money-account.service';
import { cookies } from 'next/headers';
import { MoneyAccount } from './MoneyAccount';
import { MoneySettings } from './MoneySettings';
import { IncomesWithExpenses } from './IncomesWithExpenses';

export const MyMoney = async () => {
  const cookiesRes = cookies();
  const sessionCookie = cookiesRes.get(COOKIES.NextAuthSession);
  const sessionCookieString = getCookieString(sessionCookie);

  const myMoneyAccount = await getMoneyAccountService(sessionCookieString);
  if (!myMoneyAccount) {
    return;
  }

  return (
    <div className="flex flex-col gap-10 p-4">
      <div className="flex gap-10">
        <MoneyAccount money={myMoneyAccount.money} />
        <IncomesWithExpenses transactionExpenses={1} transactionIncomes={4} />
      </div>

      <MoneySettings
        expenseLimit={myMoneyAccount.expenseLimit}
        incomeGoal={myMoneyAccount.incomeGoal}
        watcherLimit={myMoneyAccount.watcherLimit}
      />
    </div>
  );
};
