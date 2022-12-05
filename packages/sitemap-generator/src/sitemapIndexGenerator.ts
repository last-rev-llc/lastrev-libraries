import { GraphQLClient, gql } from 'graphql-request';
import LastRevAppConfig from '@last-rev/app-config';
import { buildPagePath } from './helpers';

const query = gql`
  query SitemapIndexQuery($preview: Boolean!) {
    sitemapIndex(preview: $preview) {
      pages {
        contentType
        locale
        page
        lastmod
      }
    }
  }
`;

const sitemapIndexGenerator = async ({ client, config }: { client: GraphQLClient; config: LastRevAppConfig }) => {
  const data = await client.request(query, {
    preview: config.contentful.usePreview
  });

  const sitemapXml = `
      <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${data?.sitemapIndex?.pages?.map(
        (page: any) =>
          page &&
          `<sitemap>
        <loc>${config.sitemap.domain}${buildPagePath(config, page.contentType, page.locale, page.page)}</loc>
        <lastmod>${page.lastmod}</lastmod>
      </sitemap>`
      )}
    </sitemapindex>
    `;

  return {
    sitemapXml,
    pageData: data?.sitemapIndex?.pages || []
  };
};

export default sitemapIndexGenerator;
