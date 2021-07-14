import React from 'react';
import Box from '@material-ui/core/Box';
import RichText from './RichText';
import mockContent, { complexMock } from './RichText.mock';

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

const Template1 = (args: JSX.IntrinsicAttributes) => <RichText {...args} />;
export const Plaintext = Template1.bind({});
Plaintext.args = { ...mockContent };

const Template2 = (args: JSX.IntrinsicAttributes) => <RichText {...args} />;
export const Formatted = Template2.bind({});
Formatted.args = { ...complexMock };
