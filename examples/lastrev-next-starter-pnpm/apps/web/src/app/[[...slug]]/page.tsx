import { client } from '@graphql-sdk/client';
import { join } from 'path';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

import { AppProvider } from '@ui/AppProvider/AppProvider';
import { getPageMetadata } from '@ui/utils/getPageMetadata';
import { isPreview } from '@ui/utils/isPreview';
import ContentModule from '@ui/ContentModule/ContentModule';

const site = process.env.SITE;

type Props = {
  params: { slug: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const revalidate = 300;

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const path = join('/', (params.slug || ['/']).join('/'));
  const { data: pageData } = await client.Page({
    path: path === '/index' ? '/' : path,
    locale,
    preview: isPreview(),
    site
  });
  console.log('pageData start');
  console.log(pageData);
  console.log('pageData end');

  if (!pageData?.page?.id) return {};

  const parentSEO = await parent;
  const seo = (pageData?.page as any)?.seo;
  return getPageMetadata({ parentSEO, seo, pageId: pageData.page.id });
}

// export async function generateStaticParams() {
//   const locales = ['en-US', 'es-ES'];
//   const paths = (await client.Paths({ locales, preview, site }))?.data?.paths;
//   return paths?.map((p) => ({ slug: p.params.slug }));
// }

// TODO: Add support for locale
// TODO: Add support for GTM and other analytics

const locale = 'en-US';

export default async function Page({ params }: Props) {
  const path = join('/', (params.slug || ['/']).join('/'));

  const { data: pageData } = await client.Page({
    path: path === '/index' ? '/' : path,
    locale,
    preview: isPreview(),
    site
  });

  if (!pageData?.page) {
    return notFound();
  }
  return (
    <AppProvider>
      <ContentModule {...pageData.page} />
    </AppProvider>
  );
}
