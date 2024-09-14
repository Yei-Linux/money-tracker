import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../lib/auth/next-auth-options';

export const WithAuth =
  (Component: React.ElementType) => async (props: any) => {
    const session = await getServerSession(authOptions);
    if (!session) {
      return redirect('/');
    }

    return <Component {...props} />;
  };
