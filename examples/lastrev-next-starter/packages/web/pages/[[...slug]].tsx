import React from 'react';
import { join } from 'path';
import { client, parseBooleanEnvVar } from '@lrns/utils';
import { ContentModuleProvider } from '@last-rev/component-library/dist/components/ContentModule/ContentModuleContext';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule/ContentModule';
import contentMapping from '@lrns/components/src/contentMapping';

const preview = parseBooleanEnvVar(process.env.CONTENTFUL_USE_PREVIEW);
const site = process.env.SITE;
const pagesRevalidate = parseInt(process.env.PAGES_REVALIDATE as string, 10);
const revalidate = !isNaN(pagesRevalidate) ? pagesRevalidate : false;

export type PageGetStaticPathsProps = {
  locales: string[];
};

export const getStaticPaths = async ({ locales }: PageGetStaticPathsProps) => {
  try {
    return {
      paths: revalidate ? [] : (await client.Paths({ locales, preview, site }))?.data?.paths || [],
      fallback: revalidate ? 'blocking' : false
    };
  } catch (error) {
    return {
      paths: [],
      fallback: false
    };
  }
};

export type PageStaticPropsProps = {
  params: {
    slug?: string[];
  };
  locale: string;
};

export const getStaticProps = async ({ params, locale }: PageStaticPropsProps) => {
  try {
    const path = join('/', (params.slug || ['/']).join('/'));
    const { data: pageData } = await client.Page({ path, locale, preview, site });
    if (!pageData?.page) {
      return {
        notFound: true,
        revalidate
      };
    }
    return {
      props: {
        pageData
      },
      revalidate
    };
  } catch (err: any) {
    if (err.name == 'FetchError') {
      console.log('[Error][GetStaticProps]', err.name);
    } else {
      console.log(err);
    }
    throw err;
  }
};

export default function Page({ pageData }: any) {
  return (
    <ContentModuleProvider contentMapping={contentMapping}>
      <ContentModule {...pageData.page} />
    </ContentModuleProvider>
  );
}
