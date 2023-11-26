import React from 'react';
import NextImage from 'next/image';

import { breakpointsMinMax } from '../ThemeRegistry/theme';
import ErrorBoundary from '../ErrorBoundary';

import type { ImageProps } from './Image.types';

const Image = React.forwardRef<any, ImageProps>(function Image(props, ref) {
  const {
    src,
    className,
    media,
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
    columns,
    ...imageProps
  } = props;

  const imgContent = React.useMemo(() => {
    const isSVG = src?.endsWith('.svg');

    const generateSources = () => {
      const sources = [];
      let maxWidth = 0; // Initialize maximum width to 0
      const imageWidth = Number(width);
      const imageHeight = Number(height);

      // Iterate over breakpoints to find the largest column width
      for (const breakpoint in breakpointsMinMax) {
        // if (breakpointsMinMax.hasOwnProperty(breakpoint)) {
        const breakpointWidth = breakpointsMinMax[breakpoint]?.max;
        if (breakpointWidth && columns?.hasOwnProperty(breakpoint)) {
          const columnsValue = columns[breakpoint];

          if (!columnsValue) continue;
          const widthValue = breakpointWidth / columnsValue;

          if (widthValue > maxWidth) {
            maxWidth = widthValue;
          }
        }
      }

      // Iterate over breakpoints and generate sources
      for (const breakpoint in breakpointsMinMax) {
        // if (breakpointsMinMax.hasOwnProperty(breakpoint)) {
        const breakpointWidth = breakpointsMinMax[breakpoint]?.max;
        const mediaCondition = `(min-width: ${breakpointsMinMax[breakpoint]?.min}px and max-width: ${
          breakpointWidth - 0.001
        }px)`;

        if (breakpointWidth && columns?.hasOwnProperty(breakpoint)) {
          const columnsValue = columns[breakpoint];

          const widthValue = breakpointWidth / columnsValue;

          if (widthValue <= maxWidth && imageWidth < widthValue) {
            const source = `${src}?${imageWidth > imageHeight ? 'h' : 'w'}=${Math.round(widthValue)}&fm=webp`;
            sources.push(<source key={breakpoint} media={mediaCondition} srcSet={source} />);
          }
        } else {
          const source = `${src}?${imageWidth > imageHeight ? 'h' : 'w'}=${Math.round(maxWidth)}&fm=webp`;
          sources.push(<source key={breakpoint} media={mediaCondition} srcSet={source} />);
        }
      }

      sources.push(
        <img
          key="fallback"
          src={`${src}?${imageWidth > imageHeight ? 'h' : 'w'}=${Math.round(maxWidth)}`}
          alt={alt}
          className={className}
          ref={ref}
          data-testid={testId}
          itemProp={itemProp}
          loading={priority ? 'eager' : 'lazy'}
          width={Math.round(maxWidth)} // Set fallback width
          height={Math.round(imageHeight * (maxWidth / imageWidth))}
        />
      );

      return sources;
    };

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
    } else if (width && height && src && !isSVG && columns) {
      console.log({ width, height, src, isSVG, columns });
      content = <picture>{generateSources()}</picture>;
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
  }, [alt, className, columns, disableInlineSVG, height, imageProps, itemProp, priority, src, testId, width, ref]);

  return <ErrorBoundary>{imgContent}</ErrorBoundary>;
});

export default Image;
