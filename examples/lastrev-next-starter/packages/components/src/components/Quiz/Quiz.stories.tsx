import React from 'react';
import Box from '@material-ui/core/Box';
import Quiz from './Quiz';
import mockContent from './Quiz.mock';

export default {
  title: 'Modules / Quiz',
  component: Quiz,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box p={5}>{storyFn()}</Box>
    )
  ],
  argTypes: {
    title: { name: 'Title' },
    image: { name: 'Image' },
    intro: { name: 'Intro' },
    outro: { name: 'Outro' },
    steps: { name: 'Steps' },
    __typename: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <Quiz {...args} />;
export const Default = Template.bind({});
Default.args = { ...mockContent };
