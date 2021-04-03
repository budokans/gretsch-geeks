import PropTypes from 'prop-types';
import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  return !query?.token ? (
    <>
      <p>Sorry, your token has expired or was invalid. Please try again.</p>
      <RequestReset />
    </>
  ) : (
    <>
      <Reset />
    </>
  );
}

ResetPage.propTypes = {
  query: PropTypes.object,
};
