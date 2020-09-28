import { useSession } from 'next-auth/client';
import React from 'react';

import { Navbar } from '../Navbar';
import { NotificationList } from '../Notification';

export const Layout: React.FunctionComponent = ({ children }) => {
  const [session] = useSession();

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <NotificationList />
      <Navbar session={session} />
      <main className="flex flex-col flex-grow overflow-hidden">
        {children}
      </main>
    </div>
  );
};
