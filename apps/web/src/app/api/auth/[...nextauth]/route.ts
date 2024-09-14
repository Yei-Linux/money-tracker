import NextAuth from 'next-auth';
import { authOptions } from '@moneytrack/web/lib/auth/next-auth-options';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
