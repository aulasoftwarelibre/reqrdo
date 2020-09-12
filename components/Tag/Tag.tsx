import classnames from 'classnames';
import React from 'react';

export interface Props {
  type: 'green' | 'red';
  text: string;
}

export const Tag: React.FunctionComponent<Props> = ({ type, text }) => {
  const classes = classnames({
    'inline-block text-base px-3 py-1 mr-2 mb-2 rounded-lg': true,
    'bg-green-dark text-green-light': type === 'green',
    'bg-red-dark text-red-light': type === 'red',
  });
  return (
    <div className={classes} data-testid="tag">
      {text}
    </div>
  );
};
