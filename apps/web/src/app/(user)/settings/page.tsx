import { ProfileForm } from '@moneytrack/web/components/modules/Settings/BasicInformation';
import { PaymentMethods } from '@moneytrack/web/components/modules/Settings/Billing/PaymentMethods';
import { Plans } from '@moneytrack/web/components/modules/Settings/Billing/Plans';
import { Title } from '@moneytrack/web/components/ui/title';
import { COOKIES } from '@moneytrack/web/constants';
import { getCookieString } from '@moneytrack/web/lib/cookies';
import { getSettingsProfile } from '@moneytrack/web/services/settings-profile.service';
import { cookies } from 'next/headers';

async function SettingsPage() {
  const cookiesRes = cookies();
  const sessionCookie = cookiesRes.get(COOKIES.NextAuthSession);
  const sessionCookieString = getCookieString(sessionCookie);
  const mySettings = await getSettingsProfile(sessionCookieString);

  if (!mySettings) return;
  const { profile } = mySettings;

  return (
    <div className="flex flex-col gap-10 min-h-screen max-w-[1200px] p-14 m-auto">
      <ProfileForm {...profile} />
      <div className="flex flex-col gap-7">
        <Title as="h3" className="text-4xl">
          Plans
        </Title>
        <Plans />
      </div>
      <div className="flex flex-col gap-7">
        <Title as="h3" className="text-4xl">
          Payment methods
        </Title>
        <PaymentMethods />
      </div>
    </div>
  );
}

export default SettingsPage;
