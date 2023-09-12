import Media from './Media';
import {
  mediaBaseImageMock,
  mediaVideoMock,
  responsivemediaBaseImageMock,
  mediaSVGMock,
  mediaExternalSVGMock
} from './Media.mock';

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

export const Default = { args: { ...mediaBaseImageMock() } };

export const InlineSVG = { args: { ...mediaSVGMock } };

export const SVG = { args: { ...mediaExternalSVGMock } };

export const Responsive = { args: { ...responsivemediaBaseImageMock } };

export const Video = { args: { ...mediaVideoMock() } };
