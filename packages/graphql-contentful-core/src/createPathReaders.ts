import { mapValues } from 'lodash';
import { PathReaders } from 'types';
import { createPathStore, PathReader } from '@last-rev/contentful-path-util';
import LastRevAppConfig from '@last-rev/app-config';

const createPathReaders = (config: LastRevAppConfig): PathReaders => {
  return mapValues(
    {
      preview: true,
      prod: false
    },
    (usePreview) =>
      new PathReader(
        createPathStore({
          ...config,
          contentful: {
            ...config.contentful,
            usePreview
          }
        } as LastRevAppConfig)
      )
  );
};

export default createPathReaders;
