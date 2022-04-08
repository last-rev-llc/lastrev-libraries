import React from 'react';
import { client, parseBooleanEnvVar } from '@ias/utils';
import { ContentModule } from '@last-rev/component-library';

const preview = parseBooleanEnvVar(process.env.CONTENTFUL_USE_PREVIEW);
const site = process.env.SITE;

export type PageStaticPropsProps = {
  locale: string;
};

export const getStaticProps = async ({ locale }: PageStaticPropsProps) => {
  try {
    const { data: pageData } = await client.Page({ path: 'error', locale, preview, site });
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
