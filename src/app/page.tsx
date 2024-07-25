import { MoneyAccount } from '@/components/modules/Home/MoneyAccount';
import { Transactions } from '@/components/modules/Home/Transactions';
import { WithLanding } from '@/hocs/WithLanding';

async function Home() {
  return (
    <div className="flex flex-col gap-24 min-h-screen max-w-[1200px] p-14 m-auto">
      <MoneyAccount />
      <Transactions />
    </div>
  );
}

export default WithLanding(Home);
