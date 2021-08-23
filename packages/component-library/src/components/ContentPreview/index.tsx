import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ContentModule from '../ContentModule';
import capitalize from 'lodash/capitalize';

const spaceId = process.env.SPACE_ID;
interface ContentPreviewProps {
  loading?: boolean;
  content?: any;
  environment: string;
  locale: string;
}
const ContentPreview = ({ loading, content, environment, locale = 'en-US' }: ContentPreviewProps) => {
  console.log('ContentPreview', { content, environment, locale });
  return (
    <>
      {loading ? <ContentModule {...content} /> : null}
      {content && !loading ? <ContentModule {...content} /> : null}
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
          <Typography variant="subtitle1">
            No content found
            <br />
            <Link
              target="_blank"
              href={`//app.contentful.com/spaces/${spaceId}/environments/${environment}/entries/${content?.id}?locale=${locale}`}>
              {`Edit ${capitalize(content?.__typename)}#${content?.id} in Contentful`}
            </Link>
          </Typography>
        </Container>
      ) : null}

      <div style={{ position: 'fixed', bottom: 16, right: 16 }}>
        <Link
          target="_blank"
          href={`//app.contentful.com/spaces/${spaceId}/environments/${environment}/entries/${content?.id}?locale=${locale}`}>
          {`${capitalize(content?.__typename)}#${content?.id} in Contentful`}
        </Link>
        <br />
      </div>
    </>
  );
};
export default ContentPreview;
