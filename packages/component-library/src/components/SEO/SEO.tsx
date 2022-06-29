import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import getSEO from '../../utils/getSEO';
import { SEOProps } from './SEO.types';

export const SEO = ({ seo = {}, enableAntiFlicker }: SEOProps) => {
  const metatags = getSEO(seo);
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />

        {metatags.map((tag) => (
          <meta key={tag.name || tag.property} {...tag} />
        ))}
      </Head>
      {!enableAntiFlicker && (
        <Script
          dangerouslySetInnerHTML={{
            __html: `
              (function (a, s, y, n, c, h, i, d, e) {
                
                s.className += ' ' + y
                h.start = 1 * new Date()
                h.end = i = function () {
                  s.className = s.className.replace(RegExp(' ?' + y), '')
                }
                ;(a[n] = a[n] || []).hide = h
                setTimeout(function () {
                  i()
                  h.end = null
                }, c)
                h.timeout = c
              })(window, document.documentElement, 'async-hide', 'dataLayer', ${
                process.env.NEXT_PUBLIC_ANTI_FLICKER_TIMEOUT || 500
              },{})
            `
          }}
        />
      )}
    </>
  );
};

export default SEO;
