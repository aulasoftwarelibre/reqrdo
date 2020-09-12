import { render, screen } from '@testing-library/react';
import React from 'react';

import { Props } from './Tag';
import { Green, Red } from './Tag.stories';

describe('Tag', () => {
  it('should render green tags', () => {
    render(<Green {...(Green.args as Props)} text="demo" />);
    expect(screen.getByTestId('tag')).toHaveTextContent('demo');
    expect(screen.getByTestId('tag')).toHaveClass(
      'bg-green-dark',
      'text-green-light'
    );
  });

  it('should render red tags', () => {
    render(<Red {...(Red.args as Props)} text="demo" />);
    expect(screen.getByTestId('tag')).toHaveTextContent('demo');
    expect(screen.getByTestId('tag')).toHaveClass(
      'bg-red-dark',
      'text-red-light'
    );
  });
});
