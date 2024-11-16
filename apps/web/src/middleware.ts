import { NextResponse } from 'next/server';
import { isAuthenticatedOnServer } from './lib/auth/middleware';

export const config = {
  matcher: [
    '/api/transactions/:path*',
    '/api/money-account/:path*',
    '/api/categories/:path*',
    '/api/settings/:path*',
  ],
  runtime: 'nodejs', // rather than "edge"
  unstable_allowDynamic: [
    '/node_modules/@babel/runtime/regenerator/index.js', // file causing the build error
  ],
};

export async function middleware(req: NextRequest) {
  const headers = new Headers(req.headers);
  const resp = NextResponse.next({
    request: {
      headers,
    },
  });
  const isAuthenticated = await isAuthenticatedOnServer(req, resp);

  if (!isAuthenticated) {
    return new Response(
      JSON.stringify({ message: 'You need to be logged in' }),
      { status: 401 }
    );
  }

  return resp;
}
