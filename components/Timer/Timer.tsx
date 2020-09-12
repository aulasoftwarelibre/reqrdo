import moment from 'moment';
import React from 'react';

export interface Props {
  from: Date;
  to?: Date;
}

export const Timer: React.FunctionComponent<Props> = ({
  from,
  to = new Date(),
}) => {
  const duration = moment.duration(moment(to).diff(moment(from)));

  return (
    <div className="inline-block text-white font-black text-5xl m-2 p-2">
      {duration.hours().toString().padStart(2, '0')}
      <span className="text-3xl text-white text-opacity-25 pr-2">h</span>
      {duration.minutes().toString().padStart(2, '0')}
      <span className="text-3xl text-white text-opacity-25">m</span>
    </div>
  );
};
