import PropTypes from 'prop-types';
import SingleProduct from '../../components/SingleProduct';

export default function SingleProductPage({ query }) {
  return (
    <SingleProduct
      id={query.id}
      isOwner={query.isOwner}
      user={query.currentUserId}
    />
  );
}

SingleProductPage.propTypes = {
  query: PropTypes.object,
};
