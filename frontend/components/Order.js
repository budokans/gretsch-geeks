import PropTypes from 'prop-types';

export default function Order({ id }) {
  return <p>This is the page for order {id}</p>;
}

Order.propTypes = {
  id: PropTypes.string.isRequired,
};
