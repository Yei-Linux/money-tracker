import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import fontLocal from 'next/font/local';

import './globals.css';
import { Providers } from './provider';
import { Layout } from '@/components/layouts/Layout';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const snickerSnack = fontLocal({
  src: '../../public/fonts/snickerSnack.otf',
  variable: '--font-snickerSnack',
});

export const metadata: Metadata = {
  title: 'Money Tracker App',
  description: 'Aplication where you can register all your transactions',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(inter.className, snickerSnack.variable, inter.variable)}
      >
        <Providers>
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
