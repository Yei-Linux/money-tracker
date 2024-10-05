import { sectionsTestIds } from '@moneytrack/shared/constants';
import { UserName } from '@moneytrack/web/components/modules/@shared/Auth/UserName';
import { MoneyCurrency } from '../../../@shared/MoneyCurrency';

type FakeCard = {
  money: number;
};

export const FakeCard = ({ money }: FakeCard) => {
  return (
    <div
      data-testid={sectionsTestIds.FAKECARD_SECTION}
      className="min-w-[200px] md:min-w-[300px] bg-black text-white rounded-2xl p-4 flex flex-col gap-10 shadow-md"
    >
      <div className="flex justify-between">
        <p>Total Balance</p>
        <img
          width={60}
          className="h-fit"
          src="./assets/visa-black.png"
          alt="visa-card"
        />
      </div>

      <div data-testid={sectionsTestIds.FAKECARD_TOTAL_BALANCE_SECTION}>
        <MoneyCurrency money={money} variant="2xl" />
      </div>

      <div className="flex text-xs justify-between">
        <div className="flex flex-col gap-1">
          <p>Card Holder Name</p>
          <UserName />
        </div>

        <div className="flex flex-col gap-1">
          <p>Expiry date</p>
          <p className="font-bold">01/30</p>
        </div>
      </div>
    </div>
  );
};
