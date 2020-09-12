import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Props, Timer } from './Timer';

export default {
  component: Timer,
  title: 'Widgets/Timer',
} as Meta;

const Template: Story<Props> = (args) => <Timer {...args} />;

const from = new Date();
from.setTime(from.valueOf() - 1000 * 3600 * 3.3); // milliseconds * 3.3 hours

const to = new Date();
to.setTime(to.valueOf() - 1000 * 3600 * 3.2); // milliseconds * 3.2 hours

export const FromDateToNow = Template.bind({});
FromDateToNow.args = {
  from: from,
};

export const BetweenTwoDates = Template.bind({});
BetweenTwoDates.args = {
  from: from,
  to: to,
};
