import '@/styles/global.css';

import type { AppProps } from 'next/app';
import { Hydrate, QueryClientProvider } from 'react-query';

import { client } from '@/services/http';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={client}>
    <Hydrate state={pageProps.dehydratedState}>
      <Component {...pageProps} />
    </Hydrate>
  </QueryClientProvider>
);

export default MyApp;
