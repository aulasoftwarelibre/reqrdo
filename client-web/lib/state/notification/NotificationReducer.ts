import { Reducer } from 'react';
import { v4 as uuid } from 'uuid';

import {
  CLOSE_NOTIFICATION_ACTION,
  NotificationActions,
  NotificationState,
  OPEN_NOTIFICATION_ACTION,
} from './NotificationTypes';

export const initialState: NotificationState = {
  notifications: [],
};

export const reducer: Reducer<NotificationState, NotificationActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case OPEN_NOTIFICATION_ACTION: {
      return {
        ...state,
        notifications: [
          ...state?.notifications.slice(-4),
          {
            id: uuid(),
            title: action.payload.title,
            description: action.payload.description,
            show: true,
          },
        ],
      };
    }

    case CLOSE_NOTIFICATION_ACTION: {
      return {
        ...state,
        notifications: [
          ...state?.notifications.map((notification) => ({
            ...notification,
            show:
              notification.id === action.payload.id ? false : notification.show,
          })),
        ],
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
