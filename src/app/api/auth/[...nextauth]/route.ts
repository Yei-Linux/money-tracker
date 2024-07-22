import { envs } from '@/constants/env';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

import { authorize } from '@/lib/auth';
import connectClient from '@/lib/db/mongodb';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  adapter: MongoDBAdapter(connectClient),
  secret: envs.SECRET,
  providers: [
    GoogleProvider({
      clientId: envs.GOOGLE_CLIENT_ID,
      clientSecret: envs.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Sign in',
      credentials: { email: {}, password: {} },
      authorize,
    }),
  ],
  callbacks: {
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
        },
      };
    },
    jwt({ token, user }) {
      return token;
    },
  },
});

export { handler as GET, handler as POST };
