import { Entry } from 'contentful';
import { ApolloContext, ContentfulLoaders, PathEntries } from '@last-rev/types';
import traversePathRule, { PathVisitor } from './traversePathRule';
import { Field, PathRule, RefByExpression, ReferenceExpression, StaticSegment } from './types';

type SegmentResult = {
  segmentIndex: number;
  entry: Entry<any>;
  slug: string;
};

type ContentToPathsFetcherContext = {
  entry: Entry<any>;
  defaultLocale: string;
  preview: boolean;
  currentSegmentIndex: number;
  promises: Promise<SegmentResult[]>[];
  entriesRefByLoader: ContentfulLoaders['entriesRefByLoader'];
  entryLoader: ContentfulLoaders['entryLoader'];
  currentPromise: Promise<Entry<any>[]> | null;
  slugs: (string | null)[];
};

const pathToItemsFetcherVisitor: PathVisitor<ContentToPathsFetcherContext> = {
  StaticSegment: {
    exit: (node, _parent, context) => {
      const { value } = node as StaticSegment;
      context.slugs[context.currentSegmentIndex] = value;
      // segment ended, increment segment index
      context.currentSegmentIndex++;
    }
  },
  DynamicSegment: {
    enter: (_node, _parent, context) => {
      context.currentPromise = null;
    },
    exit: (_node, _parent, context) => {
      context.slugs[context.currentSegmentIndex] = null;
      // segment ended, increment segment index
      context.currentSegmentIndex++;
    }
  },
  RefByExpression: {
    enter: (node, parent, context) => {
      const { refByField, contentType } = node as RefByExpression;
      switch (parent!.type) {
        case 'RefByExpression':
        case 'ReferenceExpression': {
          const { currentPromise } = context;
          if (!currentPromise) {
            throw Error(`node is ${node.type}, parent is ${parent!.type}, but currentPromise is null`);
          }
          const func = async () => {
            const results = await currentPromise;
            if (!results.length) return [];

            const ids: string[] = results.map((entry) => entry.sys.id);
            const entriesArr = await context.entriesRefByLoader.loadMany(
              ids.map((id) => ({ id, preview: !!context.preview, field: refByField, contentType }))
            );
            return entriesArr.reduce((acc: Entry<any>[], entries) => {
              if (Array.isArray(entries)) {
                acc.push(...entries);
              }
              return acc;
            }, [] as Entry<any>[]);
          };
          context.currentPromise = func();
          break;
        }
        case 'DynamicSegment': {
          const { entry } = context;
          const func = async () => {
            const id = entry.sys.id;
            return await context.entriesRefByLoader.load({
              id,
              preview: !!context.preview,
              field: refByField,
              contentType
            });
          };
          context.currentPromise = func();
          break;
        }
      }
    }
  },
  ReferenceExpression: {
    enter: (node, parent, context) => {
      const { field, contentType } = node as ReferenceExpression;
      switch (parent!.type) {
        case 'RefByExpression':
        case 'ReferenceExpression': {
          const { currentPromise } = context;
          if (!currentPromise) {
            throw Error(`node is ${node.type}, parent is ${parent!.type}, but currentPromise is null`);
          }
          const func = async () => {
            const results = await currentPromise;
            if (!results.length) return [];
            const ids: string[] = results
              .map((entry) => {
                const ref = entry.fields[field]?.[context.defaultLocale];
                if (!ref) return [];
                if (!Array.isArray(ref)) {
                  return [ref.sys.id];
                }
                return ref.map((x) => x.sys.id);
              })
              .flat();
            const entries = await context.entryLoader.loadMany(ids.map((id) => ({ id, preview: !!context.preview })));
            return entries.filter((e) => e && (e as Entry<any>).sys.contentType.sys.id === contentType) as Entry<any>[];
          };
          context.currentPromise = func();
          break;
        }
        case 'DynamicSegment': {
          const { entry } = context;
          const func = async () => {
            let ids: string[] = [];
            const ref = entry.fields[field]?.[context.defaultLocale];
            if (!ref) ids = [];
            if (!Array.isArray(ref)) {
              ids = [ref.sys.id];
            }
            ids = ref.map((x: any) => x.sys.id);
            const entries = await context.entryLoader.loadMany(ids.map((id) => ({ id, preview: !!context.preview })));
            return entries.filter((e) => e && (e as Entry<any>).sys.contentType.sys.id === contentType) as Entry<any>[];
          };
          context.currentPromise = func();
          break;
        }
      }
    }
  },

  Field: {
    enter: (node, parent, context) => {
      const { name } = node as Field;
      const { currentSegmentIndex, currentPromise, defaultLocale, entry } = context;
      switch (parent!.type) {
        case 'ReferenceExpression':
        case 'RefByExpression':
          if (!currentPromise) {
            throw Error(`node is ${node.type}, parent is ${parent!.type}, but currentPromise is null`);
          }
          const func = async () => {
            const results = await currentPromise;
            if (!results.length) return [];
            const segmentResults: SegmentResult[] = results.map((entry) => {
              return {
                segmentIndex: currentSegmentIndex,
                entry,
                slug: entry.fields[name]?.[defaultLocale]
              };
            });
            return segmentResults.filter((x) => !!x.slug);
          };
          context.promises.push(func());
          break;
        case 'DynamicSegment':
          const slug = entry.fields[name]?.[defaultLocale];
          if (slug) {
            context.promises.push(
              new Promise((resolve) =>
                resolve([
                  {
                    segmentIndex: currentSegmentIndex,
                    slug,
                    entry
                  }
                ])
              )
            );
          }

          break;
        default:
      }
    }
  }
};

export default class ContentToPathsFetcher {
  private readonly _pathRule: PathRule;

  constructor({ pathRule }: { pathRule: PathRule }) {
    this._pathRule = pathRule;
  }

  get logPrefix() {
    return `[${this.constructor.name}]`;
  }

  async fetch({ entry, apolloContext }: { entry: Entry<any>; apolloContext: ApolloContext }) {
    const context: ContentToPathsFetcherContext = {
      entry,
      currentSegmentIndex: 0,
      promises: [],
      entryLoader: apolloContext.loaders!.entryLoader,
      entriesRefByLoader: apolloContext.loaders!.entriesRefByLoader,
      defaultLocale: apolloContext.defaultLocale,
      preview: !!apolloContext.preview,
      currentPromise: null,
      slugs: []
    };

    traversePathRule(this._pathRule, pathToItemsFetcherVisitor, context);

    const resolved = (await Promise.all(context.promises)).flat();

    const { slugs } = context;

    const results = slugs.reduce((acc, slug, index) => {
      if (slug) {
        if (!acc.length) {
          return [{ path: `/${slug}`, pathEntries: [null] }];
        }
        return acc.map((old) => ({
          path: `${old.path}/${slug}`,
          pathEntries: [...old.pathEntries, null]
        }));
      } else {
        const resultsForThisIndex = resolved.filter((r) => r.segmentIndex === index);
        if (!acc.length) {
          return resultsForThisIndex.map((r) => ({ path: `/${r.slug}`, pathEntries: [r.entry] }));
        }
        return acc
          .map((old) => {
            return resultsForThisIndex.map((r) => ({
              path: `${old.path}/${r.slug}`,
              pathEntries: [...old.pathEntries, r.entry]
            }));
          })
          .flat();
      }
    }, [] as { path: string; pathEntries: PathEntries }[]);

    return results;
  }
}
