import { Landing } from '@moneytrack/web/components/modules/Landing';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth/next-auth-options';
import { getPlansService } from '../services/payment/plans.service';

export const WithLanding =
  (Component: React.ElementType) => async (props: any) => {
    const session = await getServerSession(authOptions);
    const plans = await getPlansService();

    if (!session) {
      return <Landing plans={plans} />;
    }

    return <Component {...props} />;
  };
