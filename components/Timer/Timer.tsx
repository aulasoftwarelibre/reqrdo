import React from 'react';

export interface Props {
  from: Date;
  to?: Date;
}

export const Timer: React.FunctionComponent<Props> = ({
  from,
  to = new Date(),
}) => {
  const delta = to.valueOf() - from.valueOf();
  const hours = Math.floor(delta / 1000 / 3600);
  const minutes = Math.floor(delta / 1000 / 60) - hours * 60;

  return (
    <div className="inline-block text-white font-black text-5xl m-2 p-2">
      {hours}
      <span className="text-3xl text-white text-opacity-25 pr-2">h</span>
      {minutes}
      <span className="text-3xl text-white text-opacity-25">m</span>
    </div>
  );
};
