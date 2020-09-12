import React from 'react';

import { Tag } from '../Tag';
import { Timer } from '../Timer';

export interface Props {
  name: string;
  image?: string;
  from: Date;
  to?: Date;
}

export const Row: React.FunctionComponent<Props> = ({
  name,
  image,
  from,
  to,
}) => {
  return (
    <div
      className="flex bg-purple-dark shadow-lg rounded-lg md:mx-auto px-3 py-4 sm:px-6 sm:py-4"
      data-testid="row"
    >
      <div className="flex-shrink-0">
        <img
          className="w-14 h-14 rounded-full mr-4 mt-2 shadow"
          src={image ?? 'assets/img/avatar.svg'}
          alt="avatar"
        />
      </div>
      <div className="flex-grow ml-4 truncate">
        <div className="text-base sm:text-lg truncate font-semibold text-white my-1">
          {name}
        </div>
        <Tag type="green" text={from}></Tag>
        {to && <Tag type="red" text={to}></Tag>}
      </div>
      <div className="sm:mr-3">
        <Timer from={from} to={to}></Timer>
      </div>
    </div>
  );
};
