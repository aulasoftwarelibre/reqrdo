import React from 'react';

import { initialState } from './NotificationReducer';
import { NotificationActions, NotificationState } from './NotificationTypes';

export const NotificationContext = React.createContext<{
  state: NotificationState;
  dispatch: (action: NotificationActions) => void;
}>({
  state: initialState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
});

export default NotificationContext;
