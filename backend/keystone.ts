import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { User } from './schemas/User';

const databaseURL = process.env.DATABASE_URL;

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET,
};

export default config({
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
  }),
  ui: {
    // TO DO: change this for roles
    isAccessAllowed: () => true,
  },
  // TO DO: add session values here
});
