import { AUTH_HEADER } from '@moneytrack/web/constants/auth';
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';

export const isAuthenticatedOnServer = async (
  req: NextRequest,
  resp: NextResponse
) => {
  try {
    const requestForNextAuth = {
      headers: {
        cookie: req.headers.get('cookie') ?? '',
      },
    };

    const session = await getSession({
      req: requestForNextAuth,
    });

    if (session?.user.id) {
      resp.headers.set(AUTH_HEADER, session.user.id);
    }

    return !!session;
  } catch (error) {
    return false;
  }
};
