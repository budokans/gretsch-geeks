import styled from 'styled-components';
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

function CheckoutForm() {
  const [error, setError] = useState();
  const router = useRouter();
  const { closeCart } = useCartContext();
  const stripe = useStripe();
  const elements = useElements();
  const [checkout, { error: GqlError }] = useMutation(CREATE_ORDER_MUTATION);

  async function handleSubmit(e) {
    // 1. Stop the form from submitting and turn the loader on
    e.preventDefault();

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
      nProgress.done();
      return;
    }

    // 5. Send token to Keystone server via custom mutation
    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });

    console.log('Payment success');
    console.log(order);

    // 6. Route to the order page
    router.push({ pathname: '/order', query: { id: order.data.checkout.id } });

    // 7. Close cart
    closeCart();

    // 8. Turn off loader
    nProgress.done();
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p>{error.message}</p>}
      {GqlError && <p>{GqlError.message}</p>}

      <CardElement />
      <SickButton type="submit">Pay Now</SickButton>
    </CheckoutFormStyles>
  );
}

export default function Checkout() {
  const [stripePromise, setStripePromise] = useState(() =>
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)
  );

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
