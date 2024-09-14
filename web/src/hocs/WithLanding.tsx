import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Landing } from '@/components/modules/Landing';
import { getServerSession } from 'next-auth';

export const WithLanding =
  (Component: React.ElementType) => async (props: any) => {
    const session = await getServerSession(authOptions);
    if (!session) {
      return <Landing />;
    }

    return <Component {...props} />;
  };
