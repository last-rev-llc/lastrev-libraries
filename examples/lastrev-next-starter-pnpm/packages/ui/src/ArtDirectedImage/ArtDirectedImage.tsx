//TODO: Fix ts issues
// @ts-nocheck
'use client';
import React from 'react';
import { styled } from '@mui/material/styles';

import Image from '../Image';
import type { MediaProps } from '../Media/Media.types';
import type { ArtDirectedImageProps } from './ArtDirectedImage.types';

const getImageMedia = (breakpoint: string, { fileMobile, fileTablet }: Partial<MediaProps>) => {
  switch (breakpoint) {
    case 'mobile':
      return '(max-width: 768px)';

    case 'tablet':
      return '(min-width: 768.1px) and (max-width: 1024px)';

    case 'desktop':
      if (!fileTablet && !fileMobile) {
        return '';
      } else if (fileMobile && !fileTablet) {
        return '(min-width: 768.1px)';
      } else if (fileTablet) {
        return '(min-width: 1024.1px)';
      }
  }
  return '';
};

const ArtDirectedImage = React.forwardRef<HTMLImageElement, ArtDirectedImageProps>(function ArtDirectedImage(
  { title, description, file, fileMobile, fileTablet, ...props },
  ref
) {
  return (
    <>
      {fileMobile?.url ? (
        <>
          <ResponsiveImage
            src={fileMobile?.url}
            columns={6}
            width={fileMobile?.width}
            height={fileMobile?.height}
            media={getImageMedia('mobile', { file, fileMobile, fileTablet })}
            alt={description || title || ''}
            {...props}
          />
        </>
      ) : null}

      {fileTablet?.url ? (
        <>
          <ResponsiveImage
            src={fileTablet?.url}
            columns={8}
            width={fileTablet?.width}
            height={fileTablet?.height}
            media={getImageMedia('tablet', { file, fileMobile, fileTablet })}
            alt={description || title || ''}
            {...props}
          />
        </>
      ) : null}

      {file?.url ? (
        <>
          <ResponsiveImage
            ref={ref}
            src={file?.url}
            columns={12}
            width={file?.width}
            height={file?.height}
            media={getImageMedia('desktop', { file, fileMobile, fileTablet })}
            alt={description || title || ''}
            {...props}
          />
        </>
      ) : null}
    </>
  );
});
const shouldForwardProp = (prop: string) => prop !== 'displaymedia';

const ResponsiveImage = styled(Image, {
  name: 'ArtDirectedImage',
  slot: 'Root',
  shouldForwardProp
})<{
  media?: string;
}>`
  ${({ media }) =>
    media
      ? `
          display: none !important;

          @media ${media} {
            display: block !important;
            visibility: visible !important;
          }
        `
      : ''}
`;

export default ArtDirectedImage;
