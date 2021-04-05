import NProgress from 'nprogress';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { ApolloProvider } from '@apollo/client';
import withApollo from '../lib/withData';
import Page from '../components/Page';
import '../components/styles/nprogress.css';
import { CartContextProvider } from '../lib/cartState';

// Page-top progress bar
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function App({ Component, pageProps, apollo }) {
  return (
    <CartContextProvider>
      <ApolloProvider client={apollo}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    </CartContextProvider>
  );
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.any,
  apollo: PropTypes.object,
};

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withApollo(App);
