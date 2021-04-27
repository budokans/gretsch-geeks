import PropTypes from 'prop-types';
import { Container, Item } from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import Supreme from './styles/Supreme';
import { useUser } from './User';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCartContext } from '../lib/cartState';
import RemoveFromCart from './RemoveFromCart';
import Checkout from './Checkout';

export default function Cart() {
  const { cartOpen, toggleCartOpen, node } = useCartContext();
  const me = useUser();
  if (!me) return null;

  return (
    <Container open={cartOpen} ref={node}>
      <header>
        <Supreme>{me.name}'s cart</Supreme>
        <CloseButton type="button" onClick={toggleCartOpen}>
          X
        </CloseButton>
      </header>

      <ul>
        {me.cart.map((cartItem) => (
          <Cart.Item key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>It's on me!</p>
        <p>4242 4242 4242 4242 | 02/22 | 222</p>
        <p className="total">{formatMoney(calcTotalPrice(me.cart))}</p>

        <Checkout disabled={calcTotalPrice(me.cart) === 0} />
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
      <RemoveFromCart id={cartItem.id} />
    </Item>
  );
};

Cart.Item.propTypes = {
  cartItem: PropTypes.object.isRequired,
};
