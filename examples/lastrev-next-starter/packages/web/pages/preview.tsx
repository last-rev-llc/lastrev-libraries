import React, { useEffect, useState } from 'react';
import { getSdk } from '@lrns/graphql-sdk';
import { GraphQLClient } from 'graphql-request';
import { useRouter } from 'next/dist/client/router';
import ContentPreview from '@last-rev/component-library/dist/components/ContentPreview/ContentPreview';
import contentMapping from '@lrns/components/src/contentMapping';
import useSWR from 'swr';
import { ContentModuleProvider } from '@last-rev/component-library/dist/components/ContentModule/ContentModuleContext';

const previewGqlClient = new GraphQLClient(
  `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000/graphql' : '/.netlify/functions/graphql'}`
);
const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const sdk = getSdk(previewGqlClient);
const fetchPreview = async (id: string, locale: string) => sdk.Preview({ id, locale });

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

  const { data, error } = useSWR(id ? [id, locale, environment, 'preview', spaceId] : null, fetchPreview);
  const content = data?.data?.content;
  const isLoadingInitialData = !data && !error;

  return (
    <ContentModuleProvider contentMapping={contentMapping}>
      <ContentPreview
        id={id}
        loading={isLoadingInitialData}
        content={content}
        error={error}
        environment={environment as string}
        locale={locale as string}
        spaceId={spaceId as string}
      />
    </ContentModuleProvider>
  );
}
