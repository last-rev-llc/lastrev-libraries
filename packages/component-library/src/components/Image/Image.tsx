import React from 'react';
import LazyLoad from 'react-lazyload';
import ErrorBoundary from '../ErrorBoundary';
import getImgSrcTag from '../../utils/getImgSrcTag';
import { ImageProps } from './Image.types';

export type Ref = HTMLImageElement;

const Image = React.forwardRef<Ref, ImageProps>(({
  src, className, columns = 12, lazy, itemProp, testId, ...imageProps
}: ImageProps, ref) => {
  if (!src) return null;
  try {
    return (
      <ErrorBoundary>
        {process.env.NODE_ENV === 'test' || !lazy ? (
          <img
            {...getImgSrcTag({ src, numColumns: columns, returnAttrsType: 'Obj' })}
            ref={ref}
            data-testid={testId}
            className={className}
            itemProp={itemProp}
            {...imageProps}
          />
        ) : (
          <LazyLoad
            offset={typeof window === 'undefined' ? 1000 : window.innerHeight}>
            <img
              {...getImgSrcTag({ src, numColumns: columns, returnAttrsType: 'Obj' })}
              ref={ref}
              data-testid={testId}
              className={className}
              itemProp={itemProp}
              loading="lazy"
              {...imageProps}
            />
          </LazyLoad>
        )}
      </ErrorBoundary>
    );
  } catch (err) {
    return null;
  }
});

export default React.memo(Image);
