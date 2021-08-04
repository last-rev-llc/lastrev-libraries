import React from 'react';
import { getSdk } from 'lrns-graphql-sdk';
import { GraphQLClient } from 'graphql-request';
import { join } from 'path';
import PageGeneral from '../src/components/PageGeneral';
import { parseBooleanEnvVar } from 'lrns-utils';

const preview = parseBooleanEnvVar(process.env.CONTENTFUL_USE_PREVIEW);
const site = process.env.SITE;

const sdk = getSdk(new GraphQLClient(process.env.GRAPHQL_SERVER_URL || 'http://localhost:5000/graphql'));

export type PageGetStaticPathsProps = {
  locales: string[];
};

export const getStaticPaths = async ({ locales }: PageGetStaticPathsProps) => {
  try {
    const { data } = await sdk.Paths({ locales, preview, site });

    // console.log('paths', JSON.stringify(data?.paths, null, 2));
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
    const { data: pageData } = await sdk.Page({ path, locale, preview, site });
    // const { data: globalSettingsData } = await sdk.Settings({ id: process.env.CONTENTFUL_SETTINGS_ID || '', locale });
    if (!pageData) {
      throw new Error('NoPageFound');
    }
    return {
      props: {
        pageData
        // globalSettingsData
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

export default function Page({ pageData, globalSettingsData }: any) {
  return <PageGeneral {...pageData.page} />;
}
