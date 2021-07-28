import React from 'react';
import { getSdk } from 'lrns-graphql-sdk';
import { GraphQLClient } from 'graphql-request';
import { join } from 'path';
import { parseBooleanEnvVar } from 'lrns-utils';

const preview = parseBooleanEnvVar(process.env.CONTENTFUL_USE_PREVIEW);

const sdk = getSdk(new GraphQLClient(process.env.GRAPHQL_SERVER_URL || 'http://localhost:5000/graphql'));

export type PageGetStaticPathsProps = {
  locales: string[];
};

export const getStaticPaths = async ({ locales }: PageGetStaticPathsProps) => {
  const { data } = await sdk.Paths({ locales, preview });

  return {
    paths: data?.paths,
    fallback: false
  };
};

export type PageStaticPropsProps = {
  params: {
    slug?: string[];
  };
  locale: string;
};

export const getStaticProps = async ({ params, locale }: PageStaticPropsProps) => {
  const { data: globalSettingsData } = await sdk.Settings({
    id: process.env.CONTENTFUL_SETTINGS_ID || '',
    locale,
    preview
  });
  const path = join('/', (params.slug || []).join('/'));
  console.log('path', path);
  const { data: pageData } = await sdk.Page({ path, locale, preview });
  console.log('PageData', pageData);
  if (!pageData) {
    throw new Error('NoPageFound');
  }
  return {
    props: {
      pageData,
      globalSettingsData
    },
    // Re-generate the page at most once per second
    // if a request comes in
    revalidate: 1
  };
};

export default function Page({ pageData, globalSettingsData }: any) {
  return (
    <div>
      <pre>{JSON.stringify(pageData, null, 2)}</pre>
      <pre>{JSON.stringify(globalSettingsData, null, 2)}</pre>
    </div>
  );
}
