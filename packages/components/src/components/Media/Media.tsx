import React from 'react';
import LRMedia from '@last-rev/component-library/dist/components/Media';
import {
  MediaProps as LRMediaProps,
  File as LRFile
} from '@last-rev/component-library/dist/components/Media/Media.types';
export type { MediaClassKey, MediaClasses } from '@last-rev/component-library/dist/components/Media';

export interface File extends LRFile {
  extension?: string;
}

export interface MediaProps extends LRMediaProps {
  file?: File;
}

function Media(props: MediaProps) {
  if (props.file?.extension === 'pdf') {
    return <iframe src={props.file?.url} width="100%" height="500px" />;
  }

  return <LRMedia {...props} />;
}

export default Media;
