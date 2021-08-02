import React from 'react';
import Box from '@material-ui/core/Box';
import Accordion from './Accordion';
import mockContent from './Accordion.mock';

export default {
  title: '1. Primitives / MUI / Accordion',
  component: Accordion,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box p={2} style={{ backgroundColor: '#eee' }}>
        {storyFn()}
      </Box>
    )
  ],
  argTypes: {
    variant: {
      name: 'Variant',
      control: {
        type: 'select',
        options: ['standard']
      }
    },
    sizeTitle: {
      name: 'Size for Title',
      control: {
        type: 'select',
        options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
        //only added h's bc then if you want to detail component on typography,
        // it wont work with others, lets review this
      }
    },
    colorTitle: {
      name: 'Color for Title',
      control: {
        type: 'select',
        options: ['initial', 'inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary', 'error']
      }
    },
    colorBody: {
      name: 'Color for Body',
      control: {
        type: 'select',
        options: ['initial', 'inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary', 'error']
      }
    },
    title: { name: 'Title' },
    body: { name: 'Body' },
    __typename: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <Accordion {...args} />;
export const Default = Template.bind({});
Default.args = { ...mockContent };
