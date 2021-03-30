import PropTypes from 'prop-types';

export default function UpdateProduct({ id }) {
  return <p>Update {id}</p>;
}

UpdateProduct.propTypes = {
  id: PropTypes.string.isRequired,
};
