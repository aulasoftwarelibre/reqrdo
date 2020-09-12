import { render, screen } from '@testing-library/react';

import { Props } from './Row';
import { Default, NoAvatar, NoToDate } from './Row.stories';

describe('Row', () => {
  it('should render correctly', () => {
    render(<Default {...(Default.args as Props)}></Default>);
    expect(screen.getByTestId('row'));
  });

  it('should render default avatar if image is not provided', () => {
    render(<NoAvatar {...(NoAvatar.args as Props)}></NoAvatar>);
    expect(screen.getByTestId('no-image'));
  });

  it('should not render timer if to date is not provided', () => {
    render(<NoToDate {...(NoToDate.args as Props)}></NoToDate>);
    expect(screen.queryAllByTestId('toDate')).toHaveLength(0);
  });
});
