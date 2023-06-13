import '@/styles/base.css';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Auth from './auth';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

function MyApp({ Component, pageProps}: AppProps) {

  return (
    <SessionProvider session={pageProps.session}>
      <main className={inter.variable}>
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </main>
   </SessionProvider>
  );
}

export default MyApp;
