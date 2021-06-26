import React from 'react';
import Box from '@material-ui/core/Box';
import GlobalHeader from './GlobalHeader';

export default {
  title: '2. Modules / GlobalHeader',
  component: GlobalHeader,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box m={5}>{storyFn()}</Box>
    )
  ]
};

const Template = (args: JSX.IntrinsicAttributes) => <GlobalHeader {...args} />;
export const Default = Template.bind({});
