import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { withNextRouter } from 'storybook-addon-next-router';

import { ProfileMenu, Props } from './ProfileMenu';

export default {
  component: ProfileMenu,
  title: 'Widgets/ProfileMenu',
  decorators: [withNextRouter],
} as Meta;

const Template: Story<Props> = (args) => (
  <div className="mx-auto flex float-right">
    <ProfileMenu {...args} />
  </div>
);

export const Default = Template.bind({});
