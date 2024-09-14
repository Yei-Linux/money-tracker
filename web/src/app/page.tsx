import { Greetings } from '@/components/modules/Home/Greetings';
import { MyMoney } from '@/components/modules/Home/MyMoney';
import { Transactions } from '@/components/modules/Home/Transactions';
import { WithLanding } from '@/hocs/WithLanding';

async function Home() {
  return (
    <div className="min-h-screen max-w-[1200px] p-7 md:p-14 m-auto flex flex-col gap-20">
      <Greetings />
      <MyMoney />
      <Transactions />
    </div>
  );
}

export default WithLanding(Home);
