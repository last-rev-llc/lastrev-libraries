import React from 'react';
import Box from '@mui/material/Box';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import Text from './Text';
import mockContent, { complexMock } from './Text.mock';

export default {
  title: '1. LR Components / Text',
  component: Text,
  argTypes: {
    variant: { name: 'Variant' },
    align: {
      name: 'Align',
      control: {
        type: 'inline-radio',
        options: ['left', 'right', 'center']
      },
      table: {
        defaultValue: { summary: 'left' }
      }
    },
    body: { name: 'Body' },
    __typename: { table: { disable: true } },
    id: { table: { disable: true } },
    styles: { table: { disable: true } },
    sx: { table: { disable: true } },
    renderNode: { table: { disable: true } },
    sidekickLookup: { table: { disable: true } }
  }
};

const Template1 = (args: JSX.IntrinsicAttributes) => <Text body={undefined} {...args} />;
export const Plaintext = Template1.bind({});
Plaintext.args = { ...mockContent() };

const Template2 = (args: JSX.IntrinsicAttributes) => <Text body={undefined} {...args} />;
export const Formatted = Template2.bind({});
Formatted.args = {
  ...complexMock(),
  renderNode: {
    [BLOCKS.UL_LIST]: (_: any, children: any) => {
      return children.map((child: any) => (
        <Box component="li" display="flex" alignItems="center">
          <PlayCircleFilledRoundedIcon color="secondary" sx={{ marginRight: 1 }} fontSize="small" />
          {child}
        </Box>
      ));
    },
    [BLOCKS.LIST_ITEM]: (_: any, children: any) => {
      return children;
    }
  }
};
