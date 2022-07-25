import { ApolloContext, PathFilterFunction, PathInfo, PathRuleConfig } from '@last-rev/types';
import { PathRule } from '../types';
import PathRuleParser from '../core/PathRuleParser';
import detectCycle from '../core/detectCycle';
import { Entry } from 'contentful';
import ContentToPathsFetcher from './ContentToPathsFetcher';

const parser = new PathRuleParser();

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
        const pathRule = parser.parse(rule).PathRule();
        const cycle = detectCycle(pathRule);

        if (cycle) {
          throw Error(`Cycle detected in path rule ${rule} between segments ${cycle[0]} and ${cycle[1]}`);
        }

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
    this._lookups = createContentLookupObjects(config);
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
