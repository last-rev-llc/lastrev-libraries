import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ContentModule from '../ContentModule';
import capitalize from 'lodash/capitalize';
import { CircularProgress } from '@mui/material';
import { ContentPreviewProps } from './ContentPreview.types';

const ContentPreview = ({
  loading,
  content,
  error,
  environment,
  spaceId,
  locale = 'en-US',
  pageURL
}: ContentPreviewProps) => {
  const handlePrint = (e: React.KeyboardEvent<HTMLSpanElement> | React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    window.print();
  };
  return (
    <>
      {content ? <ContentModule {...content} /> : null}
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
                href={`//app.contentful.com/spaces/${spaceId}/environments/${environment}/entries/${content?.id}?locale=${locale}`}>
                {`Edit ${capitalize(content?.__typename)}#${content?.id} in Contentful`}
              </Link>
              <br />
            </Typography>
          ) : null}
        </Container>
      ) : null}

      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          background: '#fff',
          padding: 2,
          zIndex: 10,
          fontSize: 14,
          textAlign: 'right',
          displayPrint: 'none'
        }}>
        {content?.__typename === 'Article' ? (
          <Link
            target="_blank"
            underline="always"
            href=""
            onClick={(e) => handlePrint(e)}
            onKeyDown={(e) => handlePrint(e)}>
            <u>Download article to PDF</u>
          </Link>
        ) : null}
        <Link
          target="_blank"
          underline="always"
          href={`//app.contentful.com/spaces/${spaceId}/environments/${environment}/entries/${content?.id}?locale=${locale}`}>
          <u>{`Open ${capitalize(content?.__typename)} #${content?.id} in Contentful`}</u>
        </Link>
        {pageURL && (
          <Link target="_blank" href={pageURL}>
            {`Page URL: ${pageURL}`}
          </Link>
        )}
      </Box>
    </>
  );
};

export default ContentPreview;
