import { GetServerSideProps } from 'next';
import { client, parseBooleanEnvVar } from '@lrns/utils';
import config from '../../../../config';

const preview = parseBooleanEnvVar(process.env.CONTENTFUL_USE_PREVIEW);

const pageMatcher = /^([^\-]+)-(\d+)-sitemap.xml$/;

export const getServerSideProps: GetServerSideProps = async ({ res, params, locales }) => {
  try {
    const { slug } = params as { slug: string[] };

    const locale = slug[0];

    const captures = pageMatcher.exec(slug[1]);

    if (!captures) {
      return { props: {} };
    }

    let sitemap = `
    <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    </urlset>`;

    const [, contentType, page] = captures;

    const { data } = await client.SitemapPage({
      contentType,
      locale,
      page: parseInt(page, 10),
      preview,
      site: process.env.SITE
    });

    if (data?.sitemapPage) {
      sitemap = `
    <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${(data.sitemapPage.entries || [])
      .filter((e: any) => e.loc !== 'error_404')
      .map(
        (entry: any) => `
        <url>
      <loc>${config.sitemap.domain}/${entry?.loc}</loc>
      <lastmod>${entry?.lastmod}</lastmod>
    </url>
        `
      )
      .join('')}
    </urlset>
    `;
    }

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
    res.write(sitemap);
    res.end();
    return { props: { data } };
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
