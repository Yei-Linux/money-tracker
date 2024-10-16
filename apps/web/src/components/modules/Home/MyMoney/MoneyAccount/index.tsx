import { TotalBalance } from './TotalBalance';
import { Balance } from './Balance';
import { FC } from 'react';

export type MoneyAccount = {
  money: number;
};

export const MoneyAccount: FC<MoneyAccount> = ({ money }) => {
  return (
    <div className="flex gap-4 max-h-[190px] h-full">
      <TotalBalance money={money} />
      <Balance money={money} />
    </div>
  );
};
