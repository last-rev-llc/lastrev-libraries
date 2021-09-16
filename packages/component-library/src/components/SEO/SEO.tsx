import React from 'react';
import Head from 'next/head';
import getSEO from '../../utils/getSEO';

interface SEOProps {
  seo?: any;
}

export const SEO = ({ seo = {} }: SEOProps) => {
  const metatags = getSEO(seo);
  return (
    <Head>
      {metatags.map((tag) => (
        <meta key={tag.name || tag.property} {...tag} />
      ))}
    </Head>
  );
};

export default SEO;
