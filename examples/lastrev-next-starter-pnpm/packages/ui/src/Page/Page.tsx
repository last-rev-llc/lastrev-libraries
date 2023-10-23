import React from 'react';
import dynamic from 'next/dynamic';

import { styled } from '@mui/material/styles';

import ContentModule from '../ContentModule';
const BackToTop = dynamic(() => import('../BackToTop'));
import sidekick from '@last-rev/contentful-sidekick-util';

import type { PageProps } from './Page.types';

const Page = (props: PageProps) => {
  const {
    breadcrumbs,
    header,
    hero,
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

      {header && !hero ? <ContentModule {...(header as any)} backgroundColor={'transparentLight'} /> : null}

      {hero ? <ContentModule {...(hero as any)} header={header} breadcrumbs={breadcrumbs} /> : null}

      <Main {...sidekick(sidekickLookup, 'contents')}>
        {contents?.map((content: any, index) => (
          <ContentModule
            key={content?.id}
            {...content}
            prevBgColor={contents?.[index - 1]?.backgroundColor}
            component="section"
          />
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
