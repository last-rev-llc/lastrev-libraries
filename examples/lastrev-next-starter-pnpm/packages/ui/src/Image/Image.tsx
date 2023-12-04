import React from 'react';
import NextImage from 'next/image';

import { breakpointsMinMax } from '../ThemeRegistry/theme';
import ErrorBoundary from '../ErrorBoundary';


import type { ImageProps } from './Image.types';

const calculateImageSizeForDiv = (divWidth:number, divHeight:number, originalWidth:number, originalHeight:number) => {
  // Check if the original image is smaller than the div
  if (originalWidth <= divWidth && originalHeight <= divHeight) {
    return {
      width: originalWidth,
      height: originalHeight
    };
  }

  // Calculate the aspect ratio of the div
  const divAspectRatio = divWidth / divHeight;

  // Calculate the aspect ratio of the original image
  const originalAspectRatio = originalWidth / originalHeight;

  let imageSize: { width: number; height: number } = {
    width: divWidth,
    height: divHeight
  };

  if (originalAspectRatio <= divAspectRatio) {
    imageSize.width = divWidth;
    imageSize.height = divWidth / originalAspectRatio;
  } else {
    imageSize.width = divHeight * originalAspectRatio;
    imageSize.height = divHeight;
  }

  return imageSize;
}

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
    aspectRatio,
    ...imageProps
  } = props;

  const quality = q || 100;

  const imgContent = React.useMemo(() => {
    const isSVG = src?.endsWith('.svg');

    
    
    const generateSources = () => {
      const sources = [];
      let maxWidth = 0;
      let maxHeight = 0;
      const originalImageWidth = Number(width);
      const originalImageHeight = Number(height);

      // Iterate over breakpoints to find the largest column width
      for (const breakpoint in breakpointsMinMax) {
        const breakpointWidth = breakpointsMinMax[breakpoint]?.max;
        if (breakpointWidth && columns?.hasOwnProperty(breakpoint)) {
          const columnsValue = columns[breakpoint];

          if (!columnsValue) continue;
          let divWidth = breakpointWidth / columnsValue;
          let divHeight = breakpointWidth / columnsValue;

          if (aspectRatio === 'vertical' && breakpointWidth > breakpointsMinMax['sm']?.max) {
            divHeight = (divWidth * 16) / 9;
          } else if (aspectRatio === 'horizontal') {
            divHeight = (divWidth * 9) / 16;
          }

          maxWidth = Math.max(maxWidth, divWidth);
          maxHeight = Math.max(maxHeight, divHeight);
          
        }
      }

      // Get the calculated image size using the calculateImageSize function
      const imageSize = calculateImageSizeForDiv(maxWidth, maxHeight, originalImageWidth, originalImageHeight);

      if (src?.includes('Walking')) {
        console.log({imageSize, maxWidth, maxHeight, originalImageWidth, originalImageHeight})
      }

      // Iterate over breakpoints and generate sources
      for (const breakpoint in breakpointsMinMax) {
        const breakpointWidth = breakpointsMinMax[breakpoint]?.max;
        // const mediaCondition = `(min-width: ${breakpointsMinMax[breakpoint]?.min}px) and (max-width: ${
        //   breakpointWidth - 0.001
        // }px)`;

        if (breakpointWidth && columns?.hasOwnProperty(breakpoint)) {
          const mediaConditions = [];
         
          const min = breakpointsMinMax[breakpoint]?.min;
          if (!!min) {
            mediaConditions.push(`(min-width: ${min}px)`);
          }
         
          
          mediaConditions.push(`(max-width: ${breakpointWidth -  0.001}px)`);
          

          const mediaCondition = mediaConditions.join(" and ");

          const columnsValue = columns[breakpoint];

          let divWidth = breakpointWidth / columnsValue;
          let divHeight = breakpointWidth / columnsValue;

          if (aspectRatio === 'vertical' && breakpointWidth > breakpointsMinMax['sm']?.max) {
            divHeight = (divWidth * 16) / 9;
          } else if (aspectRatio === 'horizontal') {
            divHeight = (divWidth * 9) / 16;
          }

          if (divHeight < originalImageHeight) {
            const source = `${src}?h=${Math.round(divHeight)}&q=${quality}`;
         
            sources.push(
              <source
                key={`avif-${src}-${breakpoint}`}
                media={mediaCondition}
                srcSet={`${source}&fm=avif, ${source}&fm=webp`}
                type="image/avif"
              />
            );

            // sources.push(
            //   <source
            //     key={`webp-${src}-${breakpoint}`}
            //     media={mediaCondition}
            //     srcSet={`${source}&fm=webp`}
            //     type="image/webp"
            //   />
            // );
            }
        }
      }

      let fallbackSrc = src;
      if (originalImageHeight > maxHeight) {
        fallbackSrc = `${src}?h=${Math.round(maxHeight)}&q=90`//${quality}`
      }
      
      sources.push(
        <NextImage
          key={`fallback-${src}`}
          src={fallbackSrc as string}
          alt={alt}
          className={className}
          ref={ref}
          unoptimized={true}
          data-testid={testId}
          itemProp={itemProp}
          loading="lazy"
          width={Math.round(imageSize.width)} 
          height={Math.round(imageSize.height)}
        />

        // <img
        //   key={`fallback-${src}`}
        //   src={fallbackSrc}
        //   alt={alt}
        //   className={className}
        //   ref={ref}
        //   data-testid={testId}
        //   itemProp={itemProp}
        //   loading="lazy"
        //   width={Math.round(imageSize.width)} 
        //   height={Math.round(imageSize.height)}
        // />
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
          height={Number(height)}
          width={Number(width)}
          alt={alt}
        />
      );
    }
    return content;
  }, [alt, aspectRatio, quality, className, columns, disableInlineSVG, height, imageProps, itemProp, priority, src, testId, width, ref]);

  return <ErrorBoundary>{imgContent}</ErrorBoundary>;
});

export default Image;
