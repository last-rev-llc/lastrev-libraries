import React from 'react';
import NextImage from 'next/image';
import ErrorBoundary from '../ErrorBoundary';

import { ImageProps } from './Image.types';

const Image = React.forwardRef<any, ImageProps>(function Image(props, ref) {
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

  const imgContent = React.useMemo(() => {
    const isSVG = src?.endsWith('.svg');
    console.log(isSVG, disableInlineSVG, imageProps.svgContent);

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
            role="img"
            // TODO: Figure out better a11y support for svg
            dangerouslySetInnerHTML={{ __html: `<title>${alt}</title>${imageProps.svgContent}` }}
          />
        </>
      );
    } else if (src && !isSVG) {
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
    }
    return content;
  }, [alt, className, disableInlineSVG, height, imageProps, itemProp, priority, src, testId, width, ref]);

  return <ErrorBoundary>{imgContent}</ErrorBoundary>;
});

export default Image;
