import React from 'react';
import Box from '@material-ui/core/Box';
import PlayCircleFilledRoundedIcon from '@material-ui/icons/PlayCircleFilledRounded';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import Text from './Text';
import mockContent, { complexMock } from './Text.mock';

export default {
  title: '2. Modules / Text',
  component: Text,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box m={5}>{storyFn()}</Box>
    )
  ],
  argTypes: {
    variant: { name: 'Variant' },
    align: {
      name: 'Align',
      control: {
        type: 'inline-radio',
        options: [
          'left',
          'right',
          'center'
        ]
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

const Template1 = (args: JSX.IntrinsicAttributes) => <Text {...args} />;
export const Plaintext = Template1.bind({});
Plaintext.args = { ...mockContent };

const Template2 = (args: JSX.IntrinsicAttributes) => <Text {...args} />;
export const Formatted = Template2.bind({});
Formatted.args = {
  ...complexMock,
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
