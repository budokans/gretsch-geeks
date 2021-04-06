import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Button } from './styles/CartStyles';

// const REMOVE_FROM_CART_MUTATION = gql``;

export default function RemoveFromCart({ id }) {
  return (
    <Button type="button" title="Remove this item from cart">
      x
    </Button>
  );
}

RemoveFromCart.propTypes = {
  id: PropTypes.string.isRequired,
};
