import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import fontLocal from 'next/font/local';

import './globals.css';
import { Providers } from './provider';
import { cn } from '@moneytrack/web/lib/utils';
import { getCategoriesService } from '@moneytrack/web/services/categories.service';
import { getTransactionTypesService } from '@moneytrack/web/services/transaction-types.service';
import { Layout } from '@moneytrack/web/components/layouts/Layout';
import { cookies } from 'next/headers';
import { COOKIES } from '../constants';
import { getCookieString } from '../lib/cookies';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});
const snickerSnack = fontLocal({
  src: '../../public/fonts/snickerSnack.otf',
  variable: '--font-snickerSnack',
});

export const metadata: Metadata = {
  title: 'Money Tracker App',
  description: 'Aplication where you can register all your transactions',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesRes = cookies();
  const sessionCookie = cookiesRes.get(COOKIES.NextAuthSession);
  const sessionCookieString = getCookieString(sessionCookie);

  const categories = await getCategoriesService(sessionCookieString);
  const transactionTypes = await getTransactionTypesService();

  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          inter.variable,
          roboto_mono.variable,
          snickerSnack.variable
        )}
      >
        <Providers categories={categories} transactionTypes={transactionTypes}>
          <Layout>
            <Layout.Header />
            <Layout.Main>{children}</Layout.Main>
            <Layout.Footer />
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
