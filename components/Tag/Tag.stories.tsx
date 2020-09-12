import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Props, Tag } from './Tag';

export default {
  component: Tag,
  title: 'Widgets/Tag',
} as Meta;

const Template: Story<Props> = (args) => <Tag {...args} />;

export const Green = Template.bind({});
Green.args = {
  type: 'green',
  text: '09:15',
};

export const Red = Template.bind({});
Red.args = {
  type: 'red',
  text: '11:35',
};
