import Head from 'next/head';
import { END } from 'redux-saga';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';

import theme from '../theme';
import { wrapper } from '../store';
import createEmotionCache from '../createEmotionCache';

import '../styles/globals.css';

import Layout from '../components/Layout';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const MyApp = ({ Component, pageProps }) => {
  const emotionCache = clientSideEmotionCache;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>MyShop e-pood</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps({ ctx });
  }

  if (ctx.req) {
    ctx.store.dispatch(END);
    await ctx.store.sagaTask.toPromise();
  }

  return { pageProps };
};

export default wrapper.withRedux(MyApp);
