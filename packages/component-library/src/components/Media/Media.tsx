import React from 'react';
import styled from '@mui/system/styled';
// import BackgroundMedia from '../BackgroundMedia';
import ErrorBoundary from '../ErrorBoundary';
import Image from '../Image';
import ArtDirectedImage from '../ArtDirectedImage';
import sidekick from '../../utils/sidekick';

interface File {
  url: string;
  width: string;
  height: string;
}
interface Asset {
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
}

export interface MediaOverrides {}
const Media = ({ variant, file, title, fileMobile, fileTablet, testId, sidekickLookup, ...rest }: MediaProps) => {
  // TODO: Add support for video
  const image = file;
  const alt = title;
  if (variant === 'embed') {
    return (
      <ErrorBoundary>
        <EmbedRoot {...sidekick(sidekickLookup)} src={image?.url} {...rest} sx={{ width: '100%', height: '100%' }} />
      </ErrorBoundary>
    );
  }

  if (fileTablet || fileMobile) {
    return (
      <ErrorBoundary>
        <ArtDirectedRoot
          {...sidekick(sidekickLookup)}
          title={title}
          file={file}
          fileTablet={fileTablet}
          fileMobile={fileMobile}
          {...rest}
          data-testid={testId || 'Media'}
        />
      </ErrorBoundary>
    );
  }
  return (
    <ErrorBoundary>
      <Root {...sidekick(sidekickLookup)} src={image?.url} alt={alt} {...rest} data-testid={testId || 'Media'} />
    </ErrorBoundary>
  );
};

// Define the pieces of the Media customizable through Theme

const Root = styled(Image, {
  name: 'Media',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>(() => ({}));

const ArtDirectedRoot = styled(ArtDirectedImage, {
  name: 'Media',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>(() => ({}));

const EmbedRoot = styled('iframe', {
  name: 'Media',
  slot: 'EmbedRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>(() => ({}));

export default Media;
