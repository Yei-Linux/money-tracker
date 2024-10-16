import { sectionsTestIds } from '@moneytrack/shared/constants';
import { MoneyCurrency } from '../../../@shared/MoneyCurrency';

type TotalBalance = {
  money: number;
};

export const TotalBalance = ({ money }: TotalBalance) => {
  return (
    <div
      data-testid={sectionsTestIds.FAKECARD_SECTION}
      className="min-w-[200px] md:min-w-[300px] bg-black text-white rounded-2xl p-4 flex flex-col gap-10 shadow-md"
    >
      <div className="flex justify-between">
        <p>Total Balance</p>
      </div>

      <div data-testid={sectionsTestIds.FAKECARD_TOTAL_BALANCE_SECTION}>
        <MoneyCurrency money={money} variant="2xl" />
      </div>
    </div>
  );
};
