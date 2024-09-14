import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import fontLocal from 'next/font/local';

import './globals.css';
import { Providers } from './provider';
import { Layout } from '@/components/layouts/Layout';
import { cn } from '@/lib/utils';
import { getCategoriesService } from '@/services/categories.service';
import { getTransactionTypesService } from '@/services/transaction-types.service';

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
  const categories = await getCategoriesService();
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
