import LastRevAppConfig from '@last-rev/app-config';
import contentfulSync from './contentfulSync';
import sanitySync from './sanitySync';
import { validateArg } from './utils';

const sync = async (config: LastRevAppConfig, sites?: string[]) => {
  const cms = config.cms;
  const usePreview = cms === 'Sanity' ? config.sanity.usePreview : config.contentful.usePreview;

  validateArg(config.fs.contentDir, 'fs.contentDir');

  if (config.cms === 'Sanity') {
    return sanitySync(config, usePreview, sites);
  }

  return contentfulSync(config, usePreview, sites);
};

export default sync;
