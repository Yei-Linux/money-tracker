import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export const getCookieString = (cookie: RequestCookie | undefined) => {
  return cookie ? `${cookie.name}=${cookie.value}` : '';
};
