import React from 'react';

import { Session } from '../../model/User/user';
import { Row } from './Row';

export interface Props {
  sessions: Session[];
}

export const List: React.FunctionComponent<Props> = ({ sessions }) => {
  const rows = sessions.map((session: Session) => (
    <Row
      key={session.id}
      name={session.user.name}
      image={session.user.image}
      from={session.from}
      to={session.to}
    ></Row>
  ));

  return (
    <div className="flex-flow space-y-4" data-testid="list">
      {rows}
    </div>
  );
};
