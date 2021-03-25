import NProgress from 'nprogress';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { ApolloProvider } from '@apollo/client';
import withApollo from '../lib/withData';
import Page from '../components/Page';
import '../components/styles/nprogress.css';

// Page-top progress bar
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function App({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
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
