import React from 'react';
import dynamic from 'next/dynamic';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule';
const BackToTop = dynamic(() => import('@last-rev/component-library/dist/components/BackToTop/BackToTop'));
import { Page as PageContent } from '@lrns/graphql-sdk/dist';
import { styled } from '@mui/material/styles';
import sidekick from '@last-rev/cms-sidekick-util';

export interface PageProps extends PageContent {}

const Page = ({ header, hero, contents, footer, disableBackToTop, sidekickLookup }: PageProps) => {
  return (
    <>
      {header ? <ContentModule {...(header as any)} /> : null}
      {hero ? <ContentModule {...(hero as any)} /> : null}
      <Main {...sidekick({ ...sidekickLookup, fieldName: 'contents' })}>
        {contents?.map((content: any) => (
          <ContentModule key={content?.id} {...content} component="section" />
        ))}
        {!disableBackToTop ? <BackToTop /> : null}
      </Main>
      {footer ? <ContentModule {...(footer as any)} /> : null}
    </>
  );
};

const Main = styled('main', {
  name: 'Page',
  slot: 'Main',
  overridesResolver: (_, styles) => [styles.root]
})``;

export default Page;
