import { ApolloContext, CmsLoaders, BaseEntry } from '@last-rev/types';
import RelationShipValidator from '../core/RelationshipValidator';
import traversePathRule, { PathVisitor } from '../core/traversePathRule';
import { Field, PathRule, RefByExpression, ReferenceExpression } from '../types';
import { getWinstonLogger } from '@last-rev/logging';

const logger = getWinstonLogger({ package: 'cms-path-rules-engine', module: 'PathToItemsFetcher' });

export type NoMatchFieldValueResult = {
  found: false;
};

export type MatchedFieldValueResult = {
  found: true;
  segmentIndex: number;
  entry: BaseEntry;
};

const isNoMatchFieldValueResult = (x: any): x is NoMatchFieldValueResult => {
  return x.found === false;
};

export type FieldValueResult = NoMatchFieldValueResult | MatchedFieldValueResult;

export type FieldValuePromiseFunction = () => Promise<FieldValueResult>;

export type PathToItemsFetcherContext = {
  rootContentType: string;
  preview: boolean;
  slugs: (string | null)[];
  currentSlugIndex: number;
  promises: Promise<FieldValueResult>[];
  fieldValueLoader: CmsLoaders['entryByFieldValueLoader'];
};

const pathToItemsFetcherVisitor: PathVisitor<PathToItemsFetcherContext> = {
  StaticSegment: {
    exit: (_node, _parent, context) => {
      // segment ended, increment slug index
      context.currentSlugIndex++;
    }
  },
  DynamicSegment: {
    exit: (_node, _parent, context) => {
      // segment ended, increment slug index
      context.currentSlugIndex++;
    }
  },
  Field: {
    enter: (node, parent, context) => {
      let contentType: string | undefined;
      switch (parent!.type) {
        case 'ReferenceExpression':
        case 'RefByExpression':
          contentType = (parent as RefByExpression | ReferenceExpression).contentType;
          break;
        case 'DynamicSegment':
          contentType = context.rootContentType;
          break;
        default:
      }

      if (!contentType) {
        // should not get here, but just in case
        return;
      }

      const field = (node as Field).name;
      const value = context.slugs[context.currentSlugIndex]!;
      const slugIndex = context.currentSlugIndex;
      const preview = context.preview;
      const promise: FieldValuePromiseFunction = async () => {
        const entry = await context.fieldValueLoader.load({ field, value, contentType: contentType!, preview });
        if (!entry) {
          return { found: false };
        }
        return { found: true, segmentIndex: slugIndex, entry };
      };
      context.promises.push(promise());
    }
  }
};

/**
 * Given a PathRule (and assuming a match already), loads the slugs for each segment and validates
 * the relationship between segments.
 */
export default class PathToItemsFetcher {
  private readonly _pathRule: PathRule;
  private readonly _rootContentType: string;
  private readonly _relationshipValidator: RelationShipValidator;

  constructor({ pathRule, rootContentType }: { pathRule: PathRule; rootContentType: string }) {
    this._pathRule = pathRule;
    this._rootContentType = rootContentType;
    this._relationshipValidator = new RelationShipValidator(pathRule);
  }

  async fetch({ slugs, apolloContext }: { slugs: (string | null)[]; apolloContext: ApolloContext }) {
    const context: PathToItemsFetcherContext = {
      rootContentType: this._rootContentType,
      slugs,
      currentSlugIndex: 0,
      promises: [],
      fieldValueLoader: apolloContext.loaders.entryByFieldValueLoader,
      preview: !!apolloContext.preview
    };

    traversePathRule(this._pathRule, pathToItemsFetcherVisitor, context);

    const resolved = await Promise.all(context.promises);

    if (resolved.some(isNoMatchFieldValueResult)) {
      return null;
    }

    const results = (resolved as MatchedFieldValueResult[]).reduce((acc, curr) => {
      acc[curr.segmentIndex] = curr.entry;
      return acc;
    }, new Array(slugs.length).fill(null) as (BaseEntry | null)[]);

    const errors = await this._relationshipValidator.validate(results, apolloContext);

    if (errors.length > 0) {
      errors.map(
        (error) =>
          logger.error(error, {
            caller: 'PathToItemsFetcher.fetch'
          }),
        this
      );
      return null;
    }

    return results;
  }
}
