import React from 'react';
import { useAmp } from 'next/amp';

import { styled } from '@mui/material/styles';

import sidekick from '@last-rev/contentful-sidekick-util';

import ErrorBoundary from '../ErrorBoundary';
import Image from '../Image';
import ArtDirectedImage from '../ArtDirectedImage';

import type { MediaProps, MediaVideoProps } from './Media.types';

const Media = (props: MediaProps & MediaVideoProps) => {
  const isAmp = useAmp();

  const { variant, file, title, fileMobile, fileTablet, testId, sidekickLookup, ...other } = props;

  // TODO: Add support for video
  const image = file;
  const alt = title || '';

  if (variant === 'embed' && isAmp) {
    return (
      <ErrorBoundary>
        {/* @ts-expect-error */}
        <amp-iframe
          {...sidekick(sidekickLookup)}
          src={image?.url}
          data-testid={testId || 'Media'}
          width={image?.width ?? 800}
          height={image?.height ?? 400}
          layout="responsive"
          sandbox="allow-scripts allow-same-origin"
        />
      </ErrorBoundary>
    );
  }
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
          {...other}
          title={title}
          file={file}
          fileTablet={fileTablet}
          fileMobile={fileMobile}
          testId={testId || 'Media'}
        />
      </ErrorBoundary>
    );
  }
  return (
    <ErrorBoundary>
      <Root
        {...sidekick(sidekickLookup)}
        {...image}
        {...other}
        src={image?.url}
        alt={'alt'}
        columns={other.columns}
        testId={testId || 'Media'}
      />
    </ErrorBoundary>
  );
};

// Define the pieces of the Media customizable through Theme

const shouldForwardProp = (prop: string) =>
  prop !== 'variant' &&
  prop !== 'fileName' &&
  prop !== 'testId' &&
  prop !== 'priority' &&
  prop !== 'sidekickLookup' &&
  prop !== 'sx' &&
  prop !== 'file' &&
  prop !== 'nextImageOptimization';

const Root = styled(Image, {
  name: 'Media',
  slot: 'Root',
  shouldForwardProp: (prop: string) => prop !== 'variant' && prop !== 'fileName' && prop !== 'sidekickLookup',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>``;

const ArtDirectedRoot = styled(ArtDirectedImage, {
  name: 'Media',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>``;

const EmbedRoot = styled('iframe', {
  name: 'Media',
  slot: 'EmbedRoot',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.root]
})``;

const VideoRoot = styled('video', {
  name: 'Media',
  slot: 'VideoRoot',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>``;

export default Media;
