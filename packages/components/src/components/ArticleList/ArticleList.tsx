import React from 'react';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary';

import ArticleCategory from '../ArticleCategory';

export interface ArticleListProps {
  categories: any;
}

const ArticleList = ({
  categories
}: ArticleListProps) => {
  return (
    <ErrorBoundary>
      {categories && categories.map((category: any) => (
        <ArticleCategory {...category} />
      ))}
    </ErrorBoundary>
  );
};

export default ArticleList;
