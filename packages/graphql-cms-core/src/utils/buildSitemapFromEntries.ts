import { ApolloContext, Sitemap, SitemapPage, SitemapPathEntry } from '@last-rev/types';
import { each, map, maxBy, get } from 'lodash';
import flow from 'lodash/fp/flow';
import filter from 'lodash/fp/filter';
import groupBy from 'lodash/fp/groupBy';
import getLocalizedField from './getLocalizedField';
import { getContentType, getUpdatedAt, loadDocument } from './contentUtils';

const toSnakeCase = (str: string) => {
  return str.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
};

const shouldIndex = (seo: any) => {
  return get(seo, ['robots', 'value'], '').indexOf('noindex') === -1;
};

const createFilterAndGroupFn = (ctx: ApolloContext) =>
  flow(
    filter(({ content, seo }: { content: any; seo: any; entry: SitemapPathEntry }) => !!content && shouldIndex(seo)),
    groupBy((e) => `${e.entry.locale}-${toSnakeCase(getContentType(e.content!, ctx) || '')}`)
  );

const buildSitemapFromEntries = async (
  root: string,
  entries: SitemapPathEntry[],
  preview: boolean,
  ctx: ApolloContext
): Promise<Sitemap> => {
  // ensure root has trailing slash
  if (root.charAt(root.length - 1) !== '/') {
    root = `${root}/`;
  }

  const buildUrl = (e: SitemapPathEntry) =>
    `${root}${e.locale === ctx.defaultLocale ? '' : `${e.locale}/`}${e.path.replace(/^\//, '')}`;

  const fleshedOut = await Promise.all(
    map(entries, async (entry) => {
      const content = await loadDocument(ctx, entry.contentId, preview);
      const seo = content ? getLocalizedField(content, 'seo', ctx) : undefined;
      return {
        entry,
        content,
        seo
      };
    })
  );

  const keyed = createFilterAndGroupFn(ctx)(fleshedOut);

  const pages: SitemapPage[] = [];

  each(keyed, (entries, key) => {
    if (entries.length <= 1000) {
      const filename = `${key}-sitemap.xml`;
      const maxEntry = maxBy(entries, (e) => {
        return new Date(getUpdatedAt(e.content!, ctx) || '').getTime();
      })!;
      pages.push({
        filename,
        loc: `${root}${filename}`,
        lastmod: getUpdatedAt(maxEntry.content!, ctx)!,
        entries: map(entries, (e) => ({
          loc: buildUrl(e.entry),
          lastmod: getUpdatedAt(e.content!, ctx)!
        }))
      });
    } else {
      let pageNum = 1;
      // sitemap pages should have a max of 1000 entries
      const totalPages = Math.ceil(entries.length / 1000);
      while (pageNum <= totalPages) {
        const pageEntries = entries.slice(pageNum - 1, 1000);
        const filename = `${key}-sitemap-${pageNum}.xml`;
        const maxEntry = maxBy(pageEntries, (e) => {
          return new Date(getUpdatedAt(e.content!, ctx) || '').getTime();
        })!;
        pages.push({
          filename,
          loc: `${root}${filename}`,
          lastmod: getUpdatedAt(maxEntry.content!, ctx)!,
          entries: map(pageEntries, (e) => ({
            loc: buildUrl(e.entry),
            lastmod: getUpdatedAt(e.content!, ctx)!
          }))
        });
        pageNum += 1;
      }
    }
  });

  return {
    pages
  };
};

export default buildSitemapFromEntries;
