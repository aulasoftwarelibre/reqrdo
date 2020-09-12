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
  text: new Date('2020-09-12 09:06:00'),
};

export const Red = Template.bind({});
Red.args = {
  type: 'red',
  text: new Date('2020-09-12 09:06:00'),
};
