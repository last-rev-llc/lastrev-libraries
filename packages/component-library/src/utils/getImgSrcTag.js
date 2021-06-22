// import { map, filter } from 'lodash';
import map from 'lodash/map';
import filter from 'lodash/filter';

const getRatio = ({ width, numColumns }) => (width > 768 ? numColumns / 12 : numColumns / 6);

const getImgSrcTag = (src, numColumns = 12, returnAttrsType = 'str') => {
  const attrs = {
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
  const settings = src.indexOf('.jpg') > -1 ? '&fm=jpg&fl=progressive&ac=12345' : '';
  const maxWidth = (absWidth / 12) * numColumns;
  const sizes = [3840, 3520, 3200, 2880, 2560, 2240, 1920, 1600, 1440, 1280, 960, 640];

  // ratio = 1 for full width (12), 0.5 for half width (6)
  const srcSets = map(
    filter(sizes, (fs) => fs <= maxWidth),
    (s) => `${{ url: src, width: s * getRatio({ width: s, numColumns }), settings }} ${s}w`
  );
  const attrSizes = map(
    filter(sizes, (fs) => fs <= maxWidth),
    (s) => `(max-width: ${s}x) ${s * getRatio({ width: s, numColumns })}px`
  );

  attrs.src = `${{ url: src, width: sizes[sizes.length - 1], settings }}`;
  attrs.srcSet = srcSets.join(',');
  attrs.sizes = `${attrSizes.join(',')}`;

  if (returnAttrsType === 'Obj') return attrs;
  if (returnAttrsType === 'src') return attrs.src;
  return `src="${attrs.src}" srcset="${attrs.srcset}" sizes = "${attrs.sizes}"`;
};

export default getImgSrcTag;
