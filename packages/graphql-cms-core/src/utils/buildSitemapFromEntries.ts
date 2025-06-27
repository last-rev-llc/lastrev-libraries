import { ApolloContext, Sitemap, SitemapPage, SitemapPathEntry } from '@last-rev/types';
import { each, map, maxBy, get } from 'lodash';
import flow from 'lodash/fp/flow';
import filter from 'lodash/fp/filter';
import groupBy from 'lodash/fp/groupBy';
import getLocalizedField from './getLocalizedField';

const toSnakeCase = (str: string) => {
  return str.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
};

const shouldIndex = (seo: any) => {
  return get(seo, ['robots', 'value'], '').indexOf('noindex') === -1;
};

const filterByShouldIndexAndGroupByLocaleAndContentType = flow(
  filter(({ content, seo }: { content: any; seo: any; entry: SitemapPathEntry }) => !!content && shouldIndex(seo)),
  groupBy((e) => `${e.entry.locale}-${toSnakeCase(e.content!.sys.contentType.sys.id)}`)
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
      const content = await ctx.loaders.entryLoader.load({ id: entry.contentId, preview });
      const seo = content ? getLocalizedField(content.fields, 'seo', ctx) : undefined;
      return {
        entry,
        content,
        seo
      };
    })
  );

  const keyed = filterByShouldIndexAndGroupByLocaleAndContentType(fleshedOut);

  const pages: SitemapPage[] = [];

  each(keyed, (entries, key) => {
    if (entries.length <= 1000) {
      const filename = `${key}-sitemap.xml`;
      pages.push({
        filename,
        loc: `${root}${filename}`,
        lastmod: maxBy(entries, (e) => {
          return new Date(e.content!.sys.updatedAt).getTime();
        })!.content!.sys.updatedAt,
        entries: map(entries, (e) => ({
          loc: buildUrl(e.entry),
          lastmod: e.content!.sys.updatedAt
        }))
      });
    } else {
      let pageNum = 1;
      // sitemap pages should have a max of 1000 entries
      const totalPages = Math.ceil(entries.length / 1000);
      while (pageNum <= totalPages) {
        const pageEntries = entries.slice(pageNum - 1, 1000);
        const filename = `${key}-sitemap-${pageNum}.xml`;
        pages.push({
          filename,
          loc: `${root}${filename}`,
          lastmod: maxBy(pageEntries, (e) => {
            return new Date(e.content!.sys.updatedAt).getTime();
          })!.content!.sys.updatedAt,
          entries: map(pageEntries, (e) => ({
            loc: buildUrl(e.entry),
            lastmod: e.content!.sys.updatedAt
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
