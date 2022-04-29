import React from 'react';
import LazyLoad from 'react-lazyload';
import Head from 'next/head';
import NextImage from 'next/image';
import SVG from 'react-inlinesvg';
import ErrorBoundary from '../ErrorBoundary';
import getImgSrcTag from '../../utils/getImgSrcTag';
import { ImageProps } from './Image.types';

// TODO: Move this to the correct place
type Env = 'development' | 'production' | 'test' | string | undefined;
const NODE_ENV: Env = process.env.NODE_ENV;

const Image = React.forwardRef<any, ImageProps>(
  (
    {
      src,
      className,
      media,
      columns = 12,
      priority = true,
      itemProp,
      testId,
      disableInlineSVG,
      nextImageOptimization,
      q,
      unoptimized,
      width,
      height,
      layout,
      ...imageProps
    },
    ref
  ) => {
    if (!src) return null;
    const isSVG = src?.includes('.svg');

    let content;
    if (isSVG && !disableInlineSVG) {
      content = <SVG innerRef={ref} src={src} data-testid={testId} className={className} {...(imageProps as any)} />;
    } else if (!isSVG && nextImageOptimization) {
      return (
        <NextImage
          src={src}
          // TODO: NextImage doesn't support ref
          // ref={ref}
          data-testid={testId}
          className={className}
          itemProp={itemProp}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          height={height}
          width={width}
          layout={layout}
          {...imageProps}
        />
      );
    } else {
      content = (
        <img
          {...getImgSrcTag({ src, numColumns: columns, q, unoptimized })}
          ref={ref}
          data-testid={testId}
          className={className}
          itemProp={itemProp}
          loading={priority ? 'eager' : 'lazy'}
          {...imageProps}
        />
      );
    }
    try {
      return (
        <ErrorBoundary>
          {NODE_ENV === 'test' || priority ? (
            <>
              {content}
              {isSVG ? (
                <Head>
                  <link
                    rel="preload"
                    href={src}
                    // @ts-ignore
                    imagesrcset={getImgSrcTag({ src, numColumns: columns, q, unoptimized })?.srcSet}
                    as="image"
                    media={media}
                  />
                </Head>
              ) : null}
            </>
          ) : (
            <LazyLoad offset={typeof window === 'undefined' ? 1000 : window.innerHeight}>{content}</LazyLoad>
          )}
        </ErrorBoundary>
      );
    } catch (err) {
      return null;
    }
  }
);

export default React.memo(Image);
