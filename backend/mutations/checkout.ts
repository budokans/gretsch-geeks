import { KeystoneContext } from '@keystone-next/types';
import {
  CartItemCreateInput,
  OrderCreateInput,
} from '../.keystone/schema-types';
import { stripeConfig } from '../lib/stripe';
import { Session } from '../types';

const graphql = String.raw;

export default async function checkout(
  root: any,
  { token }: { token: string },
  context: KeystoneContext
): Promise<OrderCreateInput> {
  // 1. Ensure user is signed in
  const session = context.session as Session;
  const userId = session.itemId;

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

  // 3. Calc total price
  const cartItems = user.cart.filter((cartItem) => cartItem.product);
  const totalPrice = cartItems.reduce(function (
    tally: number,
    cartItem: CartItemCreateInput
  ) {
    return tally + cartItem.quantity * cartItem.product.price;
  },
  0);

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
  const orderItems = cartItems.map((cartItem) => ({
    name: cartItem.product.name,
    description: cartItem.product.description,
    price: cartItem.product.price,
    quantity: cartItem.quantity,
    photo: { connect: { id: cartItem.product.photo.id } },
  }));

  // 6. Create and return the Order
  const order = context.lists.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderItems },
      user: { connect: { id: userId } },
    },
  });

  // 7. Clean up any old cart items
  const cartItemIds = user.cart.map((cartItem) => cartItem.id);
  await context.lists.CartItem.deleteMany({ ids: cartItemIds }).catch((err) =>
    console.log(err)
  );

  return order;
}
