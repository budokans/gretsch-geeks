import PropTypes from 'prop-types';

export default function DeleteProduct({ id, children }) {
  return <button type="button">{children}</button>;
}

DeleteProduct.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
