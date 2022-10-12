import { GraphQLClient, gql } from 'graphql-request';
import LastRevAppConfig from '@last-rev/app-config';

const query = gql`
  query SitemapPageQuery($contentType: String!, $locale: String, $preview: Boolean, $site: String, $page: Int) {
    sitemapPage(contentType: $contentType, locale: $locale, preview: $preview, site: $site, page: $page) {
      entries {
        loc
        lastmod
      }
    }
  }
`;

const sitemapPageGenerator = async ({
  client,
  config,
  contentType,
  locale,
  site,
  page
}: {
  client: GraphQLClient;
  config: LastRevAppConfig;
  contentType: string;
  locale: string;
  page: number;
  site: string;
}) => {
  const data = await client.request(query, {
    contentType,
    locale,
    preview: config.contentful.usePreview,
    site,
    page
  });

  let sitemapXml = `
  <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  </urlset>`;

  if (data?.sitemapPage) {
    sitemapXml = `
  <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${(data.sitemapPage.entries || [])
    .filter((e: any) => !config.sitemap.excludePages.includes(e.loc))
    .map(
      (entry: any) => `
      <url>
    <loc>${config.sitemap.domain}/${entry?.loc}</loc>
    <lastmod>${entry?.lastmod}</lastmod>
  </url>
      `
    )}
  </urlset>
  `;
  }

  return { sitemapXml };
};

export default sitemapPageGenerator;
