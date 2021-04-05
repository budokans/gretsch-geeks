import styled from 'styled-components';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import { useUser } from './User';
import formatMoney from '../lib/formatMoney';

export const Item = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

export default function Cart() {
  const me = useUser();
  if (!me) return null;

  return (
    <CartStyles open>
      <header>
        <Supreme>{me.name}'s cart</Supreme>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          <Cart.Item key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
    </CartStyles>
  );
}

Cart.Item = function CartItem({ cartItem }) {
  const { product } = cartItem;
  const { photo } = cartItem.product;

  return (
    <Item>
      <img
        width="100"
        src={photo.image.publicUrlTransformed}
        alt={photo.altText}
      />
      <h3>{product.name}</h3>
      <p>
        {formatMoney(product.price * cartItem.quantity)} (
        <em>
          {cartItem.quantity} &times; {formatMoney(product.price)}
        </em>
        )
      </p>
    </Item>
  );
};
