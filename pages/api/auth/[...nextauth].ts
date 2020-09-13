import gravatar from 'gravatar';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { InitOptions } from 'next-auth';
import Providers from 'next-auth/providers';

import ProviderUco from '../../../lib/auth/providers/uco';

const options = {
  session: {
    jwt: true,
  },
  // Configure one or more authentication providers
  providers: [
    ProviderUco({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
    // TODO: Load this only in dev
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Usuario', type: 'text' },
        password: { label: 'Clave', type: 'password' },
      },
      authorize: async (_credentials: {
        username: string;
        password: string;
      }) => {
        if (_credentials.username.indexOf('@') < 0) {
          return Promise.resolve(null);
        }

        const user = {
          id: 1,
          name: _credentials.username.split('@')[0],
          email: _credentials.username,
          image: gravatar.url(_credentials.username),
        };

        return Promise.resolve(user);
      },
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
} as InitOptions;

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
  NextAuth(req, res, options);
