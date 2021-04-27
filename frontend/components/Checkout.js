import styled from 'styled-components';
import PropTypes from 'prop-types';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import nProgress from 'nprogress';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import { useCartContext } from '../lib/cartState';
import SickButton from './styles/SickButton';
import { CURRENT_USER_QUERY, useUser } from './User';
import { USER_ORDERS_QUERY } from './Orders';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;

  p {
    font-size: 12px;
  }
`;

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

function CheckoutForm({ disabled }) {
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const router = useRouter();
  const { closeCart } = useCartContext();
  const stripe = useStripe();
  const elements = useElements();
  const me = useUser();

  const [checkout, { error: gqlError }] = useMutation(CREATE_ORDER_MUTATION, {
    refetchQueries: [
      { query: CURRENT_USER_QUERY },
      { query: USER_ORDERS_QUERY, variables: { id: me.id } },
    ],
  });

  async function handleSubmit(e) {
    // 1. Stop the form from submitting and turn the loader on
    e.preventDefault();
    setLoading(true);

    // 2. Start the page transition
    nProgress.start();

    // 3. Create the payment method via Stripe (token comes back here if success)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    // 4. Handle any Stripe errors
    if (error) {
      setError(error);
      setLoading(false);
      nProgress.done();
      return;
    }

    // 5. Send token to Keystone server via custom mutation
    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });

    // 6. Route to the order page
    router.push({ pathname: `/order/${order.data.checkout.id}` });

    // 7. Close cart
    closeCart();

    // 8. Turn off loader
    setLoading(false);
    nProgress.done();

    // 9. Clear CardElement
    elements.getElement(CardElement).clear();
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p>{error.message}</p>}
      {gqlError && <p>{gqlError.message}</p>}

      <CardElement />
      <SickButton
        type="submit"
        disabled={loading || disabled}
        aria-disabled={loading}
      >
        Pay Now
      </SickButton>
    </CheckoutFormStyles>
  );
}

export default function Checkout({ disabled }) {
  const [stripePromise, setStripePromise] = useState(() =>
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)
  );

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm disabled={disabled} />
    </Elements>
  );
}

Checkout.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

CheckoutForm.propTypes = {
  disabled: PropTypes.bool.isRequired,
};
