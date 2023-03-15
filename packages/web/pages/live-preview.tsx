import React from 'react';
import { getSdk } from '@ias/graphql-sdk';
import { GraphQLClient } from 'graphql-request';
import { useRouter } from 'next/dist/client/router';
import useSWR from 'swr';
import { ContentModuleProvider } from '@last-rev/component-library/dist/components/ContentModule/ContentModuleContext';
import { Box } from '@mui/material';
import ContentPreview from '@last-rev/component-library/dist/components/ContentPreview';
import contentMapping from '@ias/components/src/contentMapping';

const fetchPreview = async (id: string, locale: string, environment: string) => {
  const previewGqlClient = new GraphQLClient(
    `${
      process.env.NODE_ENV === 'development' ? 'http://localhost:5000/graphql' : '/.netlify/functions/graphql'
    }?env=master`
  );
  const sdk = getSdk(previewGqlClient);
  return sdk.Preview({ id, locale });
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

  const { data, error, mutate } = useSWR(id ? [id, locale, environment, 'preview', spaceId] : null, fetchPreview, {});
  const content = data?.data?.content;
  const isLoadingInitialData = !data && !error;

  const [override, setOverride] = React.useState<any>();
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
          content={{ ...content, ...override }}
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
