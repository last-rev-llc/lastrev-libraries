import React, { useEffect, useState } from 'react';
import { getSdk } from 'lrns-graphql-sdk';
import { GraphQLClient } from 'graphql-request';
import { useRouter } from 'next/dist/client/router';

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
          const sdk = getSdk(previewGqlClient);
          const result = await sdk.Preview({ id, locale } as { id: string; locale?: string });
          setData(result);
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

    return (
      <>
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </>
    );
  } catch (err) {
    return <div>Error: {err.message}</div>;
  }
}
