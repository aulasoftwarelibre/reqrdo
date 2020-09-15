import { render, screen } from '@testing-library/react';
import React from 'react';

import { Props } from './CircularProgressBar';
import { Default } from './CircularProgressBar.stories';

describe('CircularProgressBar', () => {
  it('render CircularProgressBar', () => {
    render(<Default {...(Default.args as Props)} />);
    expect(screen.getByTestId('circular-progress-bar'));
  });
});
