import React from 'react';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Typography, { type TypographyProps } from '@mui/material/Typography';

import sidekick from '@last-rev/contentful-sidekick-util';

import ContentModule from '../ContentModule';
import Grid from '../Grid';
import Breadcrumbs from '../Breadcrumbs';

import type { PersonProps, PersonOwnerState } from './Person.types';
import type { MediaProps } from '../Media';

const Person = (props: PersonProps) => {
  const ownerState = { ...props };
  const { header, footer, name, jobTitle, email, body, mainImage, breadcrumbs, jsonLd, sidekickLookup, hero } = props;

  return (
    <>
      {!!jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}

      {header ? <ContentModule {...(header as any)} /> : null}

      <Root component="main" {...sidekick(sidekickLookup)} ownerState={ownerState}>
        <ContentOuterGrid ownerState={ownerState}>
          <HeaderWrap ownerState={ownerState}>
            {hero ? (
              <ContentModule {...hero} />
            ) : (
              <>
                {!!name && (
                  <Name {...sidekick(sidekickLookup, 'name')} ownerState={ownerState}>
                    {name}
                  </Name>
                )}

                {!!jobTitle && (
                  <JobTitle {...sidekick(sidekickLookup, 'jobTitle')} ownerState={ownerState}>
                    {jobTitle}
                  </JobTitle>
                )}

                {!!email && (
                  <Email {...sidekick(sidekickLookup, 'email')} ownerState={ownerState}>
                    {email}
                  </Email>
                )}
              </>
            )}
          </HeaderWrap>

          <ContentWrap ownerState={ownerState}>
            {!!breadcrumbs?.length ? (
              <BreadcrumbsWrap ownerState={ownerState}>
                <Breadcrumbs links={breadcrumbs} />
              </BreadcrumbsWrap>
            ) : null}

            {!hero && !!mainImage && (
              <MainImageWrap {...sidekick(sidekickLookup, 'mainImage')} ownerState={ownerState}>
                <MainImage {...(mainImage as MediaProps)} ownerState={ownerState} />
              </MainImageWrap>
            )}

            {!!body && (
              <Body
                body={body}
                sidekickLookup={sidekickLookup}
                {...props}
                variant="inline"
                __typename="RichText"
                ownerState={ownerState}
              />
            )}
          </ContentWrap>
        </ContentOuterGrid>
      </Root>

      {footer ? <ContentModule {...(footer as any)} /> : null}
    </>
  );
};

const Root = styled(Box, {
  name: 'Page',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: PersonOwnerState }>``;

const ContentOuterGrid = styled(Grid, {
  name: 'Person',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{ ownerState: PersonOwnerState }>``;

const HeaderWrap = styled(Box, {
  name: 'Person',
  slot: 'HeaderWrap',
  overridesResolver: (_, styles) => [styles.headerWrap]
})<{ ownerState: PersonOwnerState }>``;

const BreadcrumbsWrap = styled(Box, {
  name: 'Person',
  slot: 'BreadcrumbsWrap',
  overridesResolver: (_, styles) => [styles.breadcrumbsWrap]
})<{ ownerState: PersonOwnerState }>``;

const Name = styled(Typography, {
  name: 'Person',
  slot: 'Name',
  overridesResolver: (_, styles) => [styles.name]
})<TypographyProps & { ownerState: PersonOwnerState }>``;

const JobTitle = styled(Typography, {
  name: 'Person',
  slot: 'JobTitle',
  overridesResolver: (_, styles) => [styles.jobTitle]
})<TypographyProps & { ownerState: PersonOwnerState }>``;

const Email = styled(Typography, {
  name: 'Person',
  slot: 'Email',
  overridesResolver: (_, styles) => [styles.email]
})<TypographyProps & { ownerState: PersonOwnerState }>``;

const ContentWrap = styled(Box, {
  name: 'Person',
  slot: 'ContentWrap',
  overridesResolver: (_, styles) => [styles.contentWrap]
})<{ ownerState: PersonOwnerState }>``;

const Body = styled(ContentModule, {
  name: 'Person',
  slot: 'Body',
  overridesResolver: (_, styles) => [styles.body]
})<{ ownerState: PersonOwnerState }>``;

const MainImageWrap = styled(Box, {
  name: 'Person',
  slot: 'MainImageWrap',
  overridesResolver: (_, styles) => [styles.mainImageWrap]
})<{ ownerState: PersonOwnerState }>``;

const MainImage = styled(ContentModule, {
  name: 'Person',
  slot: 'MainImage',
  overridesResolver: (_, styles) => [styles.mainImage]
})<{ ownerState: PersonOwnerState }>``;

export default Person;
