import { Field, PathRule, RefByExpression, ReferenceExpression } from './types';
import traversePathRule, { PathVisitor } from './traversePathRule';
import { Entry } from 'contentful';

type Context = {
  rootEntry: Entry<any>;
  idToEntryMap: Record<string, Entry<any>>;
  defaultLocale: string;
  currentResolutionNodes: Entry<any>[];
  errors: string[];
  slugs: (string | null)[];
  currentSlugIndex: number;
  entriesByContentType: Record<string, Entry<any>[]>;
};

const relationshipValidationVisitor: PathVisitor<Context> = {
  StaticSegment: {
    exit: (_node, _parent, context) => {
      // segment ended, increment slug index
      context.currentSlugIndex++;
    }
  },
  DynamicSegment: {
    enter: (_node, _parent, context) => {
      // all nodes are resolved from the root. reset to this when entering dynamic segement
      context.currentResolutionNodes = [context.rootEntry];
    },
    exit: (_node, _parent, context) => {
      // segment ended, increment slug index
      context.currentSlugIndex++;
    }
  },
  Field: {
    enter: (node, _parent, context) => {
      // resolve field against all possible resolution nodes
      const resolvedNodes = context.currentResolutionNodes.filter((currentResolutionNode) => {
        const currentField = currentResolutionNode.fields[(node as Field).name]?.[context.defaultLocale];
        if (!currentField) {
          return false;
        }
        const currentSlug = context.slugs[context.currentSlugIndex]!;
        if (currentField !== currentSlug) {
          return false;
        }

        return true;
      });

      if (resolvedNodes.length === 0) {
        context.errors.push(`Unable to resolve field ${(node as Field).name} in segment[${context.currentSlugIndex}]`);
      }
    }
  },
  ReferenceExpression: {
    enter: (node, _parent, context) => {
      const newResolvedNodes = context.currentResolutionNodes.flatMap((currentResolutionNode) => {
        let currentField = currentResolutionNode.fields[(node as ReferenceExpression).field]?.[context.defaultLocale];

        if (!currentField) {
          return [];
        }

        if (!Array.isArray(currentField)) {
          currentField = [currentField];
        }

        return currentField
          .map((currentFieldValue: any) => {
            const linkRefId = currentFieldValue.sys?.id;
            if (!linkRefId) {
              return null;
            }
            if (!context.idToEntryMap[linkRefId]) {
              return null;
            }
            if (context.idToEntryMap[linkRefId].sys.contentType.sys.id !== (node as ReferenceExpression).contentType) {
              return null;
            }
            return context.idToEntryMap[linkRefId];
          })
          .filter((currentFieldValue: Entry<any> | null) => currentFieldValue !== null);
      });

      if (!newResolvedNodes.length) {
        context.errors.push(
          `Unable to resolve reference ${(node as ReferenceExpression).field} in segment[${context.currentSlugIndex}]`
        );
      }

      context.currentResolutionNodes = newResolvedNodes;
    }
  },

  RefByExpression: {
    enter: (node, _parent, context) => {
      const newResolvedNodes = context.currentResolutionNodes.flatMap((currentResolutionNode) => {
        const refereredId = currentResolutionNode.sys.id;
        const possibleLinkingEntries = context.entriesByContentType[(node as RefByExpression).contentType] || [];

        if (!possibleLinkingEntries.length) {
          return [];
        }

        const refByField = (node as RefByExpression).refByField;

        return possibleLinkingEntries
          .flatMap((entry) => {
            let refByLinkingField = entry.fields[refByField]?.[context.defaultLocale];

            if (!refByLinkingField) {
              return [];
            }

            if (!Array.isArray(refByLinkingField)) {
              refByLinkingField = [refByLinkingField];
            }

            return refByLinkingField
              .map((linkingField: any) => {
                const refByFieldLikingId = linkingField.sys?.id;
                if (!refByFieldLikingId) {
                  return null;
                }
                return refByFieldLikingId === refereredId ? entry : null;
              })
              .filter((linkingField: any) => linkingField !== null);
          })
          .filter((entry: Entry<any> | null) => entry !== null);
      });

      if (!newResolvedNodes.length) {
        context.errors.push(
          `Unable to resolve refBy ${(node as RefByExpression).refByField} in segment[${context.currentSlugIndex}]`
        );
      }

      context.currentResolutionNodes = newResolvedNodes;
    }
  }
};

export default class RelationShipValidator {
  private readonly _pathRule: PathRule;
  private readonly _rootEntry: Entry<any>;
  private readonly _entries: Entry<any>[];
  private readonly _defaultLocale: string;
  private readonly _slugs: (string | null)[];

  constructor({
    pathRule,
    rootEntry,
    entries,
    defaultLocale,
    slugs
  }: {
    pathRule: PathRule;
    rootEntry: Entry<any>;
    entries: Entry<any>[];
    defaultLocale: string;
    slugs: (string | null)[];
  }) {
    this._pathRule = pathRule;
    this._entries = entries;
    this._rootEntry = rootEntry;
    this._defaultLocale = defaultLocale;
    this._slugs = slugs;
  }

  validate(): string[] {
    const errors: string[] = [];

    traversePathRule(this._pathRule, relationshipValidationVisitor, {
      rootEntry: this._rootEntry,
      idToEntryMap: this._entries.reduce((acc, entry) => {
        acc[entry.sys.id] = entry;
        return acc;
      }, {} as Record<string, Entry<any>>),
      defaultLocale: this._defaultLocale,
      currentResolutionNodes: [this._rootEntry],
      errors,
      slugs: this._slugs,
      currentSlugIndex: 0,
      entriesByContentType: this._entries.reduce((acc, entry) => {
        acc[entry.sys.contentType.sys.id] = acc[entry.sys.contentType.sys.id] || [];
        acc[entry.sys.contentType.sys.id].push(entry);
        return acc;
      }, {} as Record<string, Entry<any>[]>)
    });

    return errors;
  }
}
