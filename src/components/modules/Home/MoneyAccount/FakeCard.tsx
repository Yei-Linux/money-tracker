import { FC } from 'react';

interface FakeCard {
  moneyAccount: number;
  userName: string;
}

export const FakeCard: FC<FakeCard> = ({ moneyAccount, userName }) => {
  return (
    <div className="min-w-[250px] md:min-w-[300px] bg-black text-white rounded-3xl p-4 flex flex-col gap-10">
      <div className="flex justify-between">
        <data className="text-2xl flex gap-1 items-center" value={moneyAccount}>
          <span className="text-sm">$</span> {moneyAccount}
        </data>
        <img
          width={80}
          className="h-fit"
          src="./assets/visa-black.png"
          alt="visa-card"
        />
      </div>

      <div className="text-md flex gap-2">
        <div>1234</div>
        <div>* * * *</div>
        <div>* * * *</div>
        <div>* * * *</div>
      </div>

      <div className="flex text-xs justify-between">
        <p>{userName}</p>
        <p>01/30</p>
      </div>
    </div>
  );
};
