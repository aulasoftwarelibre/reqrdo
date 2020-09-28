import { Transition } from '@tailwindui/react';
import React from 'react';

import {
  NotificationType,
  useNotification,
} from '../../lib/state/notification';

export const Notification: React.FunctionComponent<NotificationType> = ({
  id,
  title,
  description,
  show,
}) => {
  const { closeNotification } = useNotification();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      closeNotification(id);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Transition
      appear={true}
      show={show}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="shadow-lg rounded-lg bg-purple-regular mx-auto m-2 p-4 notification-box w-64">
        <div className="text-sm font-black pb-2">
          {title}
          <span
            className="float-right cursor-pointer"
            onClick={() => closeNotification(id)}
          >
            <svg
              className="fill-current text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="22"
              height="22"
            >
              <path
                className="heroicon-ui"
                d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"
              />
            </svg>
          </span>
        </div>
        <div className="text-sm tracking-tight ">{description}</div>
      </div>
    </Transition>
  );
};
