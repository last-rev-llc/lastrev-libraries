import React from 'react';
import { join, sep, posix } from 'path';
import { client, parseBooleanEnvVar } from '@ias/utils';
import { ContentModuleProvider } from '@last-rev/component-library/dist/components/ContentModule/ContentModuleContext';
import { LocalizationProvider } from '@ias/components/src/components/LocalizationContext';
import contentMapping from '@ias/components/src/contentMapping';
import dynamic from 'next/dynamic';

const preview = parseBooleanEnvVar(process.env.CONTENTFUL_USE_PREVIEW);
const site = process.env.SITE;
const pagesRevalidate = parseInt(process.env.PAGES_REVALIDATE as string, 10);

const AuthGuard = dynamic(() => import('@ias/components/src/components/AuthGuard'));
const ContentModule = dynamic(() => import('@last-rev/component-library/dist/components/ContentModule'));

export type PageGetStaticPathsProps = {
  locales: string[];
};

export const getStaticPaths = async ({ locales }: PageGetStaticPathsProps) => {
  try {
    return {
      paths: [],
      fallback: 'blocking'
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

    const { data: authPageData } = await client.AuthPage({ path, locale, preview, site });
    if (authPageData?.authPage?.isProtected) {
      return {
        props: {
          // @ts-ignore
          params: { path, locale, preview, site, auth: authPageData?.authPage?.auth ?? 'None' },
          isProtected: authPageData?.authPage?.isProtected,
          pageData: {
            page: {
              seo: (authPageData?.authPage as any)?.seo,
              // @ts-ignore
              auth: authPageData?.authPage?.auth ?? ''
            }
          }
        },
        revalidate: pagesRevalidate
      };
    }
    const { data: pageData } = await client.Page({ path, locale, preview, site });

    if (!pageData) {
      throw new Error('NoPageFound');
    }

    const isProtected =
      ((pageData?.page?.__typename === 'Article' && pageData?.page?.requiredRoles) || []).includes(
        process.env.PROTECTED_PAGE_REQUIRED_ROLE || 'loggedIn'
        // @ts-ignore
      ) || pageData?.page?.auth === 'Okta';

    const protectedPageData = {
      page: {
        seo: (pageData.page as any)?.seo,
        // @ts-ignore
        auth: pageData?.page?.auth ?? ''
      }
    };
    let localizationLookup = [];
    try {
      const { data: commonResources } = await client.CommonResources({ locale, preview });
      localizationLookup = (commonResources as any)?.contents || [];
    } catch (err) {}

    return {
      props: {
        // @ts-ignore
        params: { path, locale, preview, site, auth: pageData?.page?.auth ?? 'None' },
        isProtected,
        pageData: isProtected ? protectedPageData : pageData,
        localizationLookup
      },
      revalidate: pagesRevalidate
    };
  } catch (err) {
    console.log('Error', err);
    return {
      props: {},
      notFound: true
    };
  }
};

export default function Page({ params, isProtected, pageData, localizationLookup }: any) {
  params.title = pageData?.page?.seo?.title?.value || pageData?.page?.title;
  return (
    <LocalizationProvider localizationLookup={localizationLookup}>
      <ContentModuleProvider contentMapping={contentMapping}>
        {isProtected ? <AuthGuard params={params} /> : <ContentModule {...pageData.page} />}
      </ContentModuleProvider>
    </LocalizationProvider>
  );
}
