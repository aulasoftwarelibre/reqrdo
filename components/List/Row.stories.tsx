import { Meta, Story } from '@storybook/react/types-6-0';
import faker from 'faker';
import React from 'react';

import { Props, Row } from './Row';

export default {
  component: Row,
  title: 'Widgets/Row',
} as Meta;

const Template: Story<Props> = (args) => <Row {...args} />;

const from = new Date();
from.setTime(from.valueOf() - 1000 * 3600 * 6.5); // milliseconds * 6.5 hours

const to = new Date();
to.setTime(to.valueOf() - 1000 * 3600 * 3.2);

export const Default = Template.bind({});
Default.args = {
  name: faker.name.firstName(),
  image: faker.image.avatar(),
  from: from,
  to: to,
};

export const NoAvatar = Template.bind({});
NoAvatar.args = {
  name: faker.name.firstName(),
  from: from,
  to: to,
};

export const NoToDate = Template.bind({});
NoToDate.args = {
  image: faker.image.avatar(),
  name: faker.name.firstName(),
  from: from,
};
