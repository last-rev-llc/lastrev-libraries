import React from 'react';
import styled from '@mui/system/styled';

import ErrorBoundary from '../ErrorBoundary';
import Image from '../Image';
import ArtDirectedImage from '../ArtDirectedImage';
import sidekick from '@last-rev/contentful-sidekick-util';

import { MediaProps, MediaVideoProps } from './Media.types';
import useThemeProps from '../../utils/useThemeProps';
// import dynamic from 'next/dynamic';

// const Image = dynamic(() => import('../Image'));
// const ArtDirectedImage = dynamic(() => import('../ArtDirectedImage'));

const Media = (inProps: MediaProps & MediaVideoProps) => {
  const props = useThemeProps({
    name: 'Media',
    props: inProps
  });
  const { variant, file, title, fileMobile, fileTablet, testId, sidekickLookup, nextImageOptimization } = props;
  // TODO: Add support for video
  const image = file;
  const alt = title;
  if (variant === 'embed') {
    return (
      <ErrorBoundary>
        <EmbedRoot
          {...sidekick(sidekickLookup)}
          {...(props as React.IframeHTMLAttributes<any>)}
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
          {...(props as MediaVideoProps)}
          sx={{ width: '100%', height: '100%', ...props.sx }}>
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
      <Root
        {...sidekick(sidekickLookup)}
        {...image}
        {...props}
        nextImageOptimization={nextImageOptimization}
        src={image?.url}
        alt={alt}
        data-testid={testId || 'Media'}
      />
    </ErrorBoundary>
  );
};

// Define the pieces of the Media customizable through Theme

const shouldForwardProp = (prop: string) =>
  prop !== 'variant' &&
  prop !== 'fileName' &&
  prop !== 'priority' &&
  prop !== 'testId' &&
  prop !== 'sidekickLookup' &&
  prop !== 'nextImageOptimization';

const Root = styled(Image, {
  name: 'Media',
  slot: 'Root',
  shouldForwardProp: (prop: string) =>
    prop !== 'variant' && prop !== 'fileName' && prop !== 'testId' && prop !== 'sidekickLookup',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>``;

const ArtDirectedRoot = styled(ArtDirectedImage, {
  name: 'Media',
  slot: 'Root',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>``;

const EmbedRoot = styled('iframe', {
  name: 'Media',
  slot: 'EmbedRoot',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>``;

const VideoRoot = styled('video', {
  name: 'Media',
  slot: 'VideoRoot',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>``;

export default Media;
