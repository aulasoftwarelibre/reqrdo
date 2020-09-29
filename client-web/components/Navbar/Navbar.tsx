import { Session } from 'next-auth/client';
import React from 'react';

import { ProfileMenu } from '../ProfileMenu';

export interface Props {
  session?: Session | null;
}

export const Navbar: React.FunctionComponent<Props> = ({ session }) => {
  return (
    <nav data-testid="navbar">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <img
                className="block sm:hidden h-8 w-auto"
                src="assets/img/ellipse.svg"
                alt="Logo de la aplicación"
              />
              <img
                className="hidden sm:block h-8 w-auto"
                src="assets/img/logo.svg"
                alt="Logo de la aplicación"
              />
            </div>
          </div>
          <ProfileMenu session={session} />
        </div>
      </div>
    </nav>
  );
};
