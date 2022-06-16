import React from 'react';
import Head from 'next/head';
import { getSdk } from '@ias/graphql-sdk';
import { GraphQLClient } from 'graphql-request';
import { useRouter } from 'next/dist/client/router';
import { ContentPreview } from '@last-rev/component-library';
import useSWR from 'swr';
import { ContentModuleProvider } from '@last-rev/component-library/dist/components/ContentModule/ContentModuleContext';
import { LocalizationProvider } from '@ias/components/src/components/LocalizationContext';
import contentMapping from '@ias/components/src/contentMapping';

const previewGqlClient = new GraphQLClient(
  `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000/graphql' : '/.netlify/functions/graphql'}`
);
const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const sdk = getSdk(previewGqlClient);
const fetchPreview = async (id: string, locale: string) => sdk.Preview({ id, locale });
const fetchCommonResources = async (locale: string) => sdk.CommonResources({ locale, preview: true });

export default function Preview({}: any) {
  const { query } = useRouter();
  const {
    environment,
    id,
    locale = 'en-US'
  } = query as {
    environment?: string;
    id: string;
    locale?: string;
  };

  const getPageTitle = (_content: { __typename: any }) => {
    if (content?.__typename === 'Page') {
      return content?.seo?.title?.value;
    }
    if (content?.__typename === 'Article' || content?.__typename === 'CategoryArticle') {
      return content?.title;
    }
    return 'Help Center';
  };

  const { data, error } = useSWR(id ? [id, locale, environment, 'preview', spaceId] : null, fetchPreview);
  const { data: commonResources } = useSWR(id ? [locale, environment, 'preview', spaceId] : null, fetchCommonResources);
  const content = data?.data?.content;
  const isLoadingInitialData = !data && !error;
  const localizationLookup = (commonResources as any)?.data?.contents || [];

  return (
    <>
      {!!content && (
        <Head>
          <title>{getPageTitle(content)}</title>
        </Head>
      )}
      <LocalizationProvider localizationLookup={localizationLookup}>
        <ContentModuleProvider contentMapping={contentMapping}>
          <ContentPreview
            loading={isLoadingInitialData}
            content={content}
            environment={environment as string}
            locale={locale as string}
            spaceId={spaceId as string}
          />
        </ContentModuleProvider>
      </LocalizationProvider>
    </>
  );
}
