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
      className="flex bg-purple-dark shadow-lg rounded-lg md:mx-auto"
      data-testid="row"
    >
      <div className="flex flex-grow items-start px-4 py-6">
        <img
          className="w-14 h-14 rounded-full object-cover mr-4 mt-2 shadow"
          src={image ?? 'assets/img/avatar.svg'}
          alt="avatar"
          data-testid={image ? 'image' : 'no-image'}
        ></img>
        <div className="flex-col items-start">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold text-white my-1">{name} </h2>
          </div>
          <Tag type="green" text={from}></Tag>
          {to && <Tag type="red" text={to} data-testid="toDate"></Tag>}
        </div>
      </div>
      <div className="flex items-end mr-3">
        <Timer from={from} to={to}></Timer>
      </div>
    </div>
  );
};
