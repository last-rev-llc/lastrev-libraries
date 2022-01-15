import React from 'react';
import { join } from 'path';
import { client, parseBooleanEnvVar } from '@lrns/utils';
import PageGeneral from '../src/components/PageGeneral';
import PageBlog from '../src/components/PageBlog';
import { ContentModuleProvider } from '@last-rev/component-library/dist/components/ContentModule/ContentModuleContext';
import contentMapping from '../src/contentMapping';

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
      revalidate: 60
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
  let PageComponent: any;
  try {
    switch (pageData?.page?.__typename) {
      case 'Blog':
        PageComponent = PageBlog;
      default:
        PageComponent = PageGeneral;
    }
  } catch (err) {
    console.log('failed here', err, pageData);
  }
  return (
    <ContentModuleProvider contentMapping={contentMapping}>
      <PageComponent {...pageData.page} />
    </ContentModuleProvider>
  );
}
