import DataLoader from 'dataloader';
import {
  Asset,
  AssetCollection,
  ContentfulClientApi,
  ContentType,
  ContentTypeCollection,
  Entry,
  EntryCollection,
  Field,
  FieldItem,
  RichTextContent
} from 'contentful';
import { Block, Inline, Mark, Node, Text, Document } from '@contentful/rich-text-types';
import { GraphQLSchema, Source, DocumentNode } from 'graphql';
import {
  SanityDocument,
  SanityImageAsset,
  SanityFileAsset,
  Reference,
  Slug,
  PortableTextBlock,
  SchemaType
} from '@sanity/types';
import { SanityClient } from '@sanity/client';

export type BaseEntry = Entry<any, 'WITH_ALL_LOCALES' | 'WITHOUT_LINK_RESOLUTION'>;
export type BaseAsset = Asset<'WITH_ALL_LOCALES' | 'WITHOUT_LINK_RESOLUTION'>;

// Sanity type aliases (avoid naming collisions)
export type SanityReference = Reference;
export type SanitySlug = Slug;

/**
 * Helper type for internationalized array fields from sanity-plugin-internationalized-array.
 *
 * @example
 * interface BlogPost extends SanityDocument {
 *   title: InternationalizedValue<string>[];
 *   body: InternationalizedValue<PortableTextBlock[]>[];
 * }
 */
export interface InternationalizedValue<T> {
  /** Locale code (e.g., 'en-US', 'es-ES') */
  _key: string;
  /** The localized value */
  value: T;
}

/**
 * CMS-agnostic entry type - handles content from either Contentful or Sanity.
 */
export type CmsEntry = BaseEntry | SanityDocument;

/**
 * CMS-agnostic asset type - handles assets from either Contentful or Sanity.
 */
export type CmsAsset = BaseAsset | SanityImageAsset | SanityFileAsset;

export type ItemKey = {
  id: string;
  preview: boolean;
};

export type PathData = {
  fullPath: string;
  isPrimary: boolean;
  contentId: string;
  excludedLocales: string[];
};

export type PathDataMap = {
  [path: string]: PathData;
};

export type FVLKey = {
  preview: boolean;
  field: string;
  value: string;
  contentType: string;
};

export type PathKey = {
  preview: boolean;
  id: string;
  site?: string;
};

export type RefByKey = {
  preview: boolean;
  id: string;
  contentType: string;
  field: string;
};

/**
 * Contentful-specific loaders using Contentful types.
 */
export type ContentfulLoaders = {
  entryLoader: DataLoader<ItemKey, BaseEntry | null>;
  entriesRefByLoader: DataLoader<RefByKey, BaseEntry[]>;
  entryByFieldValueLoader: DataLoader<FVLKey, BaseEntry | null>;
  assetLoader: DataLoader<ItemKey, BaseAsset | null>;
  entriesByContentTypeLoader: DataLoader<ItemKey, BaseEntry[]>;
  fetchAllContentTypes: (preview: boolean) => Promise<ContentType[]>;
};

/**
 * Legacy alias for backward compatibility.
 * @deprecated Use ContentfulLoaders or SanityLoaders directly.
 */
export type CmsLoaders = ContentfulLoaders;

/**
 * Sanity-specific loaders returning native Sanity documents.
 * Field-level i18n is handled at the resolver level via sanity-plugin-internationalized-array.
 */
export type SanityLoaders = {
  entryLoader: DataLoader<ItemKey, SanityDocument | null>;
  entriesRefByLoader: DataLoader<RefByKey, SanityDocument[]>;
  entryByFieldValueLoader: DataLoader<FVLKey, SanityDocument | null>;
  assetLoader: DataLoader<ItemKey, SanityDocument | null>;
  entriesByContentTypeLoader: DataLoader<ItemKey, SanityDocument[]>;
  fetchAllContentTypes: (preview: boolean) => Promise<SchemaType[]>;
};

export type TypeMappings = {
  [cmsType: string]: string;
};

export type CmsPathsGenerator = (
  resolvedItem: BaseEntry,
  loaders: CmsLoaders,
  defaultLocale: string,
  locales: string[],
  preview?: boolean,
  site?: string
) => Promise<PathDataMap>;

export type ObjectBasedCmsPathsGenerator = ({
  ctx,
  item,
  site,
  preview
}: {
  ctx: ApolloContext;
  item: BaseEntry;
  site?: string;
  preview?: boolean;
}) => Promise<PathDataMap>;

export type CmsPathsConfig = string | CmsPathsGenerator | ObjectBasedCmsPathsGenerator;

export type LegacyCmsPathsConfigs = {
  [contentTypeId: string]: CmsPathsConfig;
};
export type PathRuleDefinition = {
  rule: string;
  isCanonical?: boolean;
  allowFullPaths?: boolean;
};

export type PathFilerFunctionArgs = {
  pathEntries: PathEntries;
  ctx: ApolloContext;
  matchedRule: string;
  site?: string;
};

export type PathFilterFunction = (args: PathFilerFunctionArgs) => Promise<boolean>;

export type RootPathConfig = { field: string; value: string };

