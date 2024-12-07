import { TitleHeader } from '@moneytrack/web/components/layouts/TitleHeader';
import { ProfileForm } from '@moneytrack/web/components/modules/Settings/BasicInformation';
import { PaymentMethods } from '@moneytrack/web/components/modules/Settings/Billing/PaymentMethods';
import { Plans } from '@moneytrack/web/components/modules/Settings/Billing/Plans';
import { Title } from '@moneytrack/web/components/ui/title';
import { COOKIES } from '@moneytrack/web/constants';
import { WithAuth } from '@moneytrack/web/hocs/WithAuth';
import { getCookieString } from '@moneytrack/web/lib/cookies';
import { getPlansService } from '@moneytrack/web/services/payment/plans.service';
import { getSettingsProfile } from '@moneytrack/web/services/settings-profile.service';
import { cookies } from 'next/headers';

async function SettingsPage() {
  const cookiesRes = cookies();
  const sessionCookie = cookiesRes.get(COOKIES.NextAuthSession);
  const sessionCookieString = getCookieString(sessionCookie);
  const mySettings = await getSettingsProfile(sessionCookieString);
  const plans = await getPlansService();
  const hidePaymentMethods = true;

  if (!mySettings) return;
  const { profile } = mySettings;

  return (
    <div className="flex flex-col gap-10 min-h-screen max-w-[1200px] p-7 md:p-14 m-auto">
      <TitleHeader>My Settings</TitleHeader>

      <ProfileForm {...profile} />
      <div className="flex flex-col gap-7">
        <Title as="h3" className="text-4xl">
          Plans
        </Title>
        <Plans plans={plans} currentPlan={mySettings.profile.plan} />
      </div>

      {!hidePaymentMethods && (
        <div className="flex flex-col gap-7">
          <Title as="h3" className="text-4xl">
            Payment methods
          </Title>
          <PaymentMethods />
        </div>
      )}
    </div>
  );
}

export default WithAuth(SettingsPage);
