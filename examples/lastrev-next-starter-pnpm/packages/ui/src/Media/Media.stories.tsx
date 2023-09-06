import Media from './Media';
import { mediaMock, mediaVideoMock, responsiveMediaMock, SVGMediaMock, ExternalSVGMediaMock } from './Media.mock';

export default {
  title: '2. Components/ Media',
  component: Media,

  tags: ['autodocs'],
  argTypes: {
    file: { name: 'File URL' },
    title: { name: 'Title' },
    description: { name: 'Description' },
    __typename: { table: { disable: true } },
    sidekickLookup: { table: { disable: true } }
  }
};

export const Default = { args: { ...mediaMock() } };

export const InlineSVG = { args: { ...SVGMediaMock } };

export const SVG = { args: { ...ExternalSVGMediaMock } };

export const Responsive = { args: { ...responsiveMediaMock } };

export const Video = { args: { ...mediaVideoMock() } };
