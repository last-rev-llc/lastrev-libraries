'use client';
import React from 'react';
import Box from '@mui/material/Link';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { CircularProgress } from '@mui/material';

import ContentModule from '../ContentModule';
import type { ContentPreviewProps } from './ContentPreview.types';
import { useRouter } from 'next/navigation';

const ContentPreview = ({
  id,
  loading,
  content,
  error,
  environment,
  spaceId,
  locale = 'en-US',
  pageURL,
  livePreview = false,
  searchParams
}: ContentPreviewProps) => {
  const router = useRouter();
  const [viewportW, setViewportW] = React.useState(0);
  React.useLayoutEffect(() => {
    setViewportW(window.innerWidth);
    window.addEventListener('resize', () => {
      setViewportW(window.innerWidth);
    });
  });
  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     router.refresh();
  //   }, 5_000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // });
  return (
    <>
      {content ? <ContentModule {...content} searchParams={searchParams} /> : null}

      {!content ? (
        <Container
          maxWidth="lg"
          sx={{
            minHeight: '100vh',
            minWidth: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          {error ? (
            <Typography>
              <br />
              An error happened! Share this error code with your friendly development team:
              <br />
              <strong>
                {error ? error?.response?.errors?.map(({ message }: { message: string }) => message).join('\n') : null}
              </strong>
              <br />
            </Typography>
          ) : null}

          {loading ? <CircularProgress /> : null}

          {!loading ? (
            <Typography variant="subtitle1">
              No content found
              <br />
              <Link
                target="_blank"
                href={`//app.contentful.com/spaces/${spaceId}/environments/${environment}/entries/${id}?locale=${locale}`}>
                Edit{' '}
                <Box component="span" sx={{ textTransform: 'capitalize' }}>
                  {content?.__typename}
                </Box>{' '}
                ID:${id} in Contentful
              </Link>
              <br />
            </Typography>
          ) : null}
        </Container>
      ) : null}

      {!livePreview ? (
        <div style={{ position: 'fixed', bottom: 16, right: 16, background: '#fff', padding: 8, zIndex: 10 }}>
          <Link
            target="_blank"
            href={`//app.contentful.com/spaces/${spaceId}/environments/${environment}/entries/${id}?locale=${locale}`}>
            Edit{' '}
            <Box component="span" sx={{ textTransform: 'capitalize' }}>
              {content?.__typename}
            </Box>
            {''}:{id} in Contentful
          </Link>
          <br />
          {pageURL && (
            <Link target="_blank" href={pageURL}>
              {`Page URL: ${pageURL}`}
            </Link>
          )}
        </div>
      ) : null}
      {livePreview && !viewportW ? (
        <div style={{ position: 'fixed', top: 16, right: 16, background: '#fff', padding: 8, zIndex: 10 }}>
          <Typography variant="overline">{viewportW}px</Typography>
        </div>
      ) : null}
    </>
  );
};

export default ContentPreview;
