import { Stats } from '@/components/modules/MoneyTracker/Stats';
import { Transactions } from '@/components/modules/MoneyTracker/Transactions';

export default async function Home() {
  return (
    <main className="flex flex-col gap-20 min-h-screen max-w-[1200px] p-24 m-auto">
      <Stats />
      <Transactions />
    </main>
  );
}
