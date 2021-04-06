import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Button } from './styles/CartStyles';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function RemoveFromCart({ id }) {
  const [deleteCartItem, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    update,
  });

  return (
    <Button
      type="button"
      title="Remove this item from cart"
      disabled={loading}
      aria-disabled={loading}
      onClick={deleteCartItem}
    >
      x
    </Button>
  );
}

RemoveFromCart.propTypes = {
  id: PropTypes.string.isRequired,
};
