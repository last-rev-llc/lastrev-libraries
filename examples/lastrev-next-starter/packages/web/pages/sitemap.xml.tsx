import { GetServerSideProps } from 'next';
import { client, parseBooleanEnvVar } from '@lrns/utils';

const preview = parseBooleanEnvVar(process.env.CONTENTFUL_USE_PREVIEW);

const toSnakeCase = (str: string) => str.replace(/([A-Z])/g, (g) => `_${g[0].toLowerCase()}`);

const buildPageUrl = (contentType: string, locale: string, page: number) =>
  `/sitemap/${locale}/${toSnakeCase(contentType)}-${page}-sitemap.xml`;

export const getServerSideProps: GetServerSideProps = async ({ res, locales }) => {
  try {
    //TODO: use optimized page query
    const { data } = await client.SitemapIndex({
      preview
    });

    const sitemap = `
      <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${data?.sitemapIndex?.pages?.map(
        (page: any) =>
          page &&
          `<sitemap>
        <loc>${`${process.env.DOMAIN}${buildPageUrl(page.contentType, page.locale, page.page)}`}</loc>
        <lastmod>${page.lastmod}</lastmod>
      </sitemap>`
      )}
    </sitemapindex>
    `;

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
    res.write(sitemap);
    res.end();

    return { props: {} };
  } catch (err: any) {
    if (err.name == 'FetchError') {
      console.log('[Error][GetStaticProps]', err.name);
    } else {
      console.log(err);
    }
    throw err;
  }
};

export default function Sitemap() {
  return null;
}
