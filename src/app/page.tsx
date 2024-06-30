import { Summary } from '@/components/modules/MoneyTracker/Summary';
import { Transactions } from '@/components/modules/MoneyTracker/Transactions';
import { getCategories } from '@/services/categories.service';

export default async function Home() {
  const categories = await getCategories();

  return (
    <main className="flex flex-col gap-20 min-h-screen max-w-[1200px] p-24 m-auto">
      <Summary />
      <Transactions />
    </main>
  );
}
