import ContentModule from '@ui/ContentModule/ContentModule';
import { getPageMetadata } from '@ui/utils/getPageMetadata';
import { join } from 'path';
import { client } from '@graphql-sdk/client';
import type { Metadata, ResolvingMetadata } from 'next';

// Only render static pages (a.k.a no fallback)
// export const dynamicParams = true;
const preview = process.env.CONTENTFUL_USE_PREVIEW === 'true';
const site = process.env.SITE;
type Props = {
  params: { slug: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // fetch data
  const path = join('/', (params.slug || ['/']).join('/'));

  const { data: pageData } = await client.Page({ path, locale, preview, site });

  // optionally access and extend (rather than replace) parent metadata
  const previousSEO = await parent;

  const seo = (pageData?.page as any)?.seo;
  console.log(seo);
  return getPageMetadata({ previousSEO, seo });
}

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

export default async function Page({ params }: Props) {
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
