import { ApolloContext, PathFilterFunction, PathInfo, PathRuleConfig, BaseEntry } from '@last-rev/types';
import { InternalRootConfig, PathRule } from '../types';
import PathRuleParser from '../core/PathRuleParser';
import ContentToPathsFetcher from './ContentToPathsFetcher';
import { getRootConfig } from '../helpers';

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
  private readonly _rootConfig: InternalRootConfig | undefined;

  constructor(config: PathRuleConfig) {
    this._lookups = createContentLookupObjects(config);
    this._rootConfig = getRootConfig(config);
  }

  async loadPathsFromContent(entry: BaseEntry, ctx: ApolloContext, site?: string): Promise<PathInfo[]> {
    if (this._rootConfig) {
      const { field, value, contentType } = this._rootConfig;
      if (entry.sys.contentType.sys.id === contentType && (entry.fields as any)[field]?.[ctx.defaultLocale] === value) {
        return [
          {
            path: '/',
            pathEntries: [entry]
          }
        ];
      }
    }
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
