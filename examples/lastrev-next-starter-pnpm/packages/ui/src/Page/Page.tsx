import React from 'react';

import { styled } from '@mui/material/styles';

import ContentModule from '../ContentModule';
import sidekick from '@last-rev/contentful-sidekick-util';

import type { PageProps } from './Page.types';

const Page = (props: PageProps) => {
  const { breadcrumbs, header, hero, contents, footer, sidekickLookup, jsonLd, footerDisclaimerOverride } = props;

  const mainRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <>
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}

      {header && !hero ? <ContentModule {...(header as any)} backgroundColor={'transparentLight'} /> : null}

      {hero ? (
        <ContentModule
          {...(hero as any)}
          isHomepage={props.isHomepage}
          header={header}
          breadcrumbs={breadcrumbs}
          scrollRef={mainRef}
        />
      ) : null}

      <Main {...sidekick(sidekickLookup, 'contents')} ref={mainRef}>
        {contents?.map((content: any, index) => (
          <ContentModule
            key={content?.id}
            {...content}
            prevBgColor={contents?.[index - 1]?.backgroundColor}
            component="section"
          />
        ))}
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
