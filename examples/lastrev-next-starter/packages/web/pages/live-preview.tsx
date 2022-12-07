import React, { useEffect, useState } from 'react';
import { getSdk } from '@lrns/graphql-sdk';
import { GraphQLClient } from 'graphql-request';
import { useRouter } from 'next/dist/client/router';
import ContentPreview from '@lrns/components/src/components/ContentPreview/ContentPreview';
import contentMapping from '@lrns/components/src/contentMapping';
import useSWR from 'swr';
import { ContentModuleProvider } from '@last-rev/component-library/dist/components/ContentModule/ContentModuleContext';
import { Box } from '@mui/material';

let client;

const fetchPreview = async (id: string, locale: string, overrideContent: any, environment: string) => {
  const previewGqlClient = new GraphQLClient(
    `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000/graphql' : '/api/graphql'}?env=master`
  );
  const sdk = getSdk(previewGqlClient);
  return sdk.Preview({ id, locale, overrideContent });
};
const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;

interface Action {
  type: 'OVERRIDE_VALUES' | 'REFRESH_CONTENT' | 'EDIT_CONTENT';
  payload: any;
}
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
  const [override, setOverride] = React.useState<any>();
  const [content, setContent] = React.useState<any>();
  const { data, error, mutate } = useSWR(
    id ? [id, locale, override, environment, 'preview', spaceId] : null,
    fetchPreview,
    { onSuccess: ({ data }) => setContent(data?.content) }
  );

  const isLoadingInitialData = !data && !error;

  React.useLayoutEffect(() => {
    window.addEventListener(
      'message',
      (event) => {
        const action: Action = event.data;
        if (action.type === 'OVERRIDE_VALUES') {
          setOverride(action.payload);
        }
        if (action.type === 'REFRESH_CONTENT') {
          mutate();
        }
        if (action.type === 'EDIT_CONTENT') {
          window.parent.postMessage(action, '*');
        }
      },
      false
    );
  }, [mutate]);

  return (
    <Box sx={{ '*': { transition: '.2s ease-in-out' } }}>
      <ContentModuleProvider contentMapping={contentMapping}>
        <ContentPreview
          id={id}
          loading={isLoadingInitialData}
          content={content}
          error={error}
          environment={environment as string}
          locale={locale as string}
          spaceId={spaceId as string}
          livePreview
        />
      </ContentModuleProvider>
    </Box>
  );
}
