import React from 'react';
import styled from '@mui/system/styled';
// import BackgroundMedia from '../BackgroundMedia';
import ErrorBoundary from '../ErrorBoundary';
import Image from '../Image';
import ArtDirectedImage from '../ArtDirectedImage';
import sidekick from '../../utils/sidekick';
import { useThemeProps } from '@mui/system';

export interface File {
  url: string;
  width?: string;
  height?: string;
}
export interface Asset {
  file: File;
  title?: string;
  description?: string;
}
export interface MediaProps {
  file?: File;
  fileTablet?: File;
  fileMobile?: File;
  variant?: string;
  title?: string;
  description?: string;
  desktop?: Asset;
  tablet?: Asset;
  mobile?: Asset;
  sidekickLookup?: string;
  sx?: any;
  testId?: string;
  priority?: boolean;
  disableInlineSVG?: boolean;
  q?: number;
  unoptimized?: boolean;
}

export interface MediaOverrides {}
const Media = (inProps: MediaProps) => {
  const props = useThemeProps({
    name: 'Media',
    props: inProps
  });
  const { variant, file, title, fileMobile, fileTablet, testId, sidekickLookup } = props;
  // TODO: Add support for video
  const image = file;
  const alt = title;
  if (variant === 'embed') {
    return (
      <ErrorBoundary>
        <EmbedRoot
          {...sidekick(sidekickLookup)}
          {...props}
          src={image?.url}
          sx={{ width: '100%', height: '100%', ...props.sx }}
          data-testid={testId || 'Media'}
        />
      </ErrorBoundary>
    );
  }

  if (variant === 'video') {
    return (
      <ErrorBoundary>
        <VideoRoot
          {...sidekick(sidekickLookup)}
          preload="auto"
          data-testid={testId || 'Media'}
          {...props}
          sx={{ width: '100%', height: '100%', ...props.sx }}
        >
          <source src={file?.url} />
          Your browser does not support the video tag.
        </VideoRoot>
      </ErrorBoundary>
    );
  }
  if (fileTablet || fileMobile) {
    return (
      <ErrorBoundary>
        <ArtDirectedRoot
          {...sidekick(sidekickLookup)}
          {...props}
          title={title}
          file={file}
          fileTablet={fileTablet}
          fileMobile={fileMobile}
          data-testid={testId || 'Media'}
        />
      </ErrorBoundary>
    );
  }
  return (
    <ErrorBoundary>
      <Root {...sidekick(sidekickLookup)} {...props} src={image?.url} alt={alt} data-testid={testId || 'Media'} />
    </ErrorBoundary>
  );
};

// Define the pieces of the Media customizable through Theme

const Root = styled(Image, {
  name: 'Media',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>``;

const ArtDirectedRoot = styled(ArtDirectedImage, {
  name: 'Media',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>``;

const EmbedRoot = styled('iframe', {
  name: 'Media',
  slot: 'EmbedRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>``;

const VideoRoot = styled('video', {
  name: 'Media',
  slot: 'VideoRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>``;

export default Media;
