import React from 'react';
import Box from '@mui/material/Box';
import Media from './Media';
import { mediaMock, responsiveMediaMock, SVGMediaMock } from './Media.mock';

export default {
  title: '1. Primitives / LR / Media',
  component: Media,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box
        m={5}
        sx={{
          'width': '100%',
          'height': 600,
          'padding': 5,
          'backgroundColor': '#369',
          '> *': {
            objectFit: 'cover',
            width: '100%',
            height: '100%'
          }
        }}
      >
        {storyFn()}
      </Box>
    )
  ],
  argTypes: {
    file: { name: 'File URL' },
    title: { name: 'Title' },
    description: { name: 'Description' },
    __typename: { table: { disable: true } },
    sidekickLookup: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <Media {...args} />;
export const Default = Template.bind({});
Default.args = { ...mediaMock() };

export const SVG = Template.bind({});
SVG.args = { ...SVGMediaMock };

export const Responsive = Template.bind({});
Responsive.args = { ...responsiveMediaMock };
