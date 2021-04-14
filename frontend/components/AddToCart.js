import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Router from 'next/router';
import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

export default function AddToCart({ id, isLoggedIn }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  function handleClick(e) {
    e.preventDefault();
    if (isLoggedIn) {
      addToCart();
    } else {
      Router.push('/signin');
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      aria-disabled={loading}
    >
      Add{loading && 'ing'} to Cart 🛒
    </button>
  );
}

AddToCart.propTypes = {
  id: PropTypes.string.isRequired,
};
