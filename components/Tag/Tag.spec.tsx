import { render, screen } from '@testing-library/react';
import React from 'react';

import { Props } from './Tag';
import { Green, Red } from './Tag.stories';

describe('Tag', () => {
  it('should render green tags', () => {
    render(
      <Green
        {...(Green.args as Props)}
        text={new Date('2020-09-12 01:00:00')}
      />
    );
    expect(screen.getByTestId('tag')).toHaveTextContent('1:00');
    expect(screen.getByTestId('tag')).toHaveClass(
      'bg-green-dark',
      'text-green-light'
    );
  });

  it('should render red tags', () => {
    render(
      <Red {...(Red.args as Props)} text={new Date('2020-09-12 01:00:00')} />
    );
    expect(screen.getByTestId('tag')).toHaveTextContent('1:00');
    expect(screen.getByTestId('tag')).toHaveClass(
      'bg-red-dark',
      'text-red-light'
    );
  });
});
