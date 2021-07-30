import { compact, isString, reduce, get, has, isFunction, merge, transform } from 'lodash';
import { join } from 'path';
import {
  ContentfulLoaders,
  PagePathsParam,
  ContentfulPathsConfigs,
  PathToIdMapping,
  TypeMappings,
  SitePathMapping,
  PathData
} from 'types';

const DEFAULT_SITE_KEY = '__lr_default';

const generatePathToIdMapping = async (
  pathsConfigs: ContentfulPathsConfigs,
  loaders: ContentfulLoaders,
  defaultLocale: string,
  locales: string[],
  typeMappings: TypeMappings = {},
  preview: boolean,
  site?: string
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
        merge(pathToIdMapping, await config(page, loaders, defaultLocale, locales, preview, site));
      }
    }
  }

  return pathToIdMapping;
};

export default class PathToIdLookup {
  private _previewMapping: SitePathMapping = {};
  private _prodMapping: SitePathMapping = {};
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

  private async _loadMapping(preview: boolean, site?: string): Promise<void> {
    const mapping = this[preview ? '_previewMapping' : '_prodMapping'];

    mapping[site || DEFAULT_SITE_KEY] = await generatePathToIdMapping(
      this.pathsConfigs,
      this.loaders,
      this.defaultLocale,
      this.locales,
      this.typeMappings,
      preview,
      site
    );
  }

  async lookup(
    path: string,
    preview = false,
    site?: string
  ): Promise<
    | string
    | {
        id: string;
        blockedLocales: string[];
      }
  > {
    if (this.needsLoaded(preview, site)) {
      await this._loadMapping(preview, site);
    }
    return this.getPathData(preview, site, path);
  }

  needsLoaded(preview: boolean, site: string = DEFAULT_SITE_KEY): boolean {
    return !has(this, [preview ? '_previewMapping' : '_prodMapping', site || DEFAULT_SITE_KEY]);
  }

  getMapping(preview: boolean, site: string = DEFAULT_SITE_KEY): PathToIdMapping {
    return get(this, [preview ? '_previewMapping' : '_prodMapping', site || DEFAULT_SITE_KEY]);
  }

  getPathData(preview: boolean, site: string = DEFAULT_SITE_KEY, path: string): PathData {
    return this.getMapping(preview, site)[path];
  }

  async generatePathParams(locales: string[], preview: boolean, site?: string): Promise<PagePathsParam[]> {
    if (this.needsLoaded(preview, site)) {
      await this._loadMapping(preview, site);
    }

    const mapping = this.getMapping(preview, site);

    return reduce(
      mapping,
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
