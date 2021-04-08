import Link from 'next/link';
import { useCartContext } from '../lib/cartState';
import CartCount from './CartCount';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

export default function Nav() {
  const authenticatedUser = useUser();
  const { toggleCartOpen } = useCartContext();

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {authenticatedUser ? (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <button type="button" onClick={toggleCartOpen}>
            Cart
            <CartCount
              count={authenticatedUser.cart.reduce(
                (tally, cartItem) =>
                  tally + (cartItem.product ? cartItem.quantity : 0),
                0
              )}
            />
          </button>
          <SignOut />
        </>
      ) : (
        <Link href="/signin">Sign in</Link>
      )}
    </NavStyles>
  );
}
