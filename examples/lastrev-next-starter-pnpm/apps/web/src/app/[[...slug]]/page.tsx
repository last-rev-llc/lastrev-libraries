import ContentModule from '@ui/ContentModule/ContentModule';
import { join } from 'path';
import { client } from '@graphql-sdk/client';

// Only render static pages (a.k.a no fallback)
export const dynamicParams = false;
const preview = process.env.CONTENTFUL_USE_PREVIEW === 'true';
const site = process.env.SITE;

export async function generateStaticParams() {
  const locales = ['en-US', 'es-ES'];
  const paths = (await client.Paths({ locales, preview, site }))?.data?.paths;
  return paths?.map((p) => ({ slug: p.params.slug }));
}

// TODO: Add support for locale
// TODO: Add support for SEO
// TODO: Add support for GTM and other analytics
// TODO: Add support for fonts

const locale = 'en-US';

export default async function Page({ params }: { params: { slug: string[] } }) {
  try {
    const path = join('/', (params.slug || ['/']).join('/'));
    const { data: pageData } = await client.Page({ path, locale, preview, site });
    console.log('Page', { path, pageData });
    if (!pageData?.page) {
      throw new Error(`Page not found: ${path}`);
    }
    return <ContentModule {...pageData.page} />;
  } catch (error) {
    console.log('FetchPageError'), error;
    throw error;
  }
}
