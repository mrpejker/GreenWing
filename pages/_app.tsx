/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-explicit-any */
import '../styles/globals.css';
import 'react-datepicker/dist/react-datepicker.css';
import '@near-wallet-selector/modal-ui/styles.css';
import type {
  AppProps,
  // NextWebVitalsMetric
} from 'next/app';
import App, { AppContext } from 'next/app';

import { withTRPC } from '@trpc/next';
import { AppRouter } from './api/trpc/[trpc]';

import { ThemeProvider } from 'next-themes';

import { WalletSelectorContextProvider } from '../contexts/WalletSelectorContext';

import Head from 'next/head';

import { appWithTranslation } from 'next-i18next';
import Header from '../components/header';
import Footer from '../components/footer';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const setPageBackground = () => {
    switch (router.pathname) {
      case '/':
      case '/404':
        return 'bg-[#343434]';
      case '/about':
      case router.pathname.includes('/blog') && router.pathname:
        return 'bg-[#F5F5F5]';
      case router.pathname.includes('/faq') && router.pathname:
        return 'bg-white';
      default:
        return 'bg-[url(/mission_bg.png)]';
    }
  };
  return (
    <>
      <Head>
        <title>GREENWING</title>
        <meta name="description" content="Revolutionazing SAF management" />
      </Head>
      <ThemeProvider attribute="class">
        <WalletSelectorContextProvider>
          <div
            className={`${setPageBackground()} text-gray-900 dark:text-white font-druk bg-cover bg-no-repeat bg-fixed`}
          >
            <Header />
            <Component {...pageProps} />
            <Footer />
          </div>
        </WalletSelectorContextProvider>
      </ThemeProvider>
    </>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);
  return { ...appProps };
};

// export function reportWebVitals(metric: NextWebVitalsMetric) {
//   console.log('metric: ', metric);
// }

export default withTRPC<AppRouter>({
  config(
    {
      // ctx
    }
  ) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(appWithTranslation(MyApp));
