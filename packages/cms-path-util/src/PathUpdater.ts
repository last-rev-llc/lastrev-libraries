import { each, get, has, isFunction, isString, map, transform } from 'lodash';
import { join } from 'path';
import {
  ApolloContext,
  TypeMappings,
  CmsPathsConfigs,
  CmsPathsConfig,
  ObjectBasedCmsPathsGenerator,
  SanityContextConfig
} from '@last-rev/types';
import PathTree from './PathTree';
import { DEFAULT_SITE_KEY } from './constants';
import { createPathStore, PathStore } from './PathStore';
import LastRevAppConfig from '@last-rev/app-config';

/**
 * CMS-agnostic loadDocumentsByType utility
 */
const loadDocumentsByType = async (ctx: ApolloContext, typeId: string, preview: boolean): Promise<any[]> => {
  if (ctx.cms === 'Sanity') {
    return ctx.sanityLoaders!.documentsByTypeLoader.load({ id: typeId, preview });
  }
  return ctx.loaders.entriesByContentTypeLoader.load({ id: typeId, preview });
};

function isObjectBasedCmsPathsGenerator(config: CmsPathsConfig): config is ObjectBasedCmsPathsGenerator {
  if (typeof config !== 'function') return false;

  // Check the function's parameter signature
  // Object-based generators have 1 parameter, legacy generators have 7 parameters
  return config.length === 1;
}

/**
 * Get entry ID based on CMS type
 */
const getEntryId = (entry: any, isSanity: boolean): string | undefined => {
  return isSanity ? entry?._id : entry?.sys?.id;
};

/**
 * Check if entry has a slug field
 */
const hasSlug = (entry: any, isSanity: boolean): boolean => {
  if (isSanity) {
    // Check for direct slug or i18n array slug
    return !!entry?.slug || (Array.isArray(entry?.slug) && entry.slug.length > 0);
  }
  return has(entry, 'fields.slug');
};

/**
 * Get slug value from entry for a specific locale
 */
const getSlug = (
  entry: any,
  locale: string,
  isSanity: boolean,
  sanityConfig?: SanityContextConfig
): string | undefined => {
  if (isSanity) {
    const fieldValue = entry?.slug;
    if (fieldValue === undefined) return undefined;

    // Check config for i18n strategy
    const useI18nArrays = sanityConfig?.useInternationalizedArrays ?? true;

    if (!useI18nArrays) {
      // Direct access - no i18n array processing (slug is typically a string)
      return typeof fieldValue === 'string' ? fieldValue : fieldValue?.current;
    }

    // Check if this is an i18n array format
    if (!Array.isArray(fieldValue) || !fieldValue[0]?._key) {
      // Not an i18n array - return as-is
      return typeof fieldValue === 'string' ? fieldValue : fieldValue?.current;
    }

    // i18n array format: find by locale key
    const localized = fieldValue.find((v: any) => v._key === locale);
    if (localized?.value !== undefined) {
      return typeof localized.value === 'string' ? localized.value : localized.value?.current;
    }

    return undefined;
  }

  // Contentful: entry.fields.slug[locale]
  return get(entry, ['fields', 'slug', locale]);
};

type PathUpdaterProps = {
  pathsConfigs: CmsPathsConfigs;
  context: ApolloContext;
  preview: boolean;
  site?: string;
  pathStore: PathStore;
  isSanity: boolean;
  sanityConfig?: SanityContextConfig;
};

export class PathUpdater {
  tree: PathTree = new PathTree();
  context: ApolloContext;
  preview: boolean;
  site: string;
  pathsConfigs: CmsPathsConfigs;
  typeMappings: TypeMappings = {};
  pathStore: PathStore;
  isSanity: boolean;
  sanityConfig?: SanityContextConfig;

  constructor({ pathsConfigs, context, preview, site, pathStore, isSanity, sanityConfig }: PathUpdaterProps) {
    this.pathsConfigs = pathsConfigs;
    this.context = context;
    this.preview = preview;
    this.site = site || DEFAULT_SITE_KEY;
    this.pathStore = pathStore;
    this.isSanity = isSanity;
    this.sanityConfig = sanityConfig;
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
    await this.loadContent();
    await this.save();
  }

  async save() {
    const serialized = this.tree.serialize();
    await this.pathStore.save(serialized, this.site);
  }

  async loadContent() {
    const defaultLocale = this.context.defaultLocale;
    const locales = this.context.locales;
    const loaders = this.context.loaders;
    const preview = this.preview;
    const site = this.site;
    const ctx = this.context;
    const isSanity = this.isSanity;
    const sanityConfig = this.sanityConfig;

    const tree = new PathTree();

    await Promise.all(
      map(this.pathsConfigs, async (config, contentTypeId) => {
        const typeKey = get(this.reverseTypeMappings, contentTypeId, contentTypeId);

        // Use CMS-agnostic loadDocumentsByType
        let pages = await loadDocumentsByType(ctx, typeKey, this.preview);

        // CMS-agnostic slug check
        pages = pages.filter((entry) => hasSlug(entry, isSanity));

        if (isString(config)) {
          each(pages, (page) => {
            // CMS-agnostic slug access
            const slug = getSlug(page, defaultLocale, isSanity, sanityConfig);
            if (!slug) return;

            // CMS-agnostic ID access
            const contentId = getEntryId(page, isSanity);
            if (!contentId) return;

            const fullPath = join(config, slug);
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
  const isSanity = config.cms === 'Sanity';
  const sanityConfig = isSanity
    ? {
        useInternationalizedArrays: config.sanity.useInternationalizedArrays,
        fallbackToDefaultLocale: config.sanity.fallbackToDefaultLocale
      }
    : undefined;

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
      isSanity,
      sanityConfig
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
      isSanity,
      sanityConfig
    });
    await updater.updatePaths();
  }
};
