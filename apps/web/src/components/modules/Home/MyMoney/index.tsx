import { COOKIES } from '@moneytrack/web/constants';
import { getCookieString } from '@moneytrack/web/lib/cookies';
import { getMoneyAccountService } from '@moneytrack/web/services/money-account.service';
import { cookies } from 'next/headers';
import { MoneyAccount } from './MoneyAccount';
import { MoneySettings } from './MoneySettings';
import { IncomesWithExpenses } from './IncomesWithExpenses';
import { MyCategories } from './MyCategories';

export const MyMoney = async () => {
  const cookiesRes = cookies();
  const sessionCookie = cookiesRes.get(COOKIES.NextAuthSession);
  const sessionCookieString = getCookieString(sessionCookie);

  const myMoneyAccount = await getMoneyAccountService(sessionCookieString);
  if (!myMoneyAccount) {
    return;
  }

  return (
    <div className="flex flex-col gap-20">
      <div className="flex gap-14 md:gap-10 flex-wrap lg:flex-nowrap">
        <MoneyAccount money={myMoneyAccount.money} />
        <div className="w-full flex flex-col gap-7">
          <IncomesWithExpenses
            transactionExpenses={myMoneyAccount.expenseLimit?.counter ?? 0}
            transactionIncomes={myMoneyAccount.incomeGoal?.counter ?? 0}
          />
          <MyCategories sessionCookieString={sessionCookieString} />
        </div>
      </div>

      <MoneySettings
        expenseLimit={myMoneyAccount.expenseLimit}
        incomeGoal={myMoneyAccount.incomeGoal}
        watcherLimit={myMoneyAccount.watcherLimit}
      />
    </div>
  );
};
