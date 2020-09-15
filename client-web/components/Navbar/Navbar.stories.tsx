import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { withNextRouter } from 'storybook-addon-next-router';

import { Navbar, Props } from './Navbar';

export default {
  component: Navbar,
  title: 'Widgets/Navbar',
  decorators: [withNextRouter],
} as Meta;

const Template: Story<Props> = (args) => <Navbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  session: undefined,
};
