import React from 'react';
import { styled } from '@mui/material/styles';
import { useAmp } from 'next/amp';
import ErrorBoundary from '../ErrorBoundary';
import Image from '../Image';
import ArtDirectedImage from '../ArtDirectedImage';
import sidekick from '@last-rev/contentful-sidekick-util';

import { MediaOwnerState, MediaProps, MediaVideoProps } from './Media.types';

// import dynamic from 'next/dynamic';

// const Image = dynamic(() => import('../Image'));
// const ArtDirectedImage = dynamic(() => import('../ArtDirectedImage'));

const Media = (props: MediaProps & MediaVideoProps) => {
  const isAmp = useAmp();

  const { variant, file, title, fileMobile, fileTablet, testId, sidekickLookup, ...other } = props;
  const ownerState = { ...props };
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
          sandbox="allow-scripts allow-same-origin"
        />
      </ErrorBoundary>
    );
  }
  if (variant === 'embed') {
    return (
      <ErrorBoundary>
        <EmbedRoot
          ownerState={ownerState}
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
          ownerState={ownerState}
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
          ownerState={ownerState}
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
        ownerState={ownerState}
        {...sidekick(sidekickLookup)}
        {...image}
        {...other}
        src={image?.url}
        alt={alt}
        testId={testId || 'Media'}
      />
    </ErrorBoundary>
  );
};

// Define the pieces of the Media customizable through Theme

const Root = styled(Image, {
  name: 'Media',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: MediaOwnerState }>``;

const ArtDirectedRoot = styled(ArtDirectedImage, {
  name: 'Media',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: MediaOwnerState }>``;

const EmbedRoot = styled('iframe', {
  name: 'Media',
  slot: 'EmbedRoot',

  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: MediaOwnerState }>``;

const VideoRoot = styled('video', {
  name: 'Media',
  slot: 'VideoRoot',

  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: MediaOwnerState }>``;

export default Media;
