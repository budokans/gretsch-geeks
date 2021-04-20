import PropTypes from 'prop-types';
import UpdateProduct from '../components/UpdateProduct';

export default function UpdatePage({ query }) {
  return <UpdateProduct id={query.id} isOwner={query.isOwner} />;
}

UpdatePage.propTypes = {
  query: PropTypes.object.isRequired,
};
