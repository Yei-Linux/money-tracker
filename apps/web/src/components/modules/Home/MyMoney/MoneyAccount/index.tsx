import { TotalBalance } from './TotalBalance';
import { Balance } from './Balance';
import { FC } from 'react';

export type MoneyAccount = {
  money: number;
  moneyByMonth: number;
};

export const MoneyAccount: FC<MoneyAccount> = ({ money, moneyByMonth }) => {
  return (
    <div className="flex gap-4 max-h-[190px] h-full">
      <TotalBalance money={money} />
      <Balance money={moneyByMonth} />
    </div>
  );
};
