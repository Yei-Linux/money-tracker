'use client';

import { MoneyAccount } from './MoneyAccount';
import { MoneySettings } from './MoneySettings';
import { IncomesWithExpenses } from './IncomesWithExpenses';
import { MyCategories } from './MyCategories';
import { useFechMoneyAccount } from '@moneytrack/web/hooks/useFetchMoneyAccount';

export const MyMoney = () => {
  const { myMoneyAccount } = useFechMoneyAccount();
  if (!myMoneyAccount) return;

  return (
    <div className="flex flex-col gap-20">
      <div className="flex gap-14 md:gap-10 flex-wrap lg:flex-nowrap">
        <MoneyAccount
          money={myMoneyAccount.money}
          moneyByMonth={myMoneyAccount.moneyByMonth}
        />
        <div className="w-full flex flex-col gap-7">
          <IncomesWithExpenses
            transactionExpenses={myMoneyAccount.expenseLimit?.counter ?? 0}
            transactionIncomes={myMoneyAccount.incomeGoal?.counter ?? 0}
          />
          <MyCategories />
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
