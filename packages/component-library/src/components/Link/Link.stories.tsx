import React from 'react';
import Box from '@material-ui/core/Box';
import Link from './Link';
import mockContent from './Link.mock';

export default {
  title: '1. Primitives / MUI / Link',
  component: Link,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box m={5}>{storyFn()}</Box>
    )
  ],
  argTypes: {
    variant: { name: 'Variant' },
    // bgcolor: { name: 'Background Color' },
    // variantMapping: { name: 'Variant Mapping' },
    ref: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <Link {...args} />;
export const Default = Template.bind({});
Default.args = { ...mockContent };
