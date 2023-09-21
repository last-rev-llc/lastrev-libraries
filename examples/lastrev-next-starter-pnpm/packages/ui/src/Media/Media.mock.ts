import { lorem } from 'faker';
import { MediaProps, MediaVideoProps, AssetProps, FileProps } from './Media.types';

import { cleanSVG } from '../../../graphql-extensions/src/utils/cleanSVG';
const getSvgContent = (url: string) =>
  fetch(url)
    .then((res) => res.text())
    .then((svgContent) => {
      return cleanSVG(svgContent);
    });

export const defaultFileImageMock = ({ ...override } = {}): FileProps => ({
  url: `https://source.unsplash.com/random/500x500?rnd=${Math.random()}`,
  width: 1920,
  height: 1080,
  ...override
});

export const defaultFileSvgMock = ({ ...override } = {}): FileProps => ({
  url: 'https://images.ctfassets.net/imglmb3xms7o/5iTzPfXcBEhIM68upyDSxS/406045a76146d3dbc4ee1c89682abd76/whiteLastRev.svg',
  width: 1280,
  height: 720,
  ...override
});

export const defaultFileVideoMock = ({ ...override } = {}): FileProps => ({
  url: './LastRev.mp4',
  width: 1280,
  height: 720,
  ...override
});

const defaultAssetFileMock = ({ ...override } = {}): AssetProps => ({
  file: defaultFileImageMock(),
  title: lorem.sentence(),
  ...override
});

const defaultAssetSvgMock = async ({ ...override } = {}): Promise<AssetProps> => {
  const svgContent = await getSvgContent(
    'https://images.ctfassets.net/imglmb3xms7o/5iTzPfXcBEhIM68upyDSxS/406045a76146d3dbc4ee1c89682abd76/whiteLastRev.svg'
  );

  return {
    file: defaultFileSvgMock(),
    svgContent,
    title: lorem.sentence(),
    ...override
  };
};

const defaultAssetVideoMock = ({ ...override } = {}): AssetProps => ({
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

const svgDefaultMock: MediaProps = {
  ...mediaDefaultMock,
  ...defaultAssetSvgMock()
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

export const mediaBaseSvgMock = ({ ...override } = {}): MediaProps => ({
  ...svgDefaultMock,
  ...override
});

export const mediaVideoMock = (): MediaVideoProps => ({});

export const responsiveMediaBaseImageMock = ({ ...override } = {}): MediaProps => ({
  ...mediaDefaultMock,
  file: defaultFileImageMock(),
  fileTablet: defaultFileImageMock({ width: 920, height: 613 }),
  fileMobile: defaultFileImageMock({ width: 540, height: 540 }),
  ...override
});
