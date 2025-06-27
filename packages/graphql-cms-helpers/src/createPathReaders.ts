import { PathReaders } from '@last-rev/types';
import { createPathStore, PathReader } from '@last-rev/cms-path-util';
import LastRevAppConfig from '@last-rev/app-config';

const createPathReaders = (config: LastRevAppConfig): PathReaders | undefined => {
  if (config.paths.generateFullPathTree) {
    const [previewPathStore, prodPathStore] = [true, false].map((usePreview) =>
      createPathStore(config.clone({ contentful: { usePreview }, sanity: { usePreview } }))
    );

    return {
      preview: new PathReader(previewPathStore),
      prod: new PathReader(prodPathStore)
    };
  }
  return undefined;
};

export default createPathReaders;
