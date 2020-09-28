import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Button, Props } from './Button';

export default {
  component: Button,
  title: 'Widgets/Button',
} as Meta;

const Template: Story<Props> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Default button',
};
