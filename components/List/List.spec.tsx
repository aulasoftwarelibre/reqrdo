import { render, screen } from '@testing-library/react';

import { Props } from './List';
import { Default } from './List.stories';

describe('List', () => {
  it('should render properly', () => {
    render(<Default {...(Default.args as Props)}></Default>);
    expect(screen.getByTestId('list'));
  });
});
