import { sectionsTestIds } from '@moneytrack/shared/constants';
import { MoneyCurrency } from '@moneytrack/web/components/modules/@shared/MoneyCurrency';
import { TrendUpIcon } from '@moneytrack/web/components/ui/icons/TrendUpIcon';
import { FC } from 'react';

export type Balance = {
  money: number;
};

export const Balance: FC<Balance> = ({ money }) => {
  return (
    <div
      data-testid={sectionsTestIds.BALANCE_SECTION}
      className="rounded-xl shadow-md p-3 flex flex-col items-center gap-3 h-auto bg-purple text-white"
    >
      <p className="text-sm">Balance</p>
      <MoneyCurrency money={money} variant="2xl" />
      <TrendUpIcon fill="white" />
    </div>
  );
};
