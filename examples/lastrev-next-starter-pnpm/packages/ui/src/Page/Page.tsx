import React from 'react';
import dynamic from 'next/dynamic';

import { styled } from '@mui/material/styles';

import ContentModule from '../ContentModule';
const BackToTop = dynamic(() => import('../BackToTop'));
import sidekick from '@last-rev/contentful-sidekick-util';

import type { PageProps } from './Page.types';

const Page = (props: PageProps) => {
  const {
    header,
    hero,
    subNavigation,
    contents,
    footer,
    disableBackToTop,
    sidekickLookup,
    jsonLd,
    footerDisclaimerOverride
  } = props;

  const ownerState = {
    ...props
  };

  return (
    <>
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}

      {header ? <ContentModule {...(header as any)} /> : null}

      {hero ? <ContentModule {...(hero as any)} /> : null}

      <Main {...sidekick(sidekickLookup, 'contents')}>
        {subNavigation ? <ContentModule {...(subNavigation as any)} /> : null}
        {contents?.map((content: any) => (
          <ContentModule key={content?.id} {...content} component="section" />
        ))}
        {!disableBackToTop ? <BackToTop /> : null}
      </Main>

      {footer ? (
        <ContentModule {...(footer as any)} disclaimerText={footerDisclaimerOverride ?? footer.disclaimerText} />
      ) : null}
    </>
  );
};

const Main = styled('main', {
  name: 'Page',
  slot: 'Main',
  overridesResolver: (_, styles) => [styles.root]
})``;

export default Page;
