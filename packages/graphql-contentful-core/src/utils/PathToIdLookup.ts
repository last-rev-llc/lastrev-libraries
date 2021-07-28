import { compact, isString, reduce, get, has, isFunction, merge, transform } from 'lodash';
import { join } from 'path';
import { ContentfulLoaders, PagePathsParam, ContentfulPathsConfigs, PathToIdMapping, TypeMappings } from 'types';

const generatePathToIdMapping = async (
  pathsConfigs: ContentfulPathsConfigs,
  loaders: ContentfulLoaders,
  defaultLocale: string,
  locales: string[],
  typeMappings: TypeMappings = {},
  preview: boolean
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

    let pages = await loaders.entriesByContentTypeLoader.load({ id: typeKey, preview });

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

export default class PathToIdLookup {
  private _previewMapping: PathToIdMapping | null = null;
  private _prodMapping: PathToIdMapping | null = null;
  private pathsConfigs: ContentfulPathsConfigs;
  private loaders: ContentfulLoaders;
  private defaultLocale: string;
  private locales: string[];
  private typeMappings: TypeMappings;

  constructor(
    pathsConfigs: ContentfulPathsConfigs,
    loaders: ContentfulLoaders,
    defaultLocale: string,
    locales: string[],
    typeMappings: TypeMappings
  ) {
    this.pathsConfigs = pathsConfigs;
    this.loaders = loaders;
    this.defaultLocale = defaultLocale;
    this.locales = locales;
    this.typeMappings = typeMappings;
  }

  private async _loadMapping(preview: boolean): Promise<void> {
    this[preview ? '_previewMapping' : '_prodMapping'] = await generatePathToIdMapping(
      this.pathsConfigs,
      this.loaders,
      this.defaultLocale,
      this.locales,
      this.typeMappings,
      preview
    );
  }

  async lookup(
    path: string,
    preview = false
  ): Promise<
    | string
    | {
        id: string;
        blockedLocales: string[];
      }
  > {
    const field = preview ? '_previewMapping' : '_prodMapping';
    if (!this[field]) {
      await this._loadMapping(preview);
    }
    return (this[field] as PathToIdMapping)[path];
  }

  async generatePathParams(locales: string[], preview: boolean): Promise<PagePathsParam[]> {
    const field = preview ? '_previewMapping' : '_prodMapping';
    if (!this[field]) {
      await this._loadMapping(preview);
    }
    return reduce(
      this[field] as PathToIdMapping,
      (accum, idOrObj, path) => {
        accum.push(
          ...compact(
            locales.map((locale) => {
              if (!isString(idOrObj)) {
                if (idOrObj.blockedLocales.indexOf(locale) > -1) return null;
              }
              return {
                params: {
                  slug: compact(path.split('/')),
                  locale
                }
              };
            })
          )
        );
        return accum;
      },
      [] as PagePathsParam[]
    );
  }
}
