import '../styles/index.css';

import { Provider } from 'next-auth/client';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import { ReactElement } from 'react';

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
