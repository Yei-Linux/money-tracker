import { TitleHeader } from '@moneytrack/web/components/layouts/TitleHeader';
import { Plans } from '@moneytrack/web/components/modules/@shared/Plans';
import { COOKIES } from '@moneytrack/web/constants';
import { getCookieString } from '@moneytrack/web/lib/cookies';
import { getPlansService } from '@moneytrack/web/services/payment/plans.service';
import { getSettingsProfile } from '@moneytrack/web/services/settings-profile.service';
import { cookies } from 'next/headers';

async function PlansPage() {
  const cookiesRes = cookies();
  const sessionCookie = cookiesRes.get(COOKIES.NextAuthSession);
  const sessionCookieString = getCookieString(sessionCookie);
  const mySettings = await getSettingsProfile(sessionCookieString);
  const plans = await getPlansService();

  return (
    <div className="flex flex-col items-center gap-10 min-h-[calc(100vh-180px)] max-w-[1500px] p-7 md:p-14 m-auto">
      <TitleHeader>Choose the right pricing plan for you</TitleHeader>

      <Plans plans={plans} currentPlan={mySettings?.profile?.plan} />
    </div>
  );
}

export default PlansPage;
