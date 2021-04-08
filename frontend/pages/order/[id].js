import PropTypes from 'prop-types';
import Order from '../../components/Order';

export default function SingleOrderPage({ query }) {
  return <Order id={query.id} />;
}

SingleOrderPage.propTypes = {
  query: PropTypes.object.isRequired,
};
