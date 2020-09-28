import classnames from 'classnames';
import { Session } from 'next-auth/client';
import React from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';

import { ProfileMenuLink } from '.';

export interface Props {
  session?: Session | null;
}

export const ProfileMenu: React.FunctionComponent<Props> = ({ session }) => {
  const [isHidden, setHidden] = React.useState(true);
  const ref = useOnclickOutside(() => {
    setHidden(true);
  });

  return (
    <div
      className="absolute z-20 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
      date-testid="profile-menu"
    >
      {session && (
        <div className="text-white text-xl font-semibold mr-3">
          {session.user.name}
        </div>
      )}

      <div className="relative">
        <div>
          <button
            className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
            id="profile-menu"
            aria-label="menu"
            aria-haspopup="true"
            onClick={() => setHidden(!isHidden)}
          >
            <img
              src={session?.user?.image ?? 'assets/img/avatar.svg'}
              alt="Avatar de usuario"
              className="h-8 w-8 rounded-full"
            />
          </button>
        </div>
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
          <div
            className={classnames('py-1 rounded-md bg-purple-dark shadow-xs', {
              hidden: isHidden,
            })}
            role="menu"
            ref={ref}
            aria-orientation="vertical"
            aria-labelledby="user-menu"
            data-testid="profile-menu-box"
          >
            {session ? (
              <ProfileMenuLink label={'Salir'} path={'/api/auth/signout'} />
            ) : (
              <ProfileMenuLink label={'Entrar'} path={'/api/auth/signin'} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
