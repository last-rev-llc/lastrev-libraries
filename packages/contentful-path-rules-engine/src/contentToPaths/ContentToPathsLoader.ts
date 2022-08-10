import { ApolloContext, PathFilterFunction, PathInfo, PathRuleConfig } from '@last-rev/types';
import { PathRule } from '../types';
import PathRuleParser from '../core/PathRuleParser';
import { Entry } from 'contentful';
import ContentToPathsFetcher from './ContentToPathsFetcher';
import { isV2Config } from '../helpers';

type ContentLookupObject = {
  rule: string;
  pathRule: PathRule;
  rootContentType: string;
  isCanonical: boolean;
  fetcher: ContentToPathsFetcher;
  filter?: PathFilterFunction;
};

const createContentLookupObjects = (config: PathRuleConfig): ContentLookupObject[] => {
  return Object.entries(config).reduce((acc, [rootContentType, { filter, rules }]) => {
    acc.push(
      ...rules.map(({ rule, isCanonical }) => {
        const pathRule = new PathRuleParser(rule).PathRule();

        return {
          rule,
          pathRule,
          fetcher: new ContentToPathsFetcher({ pathRule }),
          rootContentType,
          isCanonical: !!isCanonical,
          filter
        };
      })
    );
    return acc;
  }, [] as ContentLookupObject[]);
};

/**
 * Creates a lookup that takes an entry, finds the rules that apply to it, and rusn the ContentToPathsFetcher for each of them.
 */
export default class ContentToPathsLoader {
  private readonly _lookups: ContentLookupObject[];

  constructor(config: PathRuleConfig) {
    this._lookups = isV2Config(config) ? createContentLookupObjects(config) : [];
  }

  async loadPathsFromContent(entry: Entry<any>, ctx: ApolloContext, site?: string): Promise<PathInfo[]> {
    return (
      await Promise.all(
        this._lookups
          .filter((l) => l.rootContentType === entry.sys.contentType.sys.id)
          .map(async (lookup) => {
            const fetcher = lookup.fetcher;
            const matchedRule = lookup.rule;
            const results = await fetcher.fetch({ entry, apolloContext: ctx });
            const filterPromises: Promise<{ pass: boolean; result: PathInfo }>[] = [];
            results.forEach((result) => {
              const promise = async () => ({
                pass: lookup.filter
                  ? await lookup.filter({ pathEntries: result.pathEntries, ctx, site, matchedRule })
                  : true,
                result
              });
              filterPromises.push(promise());
            });

            return (await Promise.all(filterPromises)).filter(({ pass }) => pass).map(({ result }) => result);
          })
      )
    ).flat();
  }
}
