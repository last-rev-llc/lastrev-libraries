import React from 'react';
import Head from 'next/head';
import NextImage from 'next/future/image';
import ErrorBoundary from '../ErrorBoundary';
import getImgSrcTag from '../../utils/getImgSrcTag';
import { ImageProps } from './Image.types';

import LazyLoad from 'react-lazyload';
import SVG from 'react-inlinesvg';
// TODO: Move this to the correct place
type Env = 'development' | 'production' | 'test' | string | undefined;
const NODE_ENV: Env = process.env.NODE_ENV;

const Image = React.forwardRef<any, ImageProps>((props, ref) => {
  const {
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
    alt,
    ...imageProps
  } = props;
  if (!src) return null;
  const imgPreload = React.useMemo(
    () => (
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
    ),
    [src, columns, q, unoptimized]
  );
  const imgContent = React.useMemo(() => {
    const isSVG = src?.endsWith('.svg');

    let content;
    if (isSVG && !disableInlineSVG) {
      content = (
        <>
          <SVG innerRef={ref} src={src} data-testid={testId} className={className} {...(imageProps as any)} />
          {imgPreload}
        </>
      );
    } else if (!isSVG && nextImageOptimization) {
      content = (
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
          sizes={imageProps.sizes}
          alt={alt}
        />
      );
    } else {
      content = (
        <>
          <img
            {...getImgSrcTag({ src, numColumns: columns, q, unoptimized })}
            ref={ref}
            data-testid={testId}
            className={className}
            itemProp={itemProp}
            loading={priority ? 'eager' : 'lazy'}
            height={height}
            width={width}
            alt={alt}
          />
          {imgPreload}
        </>
      );
    }
    return content;
  }, [props]);

  try {
    return (
      <ErrorBoundary>
        {NODE_ENV === 'test' || nextImageOptimization ? (
          <>{imgContent}</>
        ) : (
          <LazyLoad offset={typeof window === 'undefined' ? 1000 : window.innerHeight}>{imgContent}</LazyLoad>
        )}
      </ErrorBoundary>
    );
  } catch (err) {
    return null;
  }
});

export default React.memo(Image);
