import ContentModule from '@ui/ContentModule/ContentModule';
import { join } from 'path';
import { client } from '@graphql-sdk/client';

export async function generateStaticParams() {
  const locales = ['en-US', 'es-ES'];
  const paths = (await client.Paths({ locales, preview, site }))?.data?.paths;
  return paths?.map((p) => ({ slug: p.params.slug }));
}

const preview = process.env.CONTENTFUL_USE_PREVIEW === 'true';
const site = process.env.SITE;
const pagesRevalidate = Number.parseInt(process.env.PAGES_REVALIDATE as string, 10);
// TODO: Add support for locale
const locale = 'en-US';

export default async function Page({ params }: { params: { slug: string[] } }) {
  const path = join('/', (params.slug || ['/']).join('/'));
  const { data: pageData } = await client.Page({ path, locale, preview, site });
  console.log('Page', { path, pageData });
  return <ContentModule {...pageData.page} />;
}
