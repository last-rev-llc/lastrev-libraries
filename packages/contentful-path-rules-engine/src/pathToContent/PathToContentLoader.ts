import { ApolloContext, PathEntries, PathFilterFunction, PathRuleConfig } from '@last-rev/types';
import PathMatcher from './PathMatcher';
import PathRuleParser from '../core/PathRuleParser';
import PathToItemsFetcher from './PathToItemsFetcher';
import { PathRule, SlugArray } from '../types';
import logger from 'loglevel';

export type PathLookupObject = {
  rule: string;
  pathRule: PathRule;
  rootContentType: string;
  isCanonical: boolean;
  fetcher: PathToItemsFetcher;
  matcher: PathMatcher;
  filter?: PathFilterFunction;
};

const createPathLookupObjects = (config: PathRuleConfig): PathLookupObject[] => {
  return Object.entries(config).reduce((acc, [rootContentType, { filter, rules }]) => {
    acc.push(
      ...rules.map(({ rule, isCanonical, allowFullPaths }) => {
        const pathRule = new PathRuleParser(rule).PathRule();

        return {
          rule,
          pathRule,
          rootContentType,
          isCanonical: !!isCanonical,
          fetcher: new PathToItemsFetcher({ pathRule, rootContentType }),
          matcher: new PathMatcher({ pathRule, allowFullPaths }),
          filter
        };
      })
    );
    return acc;
  }, [] as PathLookupObject[]);
};

const isNotNull = <T>(x: T | null): x is T => x !== null;

/**
 * Creates a lookup that takes a path, runs it against the path matchers to find matching rules,
 * loads the items for each rule, validates the relationships in those items,
 * and returns a PathEntries or null
 */
export default class PathLoader {
  private readonly _lookups: PathLookupObject[];

  constructor(config: PathRuleConfig) {
    this._lookups = createPathLookupObjects(config);
  }

  get logPrefix() {
    return `[${this.constructor.name}]`;
  }

  async getItemsForPath(path: string, apolloContext: ApolloContext, site?: string): Promise<PathEntries | null> {
    const matched = this._lookups.reduce((acc, lookup) => {
      const slugs = lookup.matcher.match(path);
      if (slugs) {
        acc.push({ slugs, lookup });
      }
      return acc;
    }, [] as { slugs: SlugArray; lookup: PathLookupObject }[]);

    if (!matched.length) {
      logger.debug(`${this.logPrefix} no matchers for path ${path}`);
      return null;
    }

    const results = await Promise.all(
      matched.map(async ({ slugs, lookup }) => {
        const fetcher = lookup.fetcher;
        const matchedRule = lookup.rule;
        const result = await fetcher.fetch({ slugs, apolloContext });
        const filtered =
          result && lookup.filter
            ? (await lookup.filter({ pathEntries: result, ctx: apolloContext, site, matchedRule }))
              ? result
              : null
            : result;
        return filtered;
      })
    );

    const filtered = results.filter(isNotNull).flat();

    if (filtered.length === 0) {
      logger.debug(`${this.logPrefix} no results fetched for path ${path}`);
      return null;
    }

    return filtered;
  }
}
