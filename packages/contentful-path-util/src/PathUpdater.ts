import { each, get, has, isFunction, isString, map, transform } from 'lodash';
import { join } from 'path';
import { ApolloContext, TypeMappings, ContentfulPathsConfigs } from '@last-rev/types';
import PathTree from './PathTree';
import { DEFAULT_SITE_KEY } from './constants';
import { createPathStore, PathStore } from './PathStore';
import LastRevAppConfig from '@last-rev/app-config';

type PathUpdaterProps = {
  pathsConfigs: ContentfulPathsConfigs;
  context: ApolloContext;
  preview: boolean;
  site?: string;
  pathStore: PathStore;
};

export default class PathUpdater {
  tree: PathTree = new PathTree();
  context: ApolloContext;
  preview: boolean;
  site: string;
  pathsConfigs: ContentfulPathsConfigs;
  typeMappings: TypeMappings = {};
  pathStore: PathStore;

  constructor({ pathsConfigs, context, preview, site, pathStore }: PathUpdaterProps) {
    this.pathsConfigs = pathsConfigs;
    this.context = context;
    this.preview = preview;
    this.site = site || DEFAULT_SITE_KEY;
    this.pathStore = pathStore;
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
    await this.loadFromContent();
    await this.save();
  }

  async save() {
    const serialized = this.tree.serialize();
    this.pathStore.save(serialized, this.site);
  }

  async loadFromContent() {
    const defaultLocale = this.context.defaultLocale;
    const locales = this.context.locales;
    const loaders = this.context.loaders;
    const preview = this.preview;
    const site = this.site;

    const tree = new PathTree();

    await Promise.all(
      map(this.pathsConfigs, async (config, contentTypeId) => {
        const typeKey = get(this.reverseTypeMappings, contentTypeId, contentTypeId);

        let pages = await this.context.loaders.entriesByContentTypeLoader.load({ id: typeKey, preview: this.preview });

        pages = pages.filter((entry) => has(entry, 'fields.slug'));

        if (isString(config)) {
          each(pages, (page) => {
            const slug = get(page, ['fields', 'slug', defaultLocale]);
            if (!slug) return;
            const fullPath = join(config, slug);
            const contentId = page.sys.id;
            const excludedLocales: string[] = [];
            tree.appendNewNode({ fullPath, contentId, excludedLocales, isPrimary: true });
          });
        } else if (isFunction(config)) {
          await Promise.all(
            map(pages, (page) =>
              (async () => {
                const pathToIdMapping = await config(page, loaders, defaultLocale, locales, preview, site);
                each(pathToIdMapping, (pathData) => {
                  tree.appendNewNode(pathData);
                });
              })()
            )
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
  let promises = [];
  if (updateForPreview) {
    const pathStore = createPathStore(config);
    promises.push(
      Promise.all(
        map(config.sites || [DEFAULT_SITE_KEY], (site) =>
          updatePathsForSite({
            pathStore,
            updateForPreview,
            updateForProd,
            site,
            pathsConfigs: config.extensions.pathsConfigs,
            context
          })
        )
      )
    );
  }
  if (updateForProd) {
    const pathStore = createPathStore(config);

    promises.push(
      Promise.all(
        map(config.sites || [DEFAULT_SITE_KEY], (site) =>
          updatePathsForSite({
            pathStore,
            updateForPreview,
            updateForProd,
            site,
            pathsConfigs: config.extensions.pathsConfigs,
            context
          })
        )
      )
    );
  }

  await Promise.all(promises);
};

const updatePathsForSite = async ({
  pathStore,
  updateForPreview,
  updateForProd,
  site,
  pathsConfigs,
  context
}: {
  pathStore: PathStore;
  updateForPreview: boolean;
  updateForProd: boolean;
  site: string;
  pathsConfigs: ContentfulPathsConfigs;
  context: ApolloContext;
}) => {
  if (updateForPreview) {
    const updater = new PathUpdater({ pathStore, site, pathsConfigs, context, preview: true });
    await updater.updatePaths();
  }
  if (updateForProd) {
    const updater = new PathUpdater({ pathStore, site, pathsConfigs, context, preview: false });
    await updater.updatePaths();
  }
};
