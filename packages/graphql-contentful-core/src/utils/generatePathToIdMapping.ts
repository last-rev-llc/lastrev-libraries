import { ContentfulFsLoaders } from '@last-rev/contentful-fs-loader';
import { get, has, isFunction, isString, merge, reduce, transform } from 'lodash';
import { join } from 'path';
import { ContentfulPathsConfigs, PathToIdMapping, TypeMappings } from '../types';

const generatePathToIdMapping = async (
  pathsConfigs: ContentfulPathsConfigs,
  loaders: ContentfulFsLoaders,
  defaultLocale: string,
  locales: string[],
  typeMappings: TypeMappings = {}
): Promise<PathToIdMapping> => {
  const pathToIdMapping: PathToIdMapping = {};

  const reverseTypeMappings = transform(
    typeMappings,
    (accum, v, k) => {
      accum[v] = k;
      return accum;
    },
    {} as Record<string, string>
  );

  for (const contentTypeId of Object.keys(pathsConfigs)) {
    const config = pathsConfigs[contentTypeId];
    const typeKey = get(reverseTypeMappings, contentTypeId, contentTypeId);

    let pages = await loaders.entriesByContentTypeLoader.load(typeKey);

    pages = pages.filter((entry) => has(entry, 'fields.slug'));

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
