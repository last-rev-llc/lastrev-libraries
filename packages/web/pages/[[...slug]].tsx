import React from 'react';
import { join, sep, posix } from 'path';
import { client, parseBooleanEnvVar } from '@ias/utils';
import { ContentModule } from '@last-rev/component-library';
import AuthGuard from '@ias/components/src/components/AuthGuard';

const preview = parseBooleanEnvVar(process.env.CONTENTFUL_USE_PREVIEW);
const site = process.env.SITE;

export type PageGetStaticPathsProps = {
  locales: string[];
};

export const getStaticPaths = async ({ locales }: PageGetStaticPathsProps) => {
  try {
    const { data } = await client.Paths({ locales, preview, site });

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
    const path = join('/', (params.slug || ['/']).join('/'))
      .split(sep)
      .join(posix.sep);

    const { data: pageData } = await client.Page({ path, locale, preview, site });
    if (!pageData) {
      throw new Error('NoPageFound');
    }
    const isProtected = ((pageData?.page?.__typename === 'Article' && pageData?.page?.requiredRoles) || []).includes(
      process.env.PROTECTED_PAGE_REQUIRED_ROLE || 'loggedIn'
    );

    return {
      props: {
        params: { path, locale, preview, site },
        isProtected,
        pageData: isProtected ? null : pageData
      },
      // Re-generate the page at most once per second
      // if a request comes in
      revalidate: false
    };
  } catch (err) {
    console.log('Error', err);
    return {
      props: {},
      notFound: true
    };
  }
};

export default function Page({ params, isProtected, pageData }: any) {
  try {
    if (isProtected) {
      return <AuthGuard params={params} />;
    }
    return <ContentModule {...pageData.page} />;
  } catch (err) {
    console.log('failed here', err, params);
  }
}
