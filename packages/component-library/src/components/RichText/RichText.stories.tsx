import React from 'react';
import Box from '@material-ui/core/Box';
import RichText from './RichText';

export default {
  title: '2. Modules / RichText',
  component: RichText,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box m={5}>{storyFn()}</Box>
    )
  ],
  argTypes: {}
};

const Template = (args: JSX.IntrinsicAttributes) => <RichText {...args} />;
export const Default = Template.bind({});
