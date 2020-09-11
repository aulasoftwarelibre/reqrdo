import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Props, Title } from './Title';

export default {
  component: Title,
  title: 'Widgets/Title',
} as Meta;

const Template: Story<Props> = (args) => <Title {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'How many people are there?',
};
