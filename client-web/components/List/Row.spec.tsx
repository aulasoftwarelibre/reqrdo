import { render, screen } from '@testing-library/react';

import { Props } from './Row';
import { Default, NoAvatar, NoToDate } from './Row.stories';

describe('Row', () => {
  it('should render correctly', () => {
    render(<Default {...(Default.args as Props)}></Default>);
    expect(screen.getByTestId('row'));
    expect(screen.getByRole('img')).not.toHaveAttribute(
      'src',
      'assets/img/avatar.svg'
    );
    expect(screen.queryAllByTestId('tag')).toHaveLength(2);
  });

  it('should render default avatar if image is not provided', () => {
    render(<NoAvatar {...(NoAvatar.args as Props)}></NoAvatar>);
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'assets/img/avatar.svg'
    );
    expect(screen.queryAllByTestId('tag')).toHaveLength(2);
  });

  it('should not render end date if it is not provided', () => {
    render(<NoToDate {...(NoToDate.args as Props)}></NoToDate>);
    expect(screen.queryAllByTestId('tag')).toHaveLength(1);
  });
});
