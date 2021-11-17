// import { map, filter } from 'lodash';
import map from 'lodash/map';
import filter from 'lodash/filter';

interface GetRatioParams {
  width: number;
  numColumns: number;
}

interface GetImgSrcParams {
  src: string;
  numColumns: number;
  returnAttrsType: string;
  q?: number;
  unoptimized?: boolean;
}

interface GetImgSrcTag {
  src: string;
  srcSet?: string;
  sizes?: string;
}

const getRatio = ({ width, numColumns }: GetRatioParams): number => (width > 768 ? numColumns / 12 : numColumns / 6);
export const getOptimizedUrl = ({
  url,
  width,
  q,
  unoptimized
}: {
  url: string;
  width: number;
  q: number;
  unoptimized: boolean;
}) => {
  let fetchUrl = `${url}`;
  if (unoptimized) return fetchUrl;
  if (width && fetchUrl?.includes('ctfassets')) {
    fetchUrl = fetchUrl?.includes('?')
      ? `${fetchUrl}&w=${Math.round(width)}&q=${q}`
      : `${fetchUrl}?w=${Math.round(width)}&q=${q}`;
  } else {
    fetchUrl = fetchUrl?.includes('?')
      ? `${fetchUrl}&width=${Math.round(width)}&q=${q}`
      : `${fetchUrl}?width=${Math.round(width)}&q=${q}`;
  }
  return fetchUrl;
};

const getImgSrcTag = ({
  src,
  numColumns = 12,
  returnAttrsType = 'str',
  q = 0,
  unoptimized = false
}: GetImgSrcParams): GetImgSrcTag | string => {
  const attrs: GetImgSrcTag = {
    src
  };

  if (src.indexOf('.svg') > -1) {
    if (returnAttrsType === 'Obj') {
      return attrs;
    }
    return `src="${attrs.src}"`;
  }
  const absWidth = 3840;
  // TODO: Make CMS-agnostic
  // const settings = src.indexOf('.jpg') > -1 ? '&fm=jpg&fl=progressive&ac=12345' : '';
  const maxWidth = (absWidth / 12) * numColumns;
  const sizes = [3840, 3520, 3200, 2880, 2560, 2240, 1920, 1600, 1440, 1280, 960, 640];

  // ratio = 1 for full width (12), 0.5 for half width (6)
  const srcSets = map(
    filter(sizes, (fs) => fs <= maxWidth),
    (s) => `${getOptimizedUrl({ url: src, width: s * getRatio({ width: s, numColumns }), q, unoptimized })} ${s}w`
  );
  const attrSizes = map(
    filter(sizes, (fs) => fs <= maxWidth),
    (s) => `(max-width: ${s}x) ${s * getRatio({ width: s, numColumns })}px`
  );

  // NOTE: Commented out, but do we need?
  // attrs.src = `${{ url: src, width: sizes[sizes.length - 1], settings }}`;
  attrs.srcSet = srcSets.join(', ');
  attrs.sizes = `${attrSizes.join(', ')}`;

  if (returnAttrsType === 'Obj') return attrs;
  if (returnAttrsType === 'src') return attrs.src;
  return `src="${attrs.src}" srcset="${attrs.srcSet}" sizes="${attrs.sizes}"`;
};

export default getImgSrcTag;
