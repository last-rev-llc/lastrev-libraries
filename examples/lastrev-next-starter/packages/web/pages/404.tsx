import React from 'react';
import { client, parseBooleanEnvVar } from '@lrns/utils';
import { ContentModuleProvider } from '@last-rev/component-library/dist/components/ContentModule/ContentModuleContext';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule/ContentModule';
import contentMapping from '@lrns/components/src/contentMapping';

const preview = parseBooleanEnvVar(process.env.CONTENTFUL_USE_PREVIEW);
const site = process.env.SITE;
const pagesRevalidate = parseInt(process.env.PAGES_REVALIDATE as string, 10);
const revalidate = !isNaN(pagesRevalidate) ? pagesRevalidate : false;

export type PageStaticPropsProps = {
  locale: string;
};

export const getStaticProps = async ({ locale }: PageStaticPropsProps) => {
  try {
    const { data: pageData } = await client.Page({ path: 'error_404', locale, preview, site });
    if (!pageData) {
      throw new Error('NoPageFound');
    }

    return {
      props: {
        pageData
      },
      revalidate
    };
  } catch (err: any) {
    if (err.name == 'FetchError') {
      console.log('[Error][GetStaticProps]', err.name);
    } else {
      console.log(err);
    }
    throw err;
  }
};

export default function Page404({ pageData }: any) {
  return (
    <ContentModuleProvider contentMapping={contentMapping}>
      <ContentModule {...pageData.page} />
    </ContentModuleProvider>
  );
}
