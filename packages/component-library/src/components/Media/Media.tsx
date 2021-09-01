import React from 'react';
import styled from '@material-ui/system/styled';
// import BackgroundMedia from '../BackgroundMedia';
import ErrorBoundary from '../ErrorBoundary';
import Image from '../Image';
import sidekick from '../../utils/sidekick';
interface Asset {
  file: {
    url: string;
  };
  title?: string;
  description?: string;
}
export interface MediaProps {
  file?: {
    url: string;
  };
  variant?: string;
  title?: string;
  description?: string;
  desktop?: Asset;
  tablet?: Asset;
  mobile?: Asset;
  sidekickLookup?: string;
  sx?: any;
}

export interface MediaOverrides {}
const Media = ({ variant, file, title, desktop, tablet, mobile, sidekickLookup, ...rest }: MediaProps) => {
  // console.log('Media: ', file);
  // TODO: Add support for video
  const image = file ?? desktop?.file ?? tablet?.file ?? mobile?.file;
  const alt = title ?? desktop?.title ?? tablet?.title ?? mobile?.title;
  if (variant === 'embed') {
    return (
      <ErrorBoundary>
        <EmbedRoot {...sidekick(sidekickLookup)} src={image?.url} {...rest} sx={{ width: '100%', height: '100%' }} />
      </ErrorBoundary>
    );
  }
  return (
    <ErrorBoundary>
      <Root {...sidekick(sidekickLookup)} src={image?.url} alt={alt} {...rest} />
    </ErrorBoundary>
  );
};

// Define the pieces of the Media customizable through Theme

const Root = styled(Image, {
  name: 'Media',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})<{ variant?: string }>(() => ({}));

const EmbedRoot = styled('iframe', {
  name: 'Media',
  slot: 'EmbedRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})<{ variant?: string }>(() => ({}));

export default Media;
