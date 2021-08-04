import React, { useEffect, useState } from 'react';
import { getSdk } from 'lrns-graphql-sdk';
import { GraphQLClient } from 'graphql-request';
import { useRouter } from 'next/dist/client/router';
import { ContentModule } from '@last-rev/component-library';

const previewGqlClient = new GraphQLClient(
  `${process.env.NODE_ENV === 'development' ? 'http://localhost:8888' : ''}/.netlify/functions/graphql`
);

export default function Preview({}: any) {
  try {
    console.log('preview.tsx');
    const router = useRouter();
    // const { lang } = useTranslation();

    // const settingsGlobal = getSettings(lang);
    const {
      query: { id, locale }
    } = router;

    const [data, setData] = useState<any>(null);

    useEffect(() => {
      const load = async () => {
        try {
          if (!id) return;
          const sdk = getSdk(previewGqlClient);
          const data = await sdk.Preview({ id, locale } as { id: string; locale?: string });
          setData(data ? data?.data?.content : null);
        } catch (e) {
          console.log('error', e);
        }
      };

      load();
    }, [id, locale]);

    if (!id) {
      return <div>No ID provided</div>;
    }

    if (!data) {
      return <div>Loading...</div>;
    }

    return <ContentModule {...data} />;
  } catch (err) {
    return <div>Error: {err.message}</div>;
  }
}
