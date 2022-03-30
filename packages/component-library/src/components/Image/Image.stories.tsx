import React from 'react';
import Box from '@mui/material/Box';
import Image from './Image';
import mockContent from './Image.mock';

export default {
  title: '1. Components / Image',
  component: Image,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box m={5}>{storyFn()}</Box>
    )
  ],
  argTypes: {
    alt: { name: 'Alt' },
    src: { name: 'Src' },
    width: { name: 'Width' },
    height: { name: 'Height' },
    className: { name: 'Class Name' },
    lazy: {
      name: 'Lazy',
      control: {
        type: 'boolean'
      },
      defaultValue: true,
      table: {
        defaultValue: { summary: true }
      }
    },
    columns: { table: { disable: true } },
    itemProp: { table: { disable: true } },
    testId: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <Image {...args} />;
export const Default = Template.bind({});
Default.args = { ...mockContent() };
