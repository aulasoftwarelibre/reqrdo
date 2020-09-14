import gravatar from 'gravatar';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { InitOptions } from 'next-auth';
import Providers from 'next-auth/providers';

import jwk from '../../../config/jwk/private.json';
import ProviderUco from '../../../lib/auth/providers/uco';

const env = process.env.NODE_ENV;
const dev = env !== 'production';

const options = {
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.SECRET,
    signingKey: JSON.stringify(jwk),
    verificationOptions: {
      algorithms: ['RS256'],
    },
  },
  providers: [
    ProviderUco({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
} as InitOptions;

if (dev) {
  options.providers = [
    ...options.providers,
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
          name: _credentials.username.split('@')[0],
          email: _credentials.username,
          image: gravatar.url(_credentials.username),
        };

        return Promise.resolve(user);
      },
    }),
  ];
}

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
  NextAuth(req, res, options);
