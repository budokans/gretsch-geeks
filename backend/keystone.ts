import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import 'dotenv/config';

// What database is Keystone connecting to
const databaseURL = process.env.DATABASE_URL;

// What session configuration is each connected governed by
const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  // Which schema is responsible for user authentication
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  // In case no user exists yet
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TO DO: add initial roles here
  },
});

// What frontend server is connecting to the Keystone backend, which db typ etc
export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      // TO DO: add seed data
    },
    lists: createSchema({
      // TO DO: add schema items
      User,
      Product,
    }),
    ui: {
      // Show UI to only those who pass this test
      isAccessAllowed: ({ session }) => !!session?.data,
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: 'id',
    }),
  })
);
