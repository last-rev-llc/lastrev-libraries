import React from 'react';
import styled from '@material-ui/system/styled';
// import BackgroundMedia from '../BackgroundMedia';
import ErrorBoundary from '../ErrorBoundary';
import Image from '../Image';

export interface MediaProps {
  file: {
    url: string;
  };
  alt: string;
}

export interface MediaOverrides {}
const Media = ({ file, alt }: MediaProps) => {
  console.log('Media: ', file);

  return (
    <ErrorBoundary>
      <Root src={file.url} alt={alt} />
    </ErrorBoundary>
  );
};

// Define the pieces of the Media customizable through Theme

const Root = styled(Image, {
  name: 'Media',
  slot: 'Root',
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})<{ variant?: string }>(() => ({}));

export default Media;
