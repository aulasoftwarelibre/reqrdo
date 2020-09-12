import { render } from '@testing-library/react';
import React from 'react';

import { Props } from './Timer';
import { BetweenTwoDates } from './Timer.stories';

describe('Timer', () => {
  it('should show duration with padding zeroes', () => {
    const { getByText } = render(
      <BetweenTwoDates {...(BetweenTwoDates.args as Props)} />
    );
    getByText(/00/);
    getByText(/06/);
  });
});
