import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Props } from './Button';
import { Default } from './Button.stories';

describe('Button', () => {
  it('should render button', () => {
    render(<Default {...(Default.args as Props)} />);
    expect(screen.getByTestId('button'));
  });

  it('should capture clicks', () => {
    const onClickMock = jest.fn();

    render(<Default {...(Default.args as Props)} onClick={onClickMock} />);
    fireEvent.click(screen.getByTestId('button'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
