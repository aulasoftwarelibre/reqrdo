export const OPEN_NOTIFICATION_ACTION = '@@reqrdo/OPEN_NOTIFICATION_ACTION';
export const CLOSE_NOTIFICATION_ACTION = '@@reqrdo/CLOSE_NOTIFICATION_ACTION';

export interface NotificationType {
  id: string;
  title: string;
  description: string;
  show: boolean;
}

export interface NotificationState {
  notifications: NotificationType[];
}

export interface OpenNotificationAction {
  type: typeof OPEN_NOTIFICATION_ACTION;
  payload: {
    title: string;
    description: string;
  };
}

export interface CloseNotificationAction {
  type: typeof CLOSE_NOTIFICATION_ACTION;
  payload: {
    id: string;
  };
}

export type NotificationActions =
  | OpenNotificationAction
  | CloseNotificationAction;
