import { each, get, has, isFunction, isString, map, transform } from 'lodash';
import { join } from 'path';
import {
  ApolloContext,
  TypeMappings,
  CmsPathsConfigs,
  PathRuleConfig,
  PathData,
  CmsPathsConfig,
  ObjectBasedCmsPathsGenerator
} from '@last-rev/types';
import PathTree from './PathTree';
import { DEFAULT_SITE_KEY } from './constants';
import { createPathStore, PathStore } from './PathStore';
import LastRevAppConfig from '@last-rev/app-config';
import { ContentToPathsLoader } from '@last-rev/cms-path-rules-engine';

function isObjectBasedCmsPathsGenerator(config: CmsPathsConfig): config is ObjectBasedCmsPathsGenerator {
  if (typeof config !== 'function') return false;

  // Check the function's parameter signature
  // Object-based generators have 1 parameter, legacy generators have 7 parameters
  return config.length === 1;
}

type PathUpdaterProps = {
  pathsConfigs: CmsPathsConfigs;
  context: ApolloContext;
  preview: boolean;
  site?: string;
  pathStore: PathStore;
  enablePathsV2: boolean;
};

export class PathUpdater {
  tree: PathTree = new PathTree();
  context: ApolloContext;
  preview: boolean;
  site: string;
  pathsConfigs: CmsPathsConfigs;
  typeMappings: TypeMappings = {};
  pathStore: PathStore;
  enablePathsV2: boolean;

  constructor({ pathsConfigs, context, preview, site, pathStore, enablePathsV2 }: PathUpdaterProps) {
    this.pathsConfigs = pathsConfigs;
    this.context = context;
    this.preview = preview;
    this.site = site || DEFAULT_SITE_KEY;
    this.pathStore = pathStore;
    this.enablePathsV2 = enablePathsV2;
  }

  get reverseTypeMappings() {
    return transform(
      this.typeMappings,
      (accum, v, k) => {
        accum[v] = k;
        return accum;
      },
      {} as Record<string, string>
    );
  }

  async updatePaths() {
    if (this.enablePathsV2) {
      await this.loadFromV2Content();
    } else {
      await this.loadFromV1Content();
    }
    await this.save();
  }

  async save() {
    const serialized = this.tree.serialize();
    await this.pathStore.save(serialized, this.site);
  }

  async loadFromV2Content() {
    const pathRuleConfig = this.pathsConfigs as PathRuleConfig;

    const tree = new PathTree();
    const pathLoader = new ContentToPathsLoader(pathRuleConfig);
    const context = this.context;
    const locales = this.context.locales;
    const site = this.site;

    await Promise.all(
      Object.keys(pathRuleConfig).map(async (contentTypeId) => {
        const allItems = await this.context.loaders.entriesByContentTypeLoader.load({
          id: contentTypeId,
          preview: this.preview
        });
        const pathDatas = (
          await Promise.all(
            allItems.map(async (item) => {
              const pathToLocales: Record<string, string[]> = {};

              await Promise.all(
                locales.map(async (locale) => {
                  const pathInfos = await pathLoader.loadPathsFromContent(
                    item,
                    {
                      ...context,
                      locale
                    },
                    site
                  );
                  pathInfos.forEach((pathInfo) => {
                    const path = pathInfo.path;
                    if (!pathToLocales[path]) {
                      pathToLocales[path] = [];
                    }
                    pathToLocales[path].push(locale);
                  });
                })
              );

              const pathDatas: PathData[] = Object.keys(pathToLocales).reduce((accum, path) => {
                const excludedLocales = locales.filter((locale) => !pathToLocales[path].includes(locale));
                accum.push({
                  fullPath: path,
                  contentId: item.sys.id,
                  excludedLocales,
                  isPrimary: true // ???
                });
                return accum;
              }, [] as PathData[]);

              return pathDatas;
            })
          )
        ).flat();

        pathDatas.forEach((pathData) => tree.appendNewNode(pathData));
      })
    );

    this.tree = tree;
  }

