import { useMercure } from '@liinkiing/use-mercure';
import { Session, useSession } from 'next-auth/client';
import React from 'react';

import { Check } from '../../lib/model';
import { useNotification } from '../../lib/state/notification';
import { Notification } from './Notification';

let session: Session | null | undefined;

export const NotificationList: React.FunctionComponent = () => {
  const { notifications, showNotification } = useNotification();
  [session] = useSession();

  useMercure<Check>(
    `${process.env.NEXT_PUBLIC_API_TOPIC}/checks/{id}`,
    (message: Check) => {
      if (session && session.user.name === message.person.username) return;

      showNotification(
        message.room.name,
        `${message.person.username} ha ${message.outAt ? 'salido' : 'entrado'}`
      );
    }
  );

  return (
    <div className="flex flex-col absolute top-14 right-6 z-10">
      {notifications.map((notification) => (
        <Notification key={notification.id} {...notification} />
      ))}
    </div>
  );
};
