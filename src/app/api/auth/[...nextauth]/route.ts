import { envs } from '@/constants/env';
import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

import { authorize } from '@/lib/auth/auth';
import connectClient from '@/lib/db/mongodb';

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  adapter: MongoDBAdapter(connectClient),
  secret: envs.TOKEN_SECRET,
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
    jwt({ token, user }) {
      if (!user) {
        return token;
      }
      return {
        ...token,
        id: user.id,
        name: user.name,
      };
    },
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
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