  async loadFromV1Content() {
    const defaultLocale = this.context.defaultLocale;
    const locales = this.context.locales;
    const loaders = this.context.loaders;
    const preview = this.preview;
    const site = this.site;
    const ctx = this.context;

    const tree = new PathTree();

    await Promise.all(
      map(this.pathsConfigs, async (config, contentTypeId) => {
        const typeKey = get(this.reverseTypeMappings, contentTypeId, contentTypeId);

        let pages = await this.context.loaders.entriesByContentTypeLoader.load({ id: typeKey, preview: this.preview });

        pages = pages.filter((entry) => has(entry, 'fields.slug'));

        if (isString(config)) {
          each(pages, (page) => {
            const slug = get(page, ['fields', 'slug', defaultLocale]) as string | undefined;
            if (!slug) return;
            const fullPath = join(config, slug);
            const contentId = page.sys.id;
            const excludedLocales: string[] = [];
            tree.appendNewNode({ fullPath, contentId, excludedLocales, isPrimary: true });
          });
        } else if (isFunction(config)) {
          await Promise.all(
            map(pages, async (page) => {
              const pathToIdMapping = isObjectBasedCmsPathsGenerator(config)
                ? await config({ ctx, item: page, site, preview })
                : await config(page, loaders, defaultLocale, locales, preview, site);

              each(pathToIdMapping, (pathData) => {
                tree.appendNewNode(pathData);
              });
            })
          );
        }
      })
    );

    this.tree = tree;
  }
}

type UpdatePathsProps = {
  config: LastRevAppConfig;
  updateForPreview: boolean;
  updateForProd: boolean;
  context: ApolloContext;
  sites?: string[];
};

export const updateAllPaths = async ({ config, updateForPreview, updateForProd, context }: UpdatePathsProps) => {
  if (!config.paths.generateFullPathTree) return;

  let promises = [];
  if (updateForPreview) {
    promises.push(
      ...map(config.sites.length ? config.sites : [DEFAULT_SITE_KEY], (site) =>
        updatePathsForSite({
          config,
          updateForPreview,
          updateForProd,
          site,
          pathsConfigs: config.extensions.pathsConfigs,
          context: {
            ...context,
            preview: true
          }
        })
      )
    );
  }
  if (updateForProd) {
    promises.push(
      ...map(config.sites || [DEFAULT_SITE_KEY], (site) =>
        updatePathsForSite({
          config,
          updateForPreview,
          updateForProd,
          site,
          pathsConfigs: config.extensions.pathsConfigs,
          context: {
            ...context,
            preview: false
          }
        })
      )
    );
  }

  await Promise.all(promises);
};

const updatePathsForSite = async ({
  config,
  updateForPreview,
  updateForProd,
  site,
  pathsConfigs,
  context
}: {
  config: LastRevAppConfig;
  updateForPreview: boolean;
  updateForProd: boolean;
  site: string;
  pathsConfigs: CmsPathsConfigs;
  context: ApolloContext;
}) => {
  if (updateForPreview) {
    const pathStore = createPathStore(
      config.clone({
        contentful: {
          usePreview: true
        },
        sanity: {
          usePreview: true
        }
      })
    );

    context.preview = true;
    const updater = new PathUpdater({
      pathStore,
      site,
      pathsConfigs,
      context,
      preview: true,
      enablePathsV2: config.features.enablePathsV2
    });
    await updater.updatePaths();
  }
  if (updateForProd) {
    const pathStore = createPathStore(
      config.clone({
        contentful: {
          usePreview: false
        },
        sanity: {
          usePreview: false
        }
      })
    );

    context.preview = false;
    const updater = new PathUpdater({
      pathStore,
      site,
      pathsConfigs,
      context,
      preview: false,
      enablePathsV2: config.features.enablePathsV2
    });
    await updater.updatePaths();
  }
};
