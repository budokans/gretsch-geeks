import PropTypes from 'prop-types';

export default function DeleteProduct({ id, children }) {
  return (
    <button
      type="button"
      onClick={() =>
        confirm(
          "Are you sure you want to delete this product? There's no going back!"
        )
      }
    >
      {children}
    </button>
  );
}

DeleteProduct.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
