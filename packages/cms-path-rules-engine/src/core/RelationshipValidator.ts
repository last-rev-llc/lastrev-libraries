import { PathRule, RefByExpression, ReferenceExpression, SegmentReference } from '../types';
import traversePathRule, { PathVisitor } from './traversePathRule';
import { ApolloContext, PathEntries, BaseEntry } from '@last-rev/types';
import { getWinstonLogger } from '@last-rev/logging';

const logger = getWinstonLogger({ package: 'cms-path-rules-engine', module: 'RelationshipValidator' });

type SegmentValidator = (item: BaseEntry, pathEntries: PathEntries, ctx: ApolloContext) => Promise<string | null>;
type ResolutionRootsResolver = (pathEntries: PathEntries, ctx: ApolloContext) => Promise<BaseEntry[]>;

type Context = {
  currentSegmentIndex: number;
  segmentValidators: (SegmentValidator | null)[];
  getResolutionRoots: ResolutionRootsResolver;
};

const createRefResolutionRootsResolver = (
  field: string,
  contentType: string,
  getResolutionRoots: ResolutionRootsResolver
): ResolutionRootsResolver => {
  return async (pathEntries, ctx) => {
    try {
      const resolutionRoots = await getResolutionRoots(pathEntries, ctx);
      const preview = !!ctx.preview;
      const refs = resolutionRoots
        .map((root) => {
          const ref = (root.fields as any)[field]?.[ctx.defaultLocale];
          if (!ref) return [];
          if (!Array.isArray(ref)) return [ref];
          return ref;
        })
        .flat();
      const loaded = await ctx.loaders.entryLoader.loadMany(refs.map((e: any) => ({ id: e.sys.id, preview })));

      return loaded.filter((a: any) => {
        return !!a?.sys?.id && a?.sys?.contentType?.sys?.id === contentType;
      }) as BaseEntry[];
    } catch (err: any) {
      logger.error(`Error resolving referce resolution roots: ${err.message}`, {
        caller: 'createRefResolutionRootsResolver',
        stack: err.stack
      });
      return [];
    }
  };
};

const createRefbyResolutionRootsResolver = (
  refByField: string,
  contentType: string,
  getResolutionRoots: ResolutionRootsResolver
): ResolutionRootsResolver => {
  return async (pathEntries, ctx) => {
    try {
      const resolutionRoots = await getResolutionRoots(pathEntries, ctx);
      const preview = !!ctx.preview;
      const ids = resolutionRoots.map((root) => root.sys.id);
      const settled = await Promise.allSettled(
        ids.map((id) => ctx.loaders.entriesRefByLoader.load({ id, preview, contentType, field: refByField }))
      );
      return settled
        .filter((s) => s.status === 'fulfilled')
        .map((s) => (s as PromiseFulfilledResult<BaseEntry[]>).value)
        .flat();
    } catch (err: any) {
      logger.error(`Error resolving refBy resolution roots: ${err.message}`, {
        caller: 'createRefbyResolutionRootsResolver',
        stack: err.stack
      });
      return [];
    }
  };
};

const createSegmentValidator = (
  currentSegment: number,
  getResolutionRoots: ResolutionRootsResolver
): SegmentValidator => {
  return async (item, pathEntries, ctx) => {
    try {
      const roots = await getResolutionRoots(pathEntries, ctx);
      if (!roots.length) {
        return `no resolution roots found for segment ${currentSegment}`;
      }
      const results = roots.some((r) => {
        return r.sys.id === item.sys.id;
      });
      if (!results) {
        return `resolution roots did not match any item with id ${item.sys.id} in segment ${currentSegment}`;
      }
      return null;
    } catch (err: any) {
      logger.error(`Error validating segment ${currentSegment}: ${err.message}`, {
        caller: 'createSegmentValidator',
        stack: err.stack
      });
      return null;
    }
  };
};

const createSegmentResolutionRootsResolver = (index: number): ResolutionRootsResolver => {
  return async (pathEntries) => {
    const item = pathEntries[index];
    if (!item) throw Error(`Segment at ${index} does not resolve to an entry!`);
    return [item];
  };
};

const relationshipValidationVisitor: PathVisitor<Context> = {
  StaticSegment: {
    enter: (_node, _parent, context) => {
      context.segmentValidators[context.currentSegmentIndex] = null;
    },
    exit: (_node, _parent, context) => {
      // segment ended, increment slug index
      context.currentSegmentIndex++;
    }
  },
  DynamicSegment: {
    enter: (_node, _parent, context) => {
      // default to last valid slug segment;

      context.getResolutionRoots = async (pathEntries) => {
        const lastValidEntry = pathEntries.reduce(
          (acc: BaseEntry | null, curr: BaseEntry | null) => (curr ? curr : acc),
          null
        );
        return lastValidEntry ? [lastValidEntry] : [];
      };
    },
    exit: (_node, _parent, context) => {
      const currentSegment = context.currentSegmentIndex;
      const { getResolutionRoots } = context;
      context.segmentValidators[currentSegment] = createSegmentValidator(currentSegment, getResolutionRoots);
      // segment ended, increment slug index
      context.currentSegmentIndex++;
    }
  },
  SegmentReference: {
    enter: (node, _parent, context) => {
      const { index } = node as SegmentReference;
      context.getResolutionRoots = createSegmentResolutionRootsResolver(index);
    }
  },
  ReferenceExpression: {
    enter: (node, _parent, context) => {
      const { field, contentType } = node as ReferenceExpression;
      const { getResolutionRoots } = context;

      context.getResolutionRoots = createRefResolutionRootsResolver(field, contentType, getResolutionRoots);
    }
  },
  RefByExpression: {
    enter: (node, _parent, context) => {
      const { refByField, contentType } = node as RefByExpression;
      const { getResolutionRoots } = context;

      context.getResolutionRoots = createRefbyResolutionRootsResolver(refByField, contentType, getResolutionRoots);
    }
  }
};

/**
 * given a PathEntries, and a PathRule, validates that the entries do indeed adhere to the relationships
 * declared in the PathRule
 */
export default class RelationShipValidator {
  private readonly segmentValidators: (SegmentValidator | null)[];

  constructor(pathRule: PathRule) {
    const context = {
      currentSegmentIndex: 0,
      segmentValidators: [],
      getResolutionRoots: async () => []
    };

    traversePathRule(pathRule, relationshipValidationVisitor, context);

    this.segmentValidators = context.segmentValidators;
  }

  async validate(pathEntries: PathEntries, ctx: ApolloContext): Promise<string[]> {
    return (
      await Promise.all(
        pathEntries.map(async (e, i) => {
          const validator = this.segmentValidators[i];
          if (e && !validator) {
            return `entry at segment ${i} but none expected`;
          }
          if (!e && validator) {
            return `no entry at segment ${i} but expected one`;
          }
          if (e && validator) {
            return await validator(e, pathEntries, ctx);
          }
          return null;
        })
      )
    ).filter((v) => !!v) as string[];
  }
}
