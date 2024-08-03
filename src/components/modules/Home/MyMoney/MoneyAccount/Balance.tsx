import { TrendUpIcon } from '@/components/ui/icons/TrendUpIcon';
import { FC } from 'react';

export type Balance = {
  money: number;
};

export const Balance: FC<Balance> = ({ money }) => {
  return (
    <div className="rounded-xl h-full shadow-md p-3 flex flex-col items-center gap-3 h-full bg-purple text-white">
      <p className="text-sm">Balance</p>
      <data
        className="text-2xl flex gap-1 items-center font-bold"
        value={money}
      >
        <span className="text-sm">$</span> {money}
      </data>

      <TrendUpIcon fill="white" />
    </div>
  );
};
