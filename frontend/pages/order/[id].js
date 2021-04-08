import PropTypes from 'prop-types';
import Order from '../../components/Order';

export default function OrderPage({ query }) {
  console.log(query);

  return <Order id={query.id} />;
}

OrderPage.propTypes = {
  query: PropTypes.object.isRequired,
};
