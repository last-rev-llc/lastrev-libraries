import { Sitemap, SitemapPage, SitemapEntry } from '@last-rev/types';

const sitemapEntry = (loc: string, day: string): SitemapEntry => ({
  loc,
  lastmod: `2022-02-${day}`
});

const sitemapPage = (domain: string, loc: string): SitemapPage => ({
  loc: `${domain}/${loc}.xml`,
  lastmod: '2022-02-08',
  filename: `${loc}.xml`,
  entries: [
    sitemapEntry(`${domain}/${loc}-a`, '01'),
    sitemapEntry(`${domain}/${loc}-b`, '03'),
    sitemapEntry(`${domain}/${loc}-c`, '08')
  ]
});

const sitemapMock = (): Sitemap => ({
  pages: [
    sitemapPage('https://site.com', 'page1'),
    sitemapPage('https://site.com', 'page2'),
    sitemapPage('https://site.com', 'page3')
  ]
});

export default sitemapMock;
