import { useAuthContext } from '@ias/components/src/components/AuthProvider';
import { useRouter } from 'next/router';
import { ArticleLoading } from '@ias/components/src/components/ArticleLoading';
import { useEffect } from 'react';

export default function AuthCallback({}: any) {
  const { authenticated, getRedirect, clearRedirect, setSuperUser } = useAuthContext();
  const router = useRouter();
  const { isSuperUser } = router.query;
  const url = getRedirect();

  useEffect(() => setSuperUser(isSuperUser === 'true'), [isSuperUser]);

  useEffect(() => {
    if (authenticated) {
      if (url) {
        router.push(url);
        clearRedirect();
      } else {
        router.push('/');
      }
    }
  }, [url, authenticated]);

  return <ArticleLoading />;
}
