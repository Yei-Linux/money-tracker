import { MoneyAccount } from '@/components/modules/Home/MoneyAccount';
import { Transactions } from '@/components/modules/Home/Transactions';
import { WithLanding } from '@/hocs/WithLanding';

async function Home() {
  return (
    <div className="flex flex-col gap-20 min-h-screen">
      <MoneyAccount />
      <Transactions />
    </div>
  );
}

export default WithLanding(Home);
