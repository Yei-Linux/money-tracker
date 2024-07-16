import { Stats } from '@/components/modules/Summary/Stats';
import { Transactions } from '@/components/modules/Summary/Transactions';

export default async function Home() {
  return (
    <div className="flex flex-col gap-24 min-h-screen max-w-[1200px] p-14 m-auto">
      <Stats />
      <Transactions />
    </div>
  );
}
