import { Stats } from '@moneytrack/web/components/modules/Summary/Stats';
import { Transactions } from '@moneytrack/web/components/modules/Summary/Transactions';
import { WithAuth } from '@moneytrack/web/hocs/WithAuth';

async function SummaryPage() {
  return (
    <div className="flex flex-col gap-24 min-h-screen max-w-[1200px] p-14 m-auto">
      <>
        <Stats />
        <Transactions />
      </>
    </div>
  );
}

export default WithAuth(SummaryPage);
