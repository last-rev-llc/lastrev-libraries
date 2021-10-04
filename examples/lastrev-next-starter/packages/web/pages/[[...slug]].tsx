import React from 'react';
import { join } from 'path';
import PageGeneral from '../src/components/PageGeneral';
import PageBlog from '../src/components/PageBlog';
import { client, parseBooleanEnvVar } from '@lrns/utils';

const preview = parseBooleanEnvVar(process.env.CONTENTFUL_USE_PREVIEW);
const site = process.env.SITE;

export type PageGetStaticPathsProps = {
  locales: string[];
};

export const getStaticPaths = async ({ locales }: PageGetStaticPathsProps) => {
  try {
    const { data } = await client.Paths({ locales, preview, site });

    return {
      paths: data?.paths,
      fallback: false
    };
  } catch (error) {
    console.log('GetStaticPathsError', error);
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
    if (!pageData) {
      throw new Error('NoPageFound');
    }
    return {
      props: {
        pageData
      },
      // Re-generate the page at most once per second
      // if a request comes in
      revalidate: 1
    };
  } catch (err) {
    console.log('Error', err);
    throw new Error('NotFound');
  }
};

export default function Page({ pageData }: any) {
  switch (pageData?.page?.__typename) {
    case 'Blog':
      return <PageBlog {...pageData.page} />;
    default:
      return <PageGeneral {...pageData.page} />;
  }
}
