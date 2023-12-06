import React from 'react';
import Script from 'next/script';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography, { type TypographyProps } from '@mui/material/Typography';

import sidekick from '@last-rev/contentful-sidekick-util';

import ContentModule from '../ContentModule';
import Grid from '../Grid';

import type { PersonProps, PersonOwnerState } from './Person.types';

const Person = (props: PersonProps) => {
  const ownerState = { ...props, backgroundColor: 'lightGray' };
  const {
    education,
    previousExperiences,
    header,
    footer,
    name,
    jobTitle,
    email,
    body,
    breadcrumbs,
    jsonLd,
    sidekickLookup,
    hero
  } = props;

  return (
    <>
      {!!jsonLd && (
        <Script type="application/ld+json" id={`person-${id}-jsonld`}>
          {jsonLd}
        </Script>
      )}

      {hero ? <ContentModule {...(hero as any)} header={header} breadcrumbs={breadcrumbs} /> : null}

      <Root component="main" {...sidekick(sidekickLookup)} ownerState={ownerState}>
        <ContentOuterGrid ownerState={ownerState}>
          <SideContentWrap ownerState={ownerState}>
            <SideContentInnerWrap ownerState={ownerState}>
              <DetailsLabel variant="overline">Contact Details</DetailsLabel>

              {!!name && (
                <Name variant="h5" {...sidekick(sidekickLookup, 'name')} ownerState={ownerState}>
                  {name}
                </Name>
              )}
              {!!jobTitle && (
                <JobTitle variant="h5" {...sidekick(sidekickLookup, 'jobTitle')} ownerState={ownerState}>
                  {jobTitle}
                </JobTitle>
              )}
              {!!email && (
                <Email variant="h5" {...sidekick(sidekickLookup, 'email')} ownerState={ownerState}>
                  {email}
                </Email>
              )}
            </SideContentInnerWrap>
          </SideContentWrap>
          <ContentWrap ownerState={ownerState}>
            <BodyHeader variant="h5" ownerState={ownerState}>
              Biography
            </BodyHeader>
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

            {!!education?.length && (
              <>
                <BodyHeader variant="h5" ownerState={ownerState}>
                  Education
                </BodyHeader>
                <BodyList ownerState={ownerState}>
                  {education?.map((edu?: string) => (
                    <BodyListItem key={`education-${edu}`} ownerState={ownerState}>
                      {edu}
                    </BodyListItem>
                  ))}
                </BodyList>
              </>
            )}

            {!!previousExperiences?.length && (
              <>
                <BodyHeader variant="h5" ownerState={ownerState}>
                  Previous Experiences
                </BodyHeader>
                <BodyList ownerState={ownerState}>
                  {previousExperiences?.map((edu?: string) => (
                    <BodyListItem key={`exp-${edu}`} ownerState={ownerState}>
                      {edu}
                    </BodyListItem>
                  ))}
                </BodyList>
              </>
            )}
          </ContentWrap>
        </ContentOuterGrid>
      </Root>

      {footer ? <ContentModule {...(footer as any)} /> : null}
    </>
  );
};

const Root = styled(Box, {
  name: 'Person',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: PersonOwnerState }>``;

const ContentOuterGrid = styled(Grid, {
  name: 'Person',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{ ownerState: PersonOwnerState }>``;

const DetailsLabel = styled(Typography, {
  name: 'Person',
  slot: 'DetailsLabel',
  overridesResolver: (_, styles) => [styles.detailsLabel]
})<TypographyProps & { ownerState: PersonOwnerState }>``;

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

const SideContentWrap = styled(Box, {
  name: 'Person',
  slot: 'SideContentWrap',
  overridesResolver: (_, styles) => [styles.sideContentWrap]
})<{ ownerState: PersonOwnerState }>``;

const SideContentInnerWrap = styled(Box, {
  name: 'Person',
  slot: 'SideContentInnerWrap',
  overridesResolver: (_, styles) => [styles.sideContentInnerWrap]
})<{ ownerState: PersonOwnerState }>``;

const BodyHeader = styled(Typography, {
  name: 'Person',
  slot: 'BodyHeader',
  overridesResolver: (_, styles) => [styles.bodyHeader]
})<TypographyProps & { ownerState: PersonOwnerState }>``;

const BodyList = styled(List, {
  name: 'Person',
  slot: 'BodyList',
  overridesResolver: (_, styles) => [styles.bodyList]
})<{ ownerState: PersonOwnerState }>``;

const BodyListItem = styled(ListItem, {
  name: 'Person',
  slot: 'BodyListItem',
  overridesResolver: (_, styles) => [styles.bodyListItem]
})<{ ownerState: PersonOwnerState }>``;

export default Person;
