import { ContentfulFsLoaders } from '@last-rev/contentful-fs-loader';
import { get, has, isFunction, isString, merge, reduce } from 'lodash';
import { join } from 'path';
import { ContentfulPathsConfigs, PathToIdMapping } from 'types';

const generatePathToIdMapping = async (
  pathsConfigs: ContentfulPathsConfigs,
  loaders: ContentfulFsLoaders,
  defaultLocale: string,
  locales: string[]
): Promise<PathToIdMapping> => {
  const pathToIdMapping: PathToIdMapping = {};

  for (const contentTypeId of Object.keys(pathsConfigs)) {
    const config = pathsConfigs[contentTypeId];
    const pages = (await loaders.entriesByContentTypeLoader.load(contentTypeId)).filter((entry) =>
      has(entry, 'fields.slug')
    );

    if (isString(config)) {
      merge(
        pathToIdMapping,
        reduce(
          pages,
          (accum, page) => {
            accum[join(config, get(page, ['fields', 'slug', defaultLocale], ''))] = get(page, 'sys.id', '');
            return accum;
          },
          {} as PathToIdMapping
        )
      );
    } else if (isFunction(config)) {
      for (const page of pages) {
        merge(pathToIdMapping, await config(page, loaders, defaultLocale, locales));
      }
    }
  }

  return pathToIdMapping;
};

export default generatePathToIdMapping;
