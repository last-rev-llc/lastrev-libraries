import React from 'react';
import LazyLoad from 'react-lazyload';
import ErrorBoundary from '../ErrorBoundary';
 import getImgSrcTag from '../../utils/getImgSrcTag';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string
  columns?: number
  lazy?: boolean
  itemProp?: string
  testId?: string
}

export type Ref = HTMLImageElement;

const Image = React.forwardRef<Ref, ImageProps>(({
  className, columns = 12, lazy, itemProp, testId, ...imageProps
}: ImageProps, ref) => {
  try {
    return (
      <ErrorBoundary>
        {process.env.NODE_ENV === 'test' || !lazy ? (
          <img
            {...getImgSrcTag(imageProps.src, columns, 'Obj')}
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
              {...getImgSrcTag(imageProps.src, columns, 'Obj')}
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
