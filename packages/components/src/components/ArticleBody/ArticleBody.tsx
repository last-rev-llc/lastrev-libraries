import React from 'react';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary/ErrorBoundary';
import { RichText } from '@last-rev/component-library/dist/components/Text/Text';

import Text from '../Text';
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
        <Text
          variant="article"
          {...sidekick(sidekickLookup?.body)}
          body={body}
          data-testid="ArticleBody-Text"
        />
      ) : null}
    </ErrorBoundary>
  );
};

export default ArticleBody;
