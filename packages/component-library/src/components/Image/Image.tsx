import React from 'react';
import Head from 'next/head';
import NextImage from 'next/future/image';
import ErrorBoundary from '../ErrorBoundary';
import getImgSrcTag from '../../utils/getImgSrcTag';
import { ImageProps } from './Image.types';

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
    if (isSVG && !disableInlineSVG && imageProps.svgContent) {
      content = (
        <>
          <svg
            ref={ref}
            className={className}
            data-testid={testId}
            height={height}
            width={width}
            focusable={false}
            // TODO: Figure out better a11y support for svg
            dangerouslySetInnerHTML={{ __html: `<title>${alt}</title>${imageProps.svgContent}` }}
          />
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
            {...imageProps}
          />
          {imgPreload}
        </>
      );
    }
    return content;
  }, [props]);

  return <ErrorBoundary>{imgContent}</ErrorBoundary>;
});

export default Image;
