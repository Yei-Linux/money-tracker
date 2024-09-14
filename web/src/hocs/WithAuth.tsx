import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const WithAuth =
  (Component: React.ElementType) => async (props: any) => {
    const session = await getServerSession(authOptions);
    if (!session) {
      return redirect('/');
    }

    return <Component {...props} />;
  };
