import React from 'react';
import LazyLoad from 'react-lazyload';
import Head from 'next/head';
import ErrorBoundary from '../ErrorBoundary';
import getImgSrcTag from '../../utils/getImgSrcTag';
import { ImageProps } from './Image.types';

export type Ref = HTMLImageElement;

// TODO: Move this to the correct place
type Env = 'development' | 'production' | 'test' | string | undefined;
const NODE_ENV: Env = process.env.NODE_ENV;

const Image = React.forwardRef<Ref, ImageProps>(
  ({ src, className, media, columns = 12, priority, itemProp, testId, ...imageProps }: ImageProps, ref) => {
    if (!src) return null;
    try {
      return (
        <ErrorBoundary>
          {NODE_ENV === 'test' || priority ? (
            <>
              <img
                {...getImgSrcTag({ src, numColumns: columns, returnAttrsType: 'Obj' })}
                ref={ref}
                data-testid={testId}
                className={className}
                itemProp={itemProp}
                {...imageProps}
              />

              <Head>
                <link
                  rel="preload"
                  href={src}
                  // @ts-ignore
                  imagesrcset={getImgSrcTag({ src, numColumns: columns, returnAttrsType: 'Obj' })?.srcSet}
                  as="image"
                  media={media}
                />
              </Head>
            </>
          ) : (
            <LazyLoad offset={typeof window === 'undefined' ? 1000 : window.innerHeight}>
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
  }
);

export default React.memo(Image);
