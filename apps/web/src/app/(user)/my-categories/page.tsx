import { CategoriesBoard } from '@moneytrack/web/components/modules/Categories/Board';
import { Title } from '@moneytrack/web/components/ui/title';

async function PricingPage() {
  return (
    <div className="flex flex-col gap-24 min-h-screen p-14 m-auto">
      <Title as="h2">My Categories</Title>
      <CategoriesBoard />
    </div>
  );
}

export default PricingPage;
