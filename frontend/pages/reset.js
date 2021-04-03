import PropTypes from 'prop-types';
import RequestReset from '../components/RequestReset';

export default function ResetPage({ query }) {
  return !query?.token ? (
    <>
      <p>Sorry, your token has expired or was invalid. Please try again.</p>
      <RequestReset />
    </>
  ) : (
    <>
      <p>Reset your password.</p>
    </>
  );
}

ResetPage.propTypes = {
  query: PropTypes.object,
};
