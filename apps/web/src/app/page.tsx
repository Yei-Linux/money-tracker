import { Greetings } from '@moneytrack/web/components/modules/Home/Greetings';
import { MyMoney } from '@moneytrack/web/components/modules/Home/MyMoney';
import { Transactions } from '@moneytrack/web/components/modules/Summary/Transactions';
import { WithLanding } from '@moneytrack/web/hocs/WithLanding';

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
