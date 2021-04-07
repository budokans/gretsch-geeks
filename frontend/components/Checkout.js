import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import SickButton from './styles/SickButton';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();

  function handleSubmit(e) {
    // 1. Stop the form from submitting and turn the loader on
    e.preventDefault();
    // 2. Start the page transition
    // 3. Create the payment method via Stripe (token comes back here if success)
    // 4. Handle any Stripe errors
    // 5. Send token to Keystone server via custom mutation
    // 6. Route to the order page
    // 7. Close cart
    // 8. Turn off loader
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      <CardElement />
      <SickButton type="submit">Pay Now</SickButton>
    </CheckoutFormStyles>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}
