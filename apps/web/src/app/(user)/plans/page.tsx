import { TitleHeader } from '@moneytrack/web/components/layouts/TitleHeader';
import { Plans } from '@moneytrack/web/components/modules/@shared/Plans';
import { getPlansService } from '@moneytrack/web/services/payment/plans.service';

async function PlansPage() {
  const plans = await getPlansService();

  return (
    <div className="flex flex-col items-center gap-10 min-h-[calc(100vh-180px)] max-w-[1500px] p-7 md:p-14 m-auto">
      <TitleHeader>Choose the right pricing plan for you</TitleHeader>

      <Plans plans={plans} />
    </div>
  );
}

export default PlansPage;
