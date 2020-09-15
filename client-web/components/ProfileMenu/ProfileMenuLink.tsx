import Link from 'next/link';
import { NextRouter, withRouter } from 'next/router';
import React from 'react';

export interface Props {
  path: string;
  label: string;
  router: NextRouter;
}

export const ProfileMenuLink: React.FunctionComponent<Props> = ({
  label,
  path,
  router,
}) => {
  const isActive = router.pathname === path;

  if (isActive) {
    return (
      <span
        className="block px-4 py-2 text-sm leading-5 font-black text-white hover:bg-purple-light focus:outline-none focus:bg-purple-light transition duration-150 ease-in-out"
        role="menuitem"
        data-testid="active-profile-link"
      >
        {label}
      </span>
    );
  }

  return (
    <Link href={path}>
      <a
        className="block px-4 py-2 text-sm leading-5 text-white hover:bg-purple-light focus:outline-none focus:bg-purple-light transition duration-150 ease-in-out"
        role="menuitem"
        data-testid="profile-link"
      >
        {label}
      </a>
    </Link>
  );
};

export default withRouter(ProfileMenuLink);
