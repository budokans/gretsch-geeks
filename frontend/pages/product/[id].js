import PropTypes from 'prop-types';
import SingleProduct from '../../components/SingleProduct';

export default function SingleProductPage({ query }) {
  // Coerce to boolean after arriving via query param as a string
  const isOwner = query.isOwner === 'true';

  return (
    <SingleProduct id={query.id} isOwner={isOwner} user={query.currentUserId} />
  );
}

SingleProductPage.propTypes = {
  query: PropTypes.object,
};
