import LastRevAppConfig from '@last-rev/app-config';
import { join } from 'path';

export const buildPagePath = (config: LastRevAppConfig, contentType: string, locale: string, page: number) => {
  return join(config.sitemap.pagesRootPath, locale, `${contentType}-${page}-sitemap.xml`);
};
