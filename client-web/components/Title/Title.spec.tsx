import { render } from '@testing-library/react';
import React from 'react';

import { Props } from './Title';
import { Default } from './Title.stories';

describe('Title', () => {
  it('should render a title with logo', () => {
    const { getByText } = render(<Default {...(Default.args as Props)} />);
    getByText((Default.args as Props).text);
  });
});
