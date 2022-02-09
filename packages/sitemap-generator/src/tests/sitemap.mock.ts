import { Sitemap, SitemapPage, SitemapEntry } from '@last-rev/types';

const sitemapEntry = (loc: string, day: string): SitemapEntry => ({
  loc,
  lastmod: `2022-02-${day}`
});

const sitemapPage = (loc: string, filename: string): SitemapPage => ({
  loc,
  lastmod: '2022-02-08',
  filename,
  entries: [sitemapEntry(loc, '01'), sitemapEntry(loc, '03'), sitemapEntry(loc, '08')]
});

const sitemapMock = (): Sitemap => ({
  pages: [
    sitemapPage('https://site.com/page1', 'page1'),
    sitemapPage('https://site.com/page2', 'page2'),
    sitemapPage('https://site.com/page3', 'page3')
  ]
});

export default sitemapMock;
