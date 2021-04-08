import { KeystoneContext } from '@keystone-next/types';
import { OrderCreateInput } from '../.keystone/schema-types';

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
    resolveFields: `
      id
      name
      email
      cart
    `,
  });

  console.log(user);
  // 3. Calc total price

  // 4. Create the payment
  // 5. Convert CartItems to OrderItems
  // 6. Create and return the Order
}
