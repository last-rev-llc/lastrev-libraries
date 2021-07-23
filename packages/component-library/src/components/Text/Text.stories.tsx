import React from 'react';
import Box from '@material-ui/core/Box';
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
  argTypes: {}
};

const Template1 = (args: JSX.IntrinsicAttributes) => <Text {...args} />;
export const Plaintext = Template1.bind({});
Plaintext.args = { ...mockContent };

const Template2 = (args: JSX.IntrinsicAttributes) => <Text {...args} />;
export const Formatted = Template2.bind({});
Formatted.args = { ...complexMock };
