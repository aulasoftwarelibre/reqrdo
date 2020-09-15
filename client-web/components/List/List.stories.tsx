import { Meta, Story } from '@storybook/react/types-6-0';
import faker from 'faker';
import React from 'react';

import { Session } from '../../model/User/user';
import { List, Props } from './List';

export default {
  component: List,
  title: 'Widgets/List',
} as Meta;

const Template: Story<Props> = (args) => <List {...args} />;

const from = new Date();
from.setTime(from.valueOf() - 1000 * 3600 * 6.5); // milliseconds * 6.5 hours

const to = new Date();
to.setTime(to.valueOf() - 1000 * 3600 * 3.2);

const sessions: Session[] = [...Array(10)].map(
  (): Session => {
    return {
      id: faker.random.uuid(),
      user: {
        id: faker.random.uuid(),
        name: faker.name.findName(),
        image: faker.image.avatar(),
      },
      from: from,
      to: to,
    };
  }
);

export const Default = Template.bind({});
Default.args = {
  sessions: sessions,
};
