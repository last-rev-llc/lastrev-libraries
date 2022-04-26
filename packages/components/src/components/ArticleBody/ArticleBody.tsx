import React from 'react';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule';
import { RichText } from '@last-rev/component-library/dist/components/Text';

import { sidekick } from '../../utils/sidekick';

export interface ArticleBodyProps {
  body?: RichText;
  sidekickLookup?: any;
}

export const ArticleBody = ({
  body,
  sidekickLookup
}: ArticleBodyProps) => {
  return (
    <ErrorBoundary>
      {body ? (
        <ContentModule
          __typename="Text"
          variant="article"
          body={body}
          {...sidekick(sidekickLookup?.body)}
          data-testid="ArticleBody"
        />
      ) : null}
    </ErrorBoundary>
  );
};

export default ArticleBody;
