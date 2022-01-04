// TODO: Update styles once component is added to component library
import React from 'react';
import Box from '@mui/material/Box';
import Quote, { QuoteProps } from './Quote';
import { Story, Meta } from '@storybook/react';

import {
  mockQuoteOneColumn,
  mockQuoteTwoColumn
} from './Quote.mock';

type QuoteStory = {
  args?: QuoteProps;
} & Story<QuoteProps>;

const Template: QuoteStory = (args: QuoteProps) => {
  return (
    <Box my={6}>
      <Quote {...args} />
    </Box>
  );
};

export const OneColumn = Template.bind({});
OneColumn.args = { ...mockQuoteOneColumn() };

export const TwoColumn = Template.bind({});
TwoColumn.args = { ...mockQuoteTwoColumn() };

export default {
  title: 'Modules / Quotes',
  component: Quote,
  decorators: [
    (Story?: any, ctx?: any) => {
      return (
        <Story {...ctx.args} />
      );
    }
  ],
  argTypes: {
    variant: {
      name: 'Variant',
      type: 'select',
      options: ['one-column', 'two-column']
    },
    quoteImage: { name: 'Image' },
    authorName: { name: 'Author Name' },
    authorTitle: { name: 'Author Title' },
    id: { table: { disable: true } },
    __typename: { table: { disable: true } }
  }
} as Meta;
