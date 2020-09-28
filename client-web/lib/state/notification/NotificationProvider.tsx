import React from 'react';

import NotificationContext from './NotificationContext';
import reducer, { initialState } from './NotificationReducer';

export const NotificationProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};
