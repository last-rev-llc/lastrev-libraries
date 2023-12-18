// import { cache } from 'react';
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
const getPage = client.Page;

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const path = join('/', (params.slug || ['/']).join('/'));
  const { data: pageData } = await getPage({ path, locale, preview: isPreview(), site });
  if (!pageData?.page?.id) return {};

  const parentSEO = await parent;
  const seo = (pageData?.page as any)?.seo;
  return getPageMetadata({ parentSEO, seo, pageId: pageData.page.id });
}

// export async function generateStaticParams() {
//   const locales = ['en-US', 'es-ES'];
//   const paths = (await client.Paths({ locales, preview: isPreview(), site }))?.data?.paths;
//   return paths?.map((p) => ({ slug: p.params.slug }));
// }

// TODO: Add support for locale
// TODO: Add support for GTM and other analytics

const locale = 'en-US';

export default async function Page({ params, searchParams }: Props) {
  const path = join('/', (params.slug || ['/']).join('/'));
  console.time('Load:' + path);
  const { data: pageData, ...rest } = await client.Page({ path, locale, preview: isPreview(), site });
  console.timeEnd('Load:' + path);

  if (!(pageData?.page as any)?.path) {
    return notFound();
  }
  return (
    <AppProvider>
      <ContentModule {...pageData.page} searchParams={searchParams} />
    </AppProvider>
  );
}
