import React from 'react';
import Box from '@mui/material/Box';
import ArtDirectedImage from './ArtDirectedImage';
import mockContent from './ArtDirectedImage.mock';

export default {
  title: '1. Components / ArtDirectedImage',
  component: ArtDirectedImage,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box m={5}>{storyFn()}</Box>
    )
  ],
  argTypes: {}
};

const Template = (args: JSX.IntrinsicAttributes) => (
  <ArtDirectedImage {...args} sx={{ width: '100%', height: 540, objectFit: 'cover' }} />
);
export const Default = Template.bind({});
Default.args = { ...mockContent };

export const DesktopAndMobile = Template.bind({});
DesktopAndMobile.args = { ...mockContent, fileTablet: undefined };

export const DesktopAndTablet = Template.bind({});
DesktopAndTablet.args = { ...mockContent, fileMobile: undefined };

export const DesktopOnly = Template.bind({});
DesktopOnly.args = { ...mockContent, fileTablet: undefined, fileMobile: undefined };

export const TabletOnly = Template.bind({});
TabletOnly.args = { ...mockContent, file: undefined, fileMobile: undefined };

export const MobileOnly = Template.bind({});
MobileOnly.args = { ...mockContent, fileTablet: undefined, file: undefined };
