import classnames from 'classnames';
import React from 'react';
import Moment from 'react-moment';

export interface Props {
  type: 'green' | 'red';
  text: Date;
}

export const Tag: React.FunctionComponent<Props> = ({ type, text }) => {
  const classes = classnames({
    'inline-block text-xs sm:text-base px-2 sm:px-3 py-1 mr-1 sm:mr-2 sm:mb-2 rounded-lg': true,
    'bg-green-dark text-green-light': type === 'green',
    'bg-red-dark text-red-light': type === 'red',
  });
  return (
    <div className={classes} data-testid="tag">
      <Moment date={text} format={'HH:mm'} />
    </div>
  );
};
