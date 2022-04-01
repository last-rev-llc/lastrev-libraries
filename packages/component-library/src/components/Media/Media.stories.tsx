import React from 'react';
import Box from '@mui/material/Box';
import Media from './Media';
import { mediaMock, mediaVideoMock, responsiveMediaMock, SVGMediaMock, ExternalSVGMediaMock } from './Media.mock';

export default {
  title: 'Components / Media',
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

export const InlineSVG = Template.bind({});
InlineSVG.args = { ...SVGMediaMock };

export const SVG = Template.bind({});
SVG.args = { ...ExternalSVGMediaMock };

export const Responsive = Template.bind({});
Responsive.args = { ...responsiveMediaMock };

export const Video = Template.bind({});
Video.args = { ...mediaVideoMock() };
