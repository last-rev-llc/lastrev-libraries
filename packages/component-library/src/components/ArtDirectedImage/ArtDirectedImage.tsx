import React from 'react';
import styled from '@mui/system/styled';
import { css } from '@emotion/react';
import Image from '../Image';
interface File {
  url: string;
  width?: string;
  height?: string;
}

const getImageMedia = (
  breakpoint: string,
  { fileMobile, fileTablet }: { file?: File; fileTablet?: File; fileMobile?: File }
) => {
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

interface Props {
  file?: File;
  fileTablet?: File;
  fileMobile?: File;
  title?: string;
  description?: string;
  className?: string;
  priority?: boolean;
}
type Ref = HTMLImageElement;

const ArtDirectedImage = React.forwardRef<Ref, Props>(
  ({ title, description, file, fileMobile, fileTablet, ...props }) => (
    <>
      {fileMobile?.url ? (
        <>
          <ResponsiveImage
            src={fileMobile?.url}
            columns={6}
            height={fileMobile?.height}
            media={getImageMedia('mobile', { file, fileMobile, fileTablet })}
            alt={description || title}
            {...props}
          />
        </>
      ) : null}
      {fileTablet?.url ? (
        <>
          <ResponsiveImage
            src={fileTablet?.url}
            columns={8}
            height={fileTablet?.height}
            media={getImageMedia('tablet', { file, fileMobile, fileTablet })}
            alt={description || title}
            {...props}
          />
        </>
      ) : null}
      {file?.url ? (
        <>
          <ResponsiveImage
            src={file?.url}
            columns={12}
            height={file?.height}
            media={getImageMedia('desktop', { file, fileMobile, fileTablet })}
            alt={description || title}
            {...props}
          />
        </>
      ) : null}
    </>
  )
);

const ResponsiveImage = styled(Image, { shouldForwardProp: (prop) => prop !== 'displaymedia' })<{
  media?: string;
}>`
  ${({ media }) =>
    media
      ? css`
          display: none !important;

          @media ${media} {
            display: block !important;
            visibility: visible !important;
          }
        `
      : ''}
`;

export default React.memo(ArtDirectedImage);
