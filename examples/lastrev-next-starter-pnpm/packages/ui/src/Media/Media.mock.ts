import { lorem } from 'faker';
import { MediaProps, MediaVideoProps } from './Media.types';

export const defaultFileImageMock = ({ ...override } = {}): File => ({
  url: `https://source.unsplash.com/random/180x180`,
  width: 1920,
  height: 1080,
  ...override
});

export const defaultFileSvgMock = ({ ...override } = {}): File => ({
  url: './logo.svg',
  width: 180,
  height: 180,
  ...override
});

export const defaultFileVideoMock = ({ ...override } = {}): File => ({
  url: './LastRev.mp4',
  width: 1280,
  height: 720,
  ...override
});

const defaultAssetFileMock = ({ ...override } = {}): Asset => ({
  file: defaultFileVideoMock(),
  title: lorem.sentence(),
  ...override
});

export const mediaSVGMock = {
  __typename: 'Media',
  file: defaultFileSvgMock(),
  title: lorem.sentence(),
  description: lorem.sentence()
};

export const mediaExternalSVGMock = {
  __typename: 'Media',
  file: defaultFileSvgMock(),
  disableInlineSVG: true,
  title: lorem.sentence(),
  description: lorem.sentence()
};

const mediaDefaultMock: MediaProps = {
  id: 'mediaBaseImageMock',
  __typename: 'Media',
  alt: lorem.word()
};

const imageDefaultMock: MediaProps = {
  ...mediaDefaultMock,
  ...defaultAssetFileMock()
};

const videoDefaultMock: MediaProps = {
  ...mediaDefaultMock,
  ...defaultFileVideoMock(),
  variant: 'video',
  controls: true
};

export const mediaBaseVideoMock = ({ ...override } = {}): MediaProps => ({
  ...videoDefaultMock,
  ...override
});

export const mediaBaseImageMock = ({ ...override } = {}): MediaProps => ({
  ...imageDefaultMock,
  ...override
});

export const mediaVideoMock = (): MediaVideoProps => ({});

export const responsivemediaBaseImageMock = ({ ...override } = {}): MediaProps => ({
  ...mediaDefaultMock,
  file: defaultFileImageMock(),
  fileTablet: defaultFileImageMock({ width: 920, height: 613 }),
  fileMobile: defaultFileImageMock({ width: 540, height: 540 }),
  ...override
});
