import NProgress from 'nprogress';
import Router from 'next/router';
import PropTypes from 'prop-types';
import Page from '../components/Page';
import '../components/styles/nprogress.css';

// Page-top progress bar
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.any,
};
