import { envs } from '@moneytrack/web/constants/env';
import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

import { authorize } from '@moneytrack/web/lib/auth/auth';
import connectClient from '@moneytrack/web/lib/db/mongodb';
import { createMoneyAccountIfIsNewUser } from '@moneytrack/web/use-cases';

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
  events: {
    async signIn(message) {
      const { isNewUser, user } = message;
      isNewUser && (await createMoneyAccountIfIsNewUser(user.id));
    },
  },
  callbacks: {
    jwt({ token, user, session }) {
      if (session) {
        return {
          ...token,
          name: session.name,
          image: session.image,
          planId: session?.planId,
        };
      }

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
          planId: token?.planId,
        },
      };
    },
  },
};
