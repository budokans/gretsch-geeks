import CartStyles from './styles/CartStyles';
import { useUser } from './User';

export default function Cart() {
  const me = useUser();

  return (
    <CartStyles open>
      <p>{me.email}</p>
    </CartStyles>
  );
}
