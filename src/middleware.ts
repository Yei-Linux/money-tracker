import { isAuthenticatedOnServer } from '@/lib/auth';
import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/api/transactions/:path*', '/api/money-account/:path*'],
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
