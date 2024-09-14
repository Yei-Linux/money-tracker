import { Landing } from '@moneytrack/web/components/modules/Landing';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth/next-auth-options';

export const WithLanding =
  (Component: React.ElementType) => async (props: any) => {
    const session = await getServerSession(authOptions);
    if (!session) {
      return <Landing />;
    }

    return <Component {...props} />;
  };
