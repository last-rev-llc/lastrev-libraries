import React from 'react';
import { Story, Meta } from '@storybook/react';
import Box from '@mui/material/Box';

import Table, { TableProps } from './Table';
import { tableMock } from './Table.mock';

type TableStory = {
  args?: TableProps;
} & Story<TableProps>;

const Template: TableStory = (args: TableProps) => <Table {...args} />;

export default {
  title: 'Elements / Table',
  component: Table,
  decorators: [
    (Story?: any, ctx?: any) => {
      return (
        <Box p={3}>
          <Story {...ctx.args} />
        </Box>
      );
    }
  ],
  argTypes: {
    richText: { name: 'Rich Text (Table)' },
    id: { table: { disable: true } },
    sidekickLookup: { table: { disable: true } },
    __typename: { table: { disable: true } },
  }
} as Meta;

export const Default = Template.bind({});
Default.args = { ...tableMock };