export type ContentTypePathRuleConfig = {
  root?: RootPathConfig;
  rules: PathRuleDefinition[];
  filter?: PathFilterFunction;
  allowFullPaths?: boolean;
};

export type PathRuleConfig = {
  [contentType: string]: ContentTypePathRuleConfig;
};

export type CmsPathsConfigs = LegacyCmsPathsConfigs | PathRuleConfig;

export type Extensions = {
  typeDefs: string | DocumentNode | Source | GraphQLSchema;
  resolvers: Record<string, any>;
  mappers: Mappers;
  typeMappings: { [cmsType: string]: string };
  pathsConfigs: CmsPathsConfigs;
};

export type ContentfulClients = {
  prod: ContentfulClientApi;
  preview: ContentfulClientApi;
};

export type SanityClients = {
  prod: SanityClient;
  preview: SanityClient;
};

export type CmsClients = ContentfulClients | SanityClients;

export type PathEntries = (BaseEntry | null)[];

export type PathInfo = {
  path: string;
  pathEntries: PathEntries;
};

export type LoadEntriesForPathFunction = (
  path: string,
  ctx: ApolloContext,
  site?: string
) => Promise<PathEntries | null>;

export type loadPathsForContentFunction = (entry: BaseEntry, ctx: ApolloContext, site?: string) => Promise<PathInfo[]>;

export type ApolloContext = {
  /**
   * Legacy loaders field for Contentful backward compatibility.
   * Always points to ContentfulLoaders.
   */
  loaders: ContentfulLoaders;

  /** CMS-specific loaders keyed by name */
  contentfulLoaders?: ContentfulLoaders;
  sanityLoaders?: SanityLoaders;

  mappers: Mappers;
  defaultLocale: string;
  typeMappings: TypeMappings;
  loadEntriesForPath: LoadEntriesForPathFunction;
  loadPathsForContent: loadPathsForContentFunction;
  locale?: string;
  path?: string;
  locales: string[];
  preview?: boolean;
  contentful?: ContentfulClients;
  sanity?: SanityClients;
  pathReaders?: PathReaders;
  displayType?: string;
  pathEntries?: PathEntries;
  cms: 'Contentful' | 'Sanity';
};

export type TypeMapper = {
  [fieldName: string]: string | Function;
};

export type Mappers = {
  [typeName: string]: {
    [displayType: string]: TypeMapper;
  };
};

export type PagePathsParam = {
  params: {
    slug: string[];
  };
  locale: string;
};

export interface iPathNode {
  data?: PathData;
  key: string;
  parent?: iPathNode;
  children: Map<string, iPathNode>;
  hasChildren: () => boolean;
  getPathEntries: (ctx: ApolloContext) => Promise<PathEntries>;
}

export type PathNodeVisitor = (node: iPathNode) => void;
export interface iPathTree {
  root: iPathNode;
  locateNodeByPath: Map<string, iPathNode>;
  locateNodesById: Map<string, iPathNode[]>;
  appendNewNode: (data: PathData) => void;
  getNodesById: (contentId: string) => iPathNode[];
  getNodeByPath: (path: string) => iPathNode | undefined;
  serialize: () => PathDataMap;
  rebuildFromSerialized: (serializedTree: PathDataMap) => void;
  bfs: (visitor: PathNodeVisitor) => void;
  filter: (predicate: (node: iPathNode) => boolean) => iPathTree;
  getPathDataArray: () => PathData[];
}

export type SitemapPathEntry = {
  locale: string;
  contentId: string;
  path: string;
};
export interface iPathReader {
  getTree: (site?: string) => Promise<iPathTree | undefined>;
  load: (site?: string) => Promise<void>;
  getPathsByContentId: (contentId: string, locale?: string, site?: string) => Promise<string[]>;
  getPathInfosByContentId: (
    contentId: string,
    ctx: ApolloContext,
    site: string = DEFAULT_SITE_KEY
  ) => Promise<PathInfo[]>;
  getAllPaths: (locales: string[], site?: string) => Promise<PagePathsParam[]>;
  getNodeByPath(path: string, site?: string): Promise<iPathNode | undefined>;
  getFilteredTree: (filter?: (node: iPathNode) => boolean, site?: string) => Promise<iPathTree>;
  getSitemap: (locales: string[], site?: string) => Promise<SitemapPathEntry[]>;
}

export type PathReaders = {
  preview: iPathReader;
  prod: iPathReader;
};

export type SitemapEntry = {
  loc: string;
  lastmod: string;
};

export type SitemapPage = {
  loc: string;
  lastmod: string;
  filename: string;
  entries: SitemapEntry[];
};

export type Sitemap = {
  pages: SitemapPage[];
};

// Re-export main Contentful types for abstraction
export type {
  Entry,
  Asset,
  ContentType,
  Field,
  ContentTypeCollection,
  EntryCollection,
  AssetCollection,
  FieldItem,
  RichTextContent
};

export type { Block, Inline, Mark, Node, Text, Document };

// Re-export Sanity types
export type { SanityDocument, SanityImageAsset, SanityFileAsset, PortableTextBlock, SchemaType };
