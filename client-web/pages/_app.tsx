import '../styles/index.css';

import { MercureProvider } from '@liinkiing/use-mercure';
import { Provider as AuthProvider } from 'next-auth/client';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import { ReactElement } from 'react';
import { Provider as HttpProvider } from 'use-http';

import { Layout } from '../components';
import { NotificationProvider } from '../lib/state/notification';

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <AuthProvider session={pageProps.session}>
      <HttpProvider url={process.env.NEXT_PUBLIC_API_URL}>
        <MercureProvider
          options={{
            hubUrl:
              process.env.MERCURE_URL ||
              'http://localhost:8080/.well-known/mercure',
            withCredentials: false,
          }}
        >
          <NotificationProvider>
            <Head>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NotificationProvider>
        </MercureProvider>
      </HttpProvider>
    </AuthProvider>
  );
}

export default MyApp;
