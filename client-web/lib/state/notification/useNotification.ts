import React from 'react';

import NotificationContext from './NotificationContext';
import {
  CLOSE_NOTIFICATION_ACTION,
  NotificationType,
  OPEN_NOTIFICATION_ACTION,
} from './NotificationTypes';

interface Props {
  notifications: NotificationType[];
  showNotification: (title: string, description: string) => void;
  closeNotification: (id: string) => void;
}

export const useNotification = (): Props => {
  const {
    state: { notifications },
    dispatch,
  } = React.useContext(NotificationContext);

  const showNotification = async (title: string, description: string) => {
    dispatch({
      type: OPEN_NOTIFICATION_ACTION,
      payload: { title, description },
    });
  };

  const closeNotification = async (id: string) => {
    dispatch({ type: CLOSE_NOTIFICATION_ACTION, payload: { id } });
  };

  return {
    notifications,
    showNotification,
    closeNotification,
  };
};
