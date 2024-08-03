import { FakeCard } from './FakeCard';
import { Balance } from './Balance';
import { FC } from 'react';

export type MoneyAccount = {
  money: number;
};

export const MoneyAccount: FC<MoneyAccount> = ({ money }) => {
  return (
    <div className="flex gap-4 max-h-[190px] h-full">
      <FakeCard />
      <Balance money={money} />
    </div>
  );
};
