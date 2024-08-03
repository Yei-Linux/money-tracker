import { MyMoney } from '@/components/modules/Home/MyMoney';
import { Transactions } from '@/components/modules/Home/Transactions';
import { WithLanding } from '@/hocs/WithLanding';

async function Home() {
  return (
    <div className="grid min-h-screen">
      <MyMoney />
      <Transactions />
    </div>
  );
}

export default WithLanding(Home);
