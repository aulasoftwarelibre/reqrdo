import React from 'react';

export interface Props {
  text: string;
}

export const Title: React.FunctionComponent<Props> = ({ text }) => (
  <div className="flex m-1 p-1 items-center space-x-4">
    <img
      className="flex-shrink-0 h-5 w-5"
      src="assets/img/ellipse.svg"
      alt="logo"
    />
    <p className="text-white font-medium text-2xl">{text}</p>
  </div>
);
