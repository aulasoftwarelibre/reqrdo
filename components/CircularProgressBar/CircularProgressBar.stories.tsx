import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { CircularProgressBar, Props } from './CircularProgressBar';

export default {
  component: CircularProgressBar,
  title: 'Widgets/CircularProgressBar',
} as Meta;

const Template: Story<Props> = (args) => <CircularProgressBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  range: 10,
  value: 8,
};
