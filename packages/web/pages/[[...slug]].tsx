import React from 'react';
import { join, sep, posix } from 'path';
import { client, parseBooleanEnvVar } from '@ias/utils';
import Article from '@ias/components/src/components/Article/Article';
import PageTopic from '@ias/components/src/components/PageTopic/PageTopic';
import PageGeneral from '@ias/components/src/components/PageGeneral';
import { ContentModule } from '@last-rev/component-library';

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
    const path = join('/', (params.slug || ['/']).join('/'))
      .split(sep)
      .join(posix.sep);

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
  try {
    return <ContentModule {...pageData.page} />;
  } catch (err) {
    console.log('failed here', err, pageData);
  }
}