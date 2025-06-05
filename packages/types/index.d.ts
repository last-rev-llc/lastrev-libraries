import DataLoader from 'dataloader';
import { Entry, Asset, ContentType, ContentfulClientApi } from 'contentful';
import { GraphQLSchema, Source, DocumentNode } from 'graphql';

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

export type CmsLoaders = {
  entryLoader: DataLoader<ItemKey, Entry<any> | null>;
  entriesRefByLoader: DataLoader<RefByKey, Entry<any>[]>;
  entryByFieldValueLoader: DataLoader<FVLKey, Entry<any> | null>;
  assetLoader: DataLoader<ItemKey, Asset | null>;
  entriesByContentTypeLoader: DataLoader<ItemKey, Entry<any>[]>;
  // pathLoader: DataLoader<PathKey, PathData2 | null>;
  fetchAllContentTypes: (preview: boolean) => Promise<ContentType[]>;
};

export type TypeMappings = {
  [contentfulType: string]: string;
};

export type ContentfulPathsGenerator = (
  resolvedItem: Entry<any>,
  loaders: CmsLoaders,
  defaultLocale: string,
  locales: string[],
  preview?: boolean,
  site?: string
) => Promise<PathDataMap>;

export type ContentfulPathsConfig = string | ContentfulPathsGenerator;

export type LegacyContentfulPathsConfigs = {
  [contentTypeId: string]: ContentfulPathsConfig;
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

export type ContentfulPathsConfigs = LegacyContentfulPathsConfigs | PathRuleConfig;

export type Extensions = {
  typeDefs: string | DocumentNode | Source | GraphQLSchema;
  resolvers: Record<string, any>;
  mappers: Mappers;
  typeMappings: { [contentfulType: string]: string };
  pathsConfigs: ContentfulPathsConfigs;
};

export type ContentfulClients = {
  prod: ContentfulClientApi;
  preview: ContentfulClientApi;
};

export type CmsClients =
  | ContentfulClients
  | {
      prod: any;
      preview: any;
    };

export type PathEntries = (Entry<any> | null)[];

export type PathInfo = {
  path: string;
  pathEntries: PathEntries;
};

export type LoadEntriesForPathFunction = (
  path: string,
  ctx: ApolloContext,
  site?: string
) => Promise<PathEntries | null>;

export type loadPathsForContentFunction = (entry: Entry<any>, ctx: ApolloContext, site?: string) => Promise<PathInfo[]>;

export type ApolloContext = {
  loaders: CmsLoaders;
  mappers: Mappers;
  defaultLocale: string;
  typeMappings: TypeMappings;
  loadEntriesForPath: LoadEntriesForPathFunction;
  loadPathsForContent: loadPathsForContentFunction;
  locale?: string;
  path?: string;
  locales: string[];
  preview?: boolean;
  contentful?: CmsClients;
  sanity?: CmsClients;
  pathReaders?: PathReaders;
  displayType?: string;
  pathEntries?: PathEntries;
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
