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
      <li>
        <Link href="/products">Products</Link>
      </li>
      {authenticatedUser ? (
        <>
          <li>
            <Link href="/sell">Sell</Link>
          </li>
          <li>
            <Link href="/orders">Orders</Link>
          </li>
          <li>
            <Link href="/account">Account</Link>
          </li>
          <li>
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
          </li>
          <li>
            <SignOut />
          </li>
        </>
      ) : (
        <Link href="/signin">Sign in</Link>
      )}
    </NavStyles>
  );
}
