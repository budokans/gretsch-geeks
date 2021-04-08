import { KeystoneContext } from '@keystone-next/types';
import {
  CartItemCreateInput,
  OrderCreateInput,
} from '../.keystone/schema-types';
import { stripeConfig } from '../lib/stripe';

const graphql = String.raw;

export default async function checkout(
  root: any,
  { token }: { token: string },
  context: KeystoneContext
): Promise<OrderCreateInput> {
  // 1. Ensure user is signed in
  const userId = context.session.itemId;
  if (!userId) {
    throw new Error('Sorry, you must be signed in to create an order.');
  }
  // 2. Query the user
  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: graphql`
      id
      name
      email
      cart {
        id
        quantity
        product {
          id
          name
          price
          description
          photo {
            id
            image {
              publicUrlTransformed
            }
            altText
          }
        }
      }
    `,
  });

  console.dir(user, { depth: null });

  // 3. Calc total price
  const cartItems = user.cart.filter((cartItem) => cartItem.product);
  const totalPrice = cartItems.reduce(function (
    tally: number,
    cartItem: CartItemCreateInput
  ) {
    return tally + cartItem.quantity * cartItem.product.price;
  },
  0);

  console.log(totalPrice);

  // 4. Create the charge with Stripe
  const charge = await stripeConfig.paymentIntents
    .create({
      amount: totalPrice,
      currency: 'USD',
      confirm: true,
      payment_method: token,
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });

  // 5. Convert CartItems to OrderItems
  // 6. Create and return the Order
}
