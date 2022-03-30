import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ContentModule from '../ContentModule';
import capitalize from 'lodash/capitalize';
import { CircularProgress } from '@mui/material';
import { ContentPreviewProps } from './ContentPreview.types';

const ContentPreview = ({
  id,
  loading,
  content,
  error,
  environment,
  spaceId,
  locale = 'en-US'
}: ContentPreviewProps) => {
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
                href={`//app.contentful.com/spaces/${spaceId}/environments/${environment}/entries/${id}?locale=${locale}`}>
                {`Edit ${capitalize(content?.__typename)}#${id} in Contentful`}
              </Link>
              <br />
            </Typography>
          ) : null}
        </Container>
      ) : null}

      <div style={{ position: 'fixed', bottom: 16, right: 16 }}>
        <Link
          target="_blank"
          href={`//app.contentful.com/spaces/${spaceId}/environments/${environment}/entries/${id}?locale=${locale}`}>
          {`${capitalize(content?.__typename)}#${id} in Contentful`}
        </Link>
        <br />
      </div>
    </>
  );
};

export default ContentPreview;
