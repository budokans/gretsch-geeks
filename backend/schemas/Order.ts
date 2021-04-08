import { list } from '@keystone-next/keystone/schema';
import { integer, relationship, text } from '@keystone-next/fields';

export const Order = list({
  // TO DO: Access
  fields: {
    total: integer(),
    items: relationship({ ref: 'OrderItem.order', many: true }),
    user: relationship({ ref: 'User.orders' }),
    charge: text(),
  },
  ui: {
    listView: {
      initialColumns: ['user', 'items', 'total'],
    },
  },
});
