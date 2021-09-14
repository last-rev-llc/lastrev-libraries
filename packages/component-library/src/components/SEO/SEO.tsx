import React from 'react';
import ErrorBoundary from '../ErrorBoundary';
import getSEO from '../../utils/getSEO';

interface SEOProps {
  seo?: any;
}

export const SEO = ({ seo = {} }: SEOProps) => {
  const metatags = getSEO(seo);
  return (
    <ErrorBoundary>
      {metatags.map((tag) => (
        <meta key={tag.name || tag.property} {...tag} />
      ))}
    </ErrorBoundary>
  );
};

export default SEO;
