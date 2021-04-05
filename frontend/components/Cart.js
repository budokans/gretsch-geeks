import PropTypes from 'prop-types';
import { Container, Item } from './styles/CartStyles';
import Supreme from './styles/Supreme';
import { useUser } from './User';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCartContext } from '../lib/cartState';

export default function Cart() {
  const { cartOpen } = useCartContext();
  const me = useUser();
  if (!me) return null;

  return (
    <Container open={cartOpen}>
      <header>
        <Supreme>{me.name}'s cart</Supreme>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          <Cart.Item key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
      </footer>
    </Container>
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
        {formatMoney(product.price * cartItem.quantity)}
        <em>
          {` ( ${cartItem.quantity}`} &times;{' '}
          {`${formatMoney(product.price)} )`}
        </em>
      </p>
    </Item>
  );
};

Cart.Item.propTypes = {
  cartItem: PropTypes.object.isRequired,
};
