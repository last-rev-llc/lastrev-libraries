import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { client } from '@ias/utils';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule';
import { useAuthContext } from '../AuthProvider';
import { ArticleLoading } from '../ArticleLoading';

type PageParams = {
  path: string;
  locale: string;
  preview: boolean;
  site?: string;
};

function AuthGuardContent({ params }: { params: PageParams }) {
  const [pageData, setPageData] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadPageData = async () => {
      try {
        const { data } = await client.Page(params);
        setLoaded(true);
        setPageData(data);
      } catch {
        router.push('/404');
      }
    };
    loadPageData();
  }, [params]);

  if (!loaded) {
    return <ArticleLoading />;
  }

  if (pageData) {
    return <ContentModule {...pageData.page} />;
  }

  return null;
}

export function AuthGuard({ params }: { params: PageParams }) {
  const { authenticated, initializing, setRedirect } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!initializing && !authenticated) {
      setRedirect(router.asPath);
      window.location.href = `${process.env.USER_AUTH_DOMAIN}/api/idp/sfCommunity`;
    }
  }, [initializing, router, authenticated, setRedirect]);

  if (authenticated) {
    return <AuthGuardContent params={params} />;
  }

  return <ArticleLoading />;
}
