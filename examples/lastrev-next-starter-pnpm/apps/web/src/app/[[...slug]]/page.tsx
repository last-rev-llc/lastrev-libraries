import ContentModule from '@ui/ContentModule/ContentModule';
import { getPageMetadata } from '@ui/utils/getPageMetadata';
import { join } from 'path';
import { client } from '@graphql-sdk/client';
import type { Metadata, ResolvingMetadata } from 'next';
import { AppProvider } from '@ui/AppProvider/AppProvider';
import { notFound } from 'next/navigation';

const preview = process.env.CONTENTFUL_USE_PREVIEW === 'true';
const site = process.env.SITE;

type Props = {
  params: { slug: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const path = join('/', (params.slug || ['/']).join('/'));
  const { data: pageData } = await client.Page({ path, locale, preview, site });
  const parentSEO = await parent;
  const seo = (pageData?.page as any)?.seo;
  return getPageMetadata({ parentSEO, seo });
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
  const path = join('/', (params.slug || ['/']).join('/'));
  const { data: pageData } = await client.Page({ path, locale, preview, site });
  console.log('Page', { path, pageData });
  if (!pageData?.page) {
    return notFound();
  }
  return (
    <AppProvider>
      <ContentModule {...pageData.page} />
    </AppProvider>
  );
}
