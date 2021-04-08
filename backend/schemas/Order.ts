import { list } from '@keystone-next/keystone/schema';
import { integer, relationship, text, virtual } from '@keystone-next/fields';
import formatMoney from '../lib/formatMoney';

export const Order = list({
  // TO DO: Access
  fields: {
    label: virtual({
      graphQLReturnType: 'String',
      resolver(item) {
        return formatMoney(item.total);
      },
    }),
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
