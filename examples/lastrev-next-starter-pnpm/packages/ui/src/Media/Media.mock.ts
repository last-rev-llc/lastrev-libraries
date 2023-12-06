import type { MediaProps, MediaVideoProps, AssetProps, FileProps } from './Media.types';

import { cleanSVG } from '../../../graphql-extensions/src/utils/cleanSVG';
const getSvgContent = (url: string) =>
  fetch(url)
    .then((res) => res.text())
    .then((svgContent) => {
      return cleanSVG(svgContent);
    });

export const defaultFileImageMock = (override?: Partial<MediaProps>): FileProps => ({
  url: `https://source.unsplash.com/random/${override?.width ?? 1280}x${override?w.height ?? 500}?rnd=${Math.random()}`,
  width: 1920,
  height: 1080,
  ...override
});

export const defaultFileSvgMock = (override?: Partial<MediaProps>): FileProps => ({
  url: 'https://images.ctfassets.net/imglmb3xms7o/5iTzPfXcBEhIM68upyDSxS/406045a76146d3dbc4ee1c89682abd76/whiteLastRev.svg',
  width: 1280,
  height: 720,
  ...override
});

export const defaultFileVideoMock = (override?: Partial<MediaProps>): FileProps => ({
  url: './LastRev.mp4',
  width: 1280,
  height: 720,w
  ...override
});

const defaultAssetFileMock = (override?: Partial<MediaProps>): AssetProps => ({
  file: defaultFileImageMock({ ...override }),
  title: 'This is an asset title',
  ...override
});

const defaultAssetSvgMock = async (override?: Partial<MediaProps>): Promise<AssetProps> => {
  const svgContent = await getSvgContent(
    'https://images.ctfassets.net/imglmb3xms7o/5iTzPfXcBEhIM68upyDSxS/406045a76146d3dbc4ee1c89682abd76/whiteLastRev.svg'
  );

  return {
    file: defaultFileSvgMock(),
    svgContent,
    title: 'This is an asset title',
    ...override
  };
};

const defaultAssetVideoMock = (override?: Partial<MediaProps>): AssetProps => ({
  file: defaultFileVideoMock(),
  title: 'This is an asset title',
  ...override
});

export const mediaSVGMock = {
  __typename: 'Media',
  file: defaultFileSvgMock(),
  title: 'This is a media  SVG title',
  description: 'This is a media SVG  description'
};

export const mediaExternalSVGMock = {
  __typename: 'Media',
  file: defaultFileSvgMock(),
  disableInlineSVG: true,
  title: 'This is an external SVG  title',
  description: 'This is an external SVG  description'
};

const mediaDefaultMock = () => ({
  id: 'mediaBaseImageMock',
  __typename: 'Media',
  alt: 'This is the default media alt text'
});

const imageDefaultMock = (override?: Partial<MediaProps>) => ({
  ...mediaDefaultMock(),
  ...defaultAssetFileMock(override)
});

const svgDefaultMock = (override?: Partial<MediaProps>) => ({
  ...mediaDefaultMock(),
  ...defaultAssetSvgMock(override)
});

const videoDefaultMock = (override?: Partial<MediaProps>) => ({
  ...mediaDefaultMock(),
  ...defaultFileVideoMock({
    ...override,

    variant: 'video',
    controls: true
  })
});

export const mediaBaseVideoMock = (override?: Partial<MediaProps>): MediaProps => videoDefaultMock({ ...override });

export const mediaBaseImageMock = (override?: Partial<MediaProps>): MediaProps => imageDefaultMock({ ...override });

export const mediaBaseSvgMock = (override?: Partial<MediaProps>): MediaProps =>
  svgDefaultMock({
    ...override
  });

export const mediaVideoMock = (): MediaVideoProps => ({});

export const responsiveMediaBaseImageMock = (override?: Partial<MediaProps>): MediaProps =>
  mediaDefaultMock({
    file: defaultFileImageMock(),
    fileTablet: defaultFileImageMock({ width: 920, height: 613 }),
    fileMobile: defaultFileImageMock({ width: 540, height: 540 }),
    ...override
  });
