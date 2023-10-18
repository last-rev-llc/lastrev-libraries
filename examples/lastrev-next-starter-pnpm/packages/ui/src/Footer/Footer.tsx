import React from 'react';

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import sidekick from '@last-rev/contentful-sidekick-util';

import ContentModule from '../ContentModule';
import Grid from '../Grid';

import type { FooterProps, FooterOwnerState } from './Footer.types';
import type { NavigationItemProps } from '../NavigationItem';
import type { LinkProps } from '../Link';
import Background from '../Background';

const Footer = (props: FooterProps) => {
  const ownerState = { ...props };

  const {
    backgroundColor,
    logo,
    logoUrl,
    disclaimerText,
    socialLinks,
    navigationItems,
    introContents,
    copyrightDisclaimer,
    legalLinks,
    sidekickLookup
  } = props;

  return (
    <Root {...sidekick(sidekickLookup)} component="footer" ownerState={ownerState}>
      <FooterBackground backgroundColor={backgroundColor} testId="Footer-background" />
      {!!introContents?.length && (
        <IntroContentsWrap ownerState={ownerState}>
          {introContents?.map((content, index) => (
            <IntroContent key={`footer-intro-contents-${index}-${content?.id}`} {...(content as any)} />
          ))}
        </IntroContentsWrap>
      )}

      <ContentOuterGrid ownerState={ownerState}>
        {logo ? (
          <LogoRoot {...logoUrl} aria-label={'Go to homepage'} ownerState={ownerState} text={null}>
            <Logo {...logo} __typename="Media" alt={logo?.title ?? 'Go to homepage'} ownerState={ownerState} />
          </LogoRoot>
        ) : null}

        {!!navigationItems?.length && (
          <FooterMenuNav component="nav" ownerState={ownerState}>
            <FooterMenuNavItems ownerState={ownerState}>
              {navigationItems.map((navItem: any, index: number) => (
                <FooterMenuNavItem key={`${navItem.id}-${index}`} ownerState={ownerState}>
                  <ContentModule
                    {...(navItem as NavigationItemProps)}
                    variant={`${navItem?.variant}Footer`}
                    __typename="NavigationItem"
                  />
                </FooterMenuNavItem>
              ))}
            </FooterMenuNavItems>
          </FooterMenuNav>
        )}

        {!!socialLinks?.length && (
          <SocialLinks ownerState={ownerState}>
            {socialLinks.map((link) => (
              <SocialLink
                key={link?.id}
                {...sidekick(sidekickLookup, 'sidekickLookup')}
                {...(link as LinkProps)}
                ownerState={ownerState}
              />
            ))}
          </SocialLinks>
        )}

        <LegalSection ownerState={ownerState}>
          {!!disclaimerText && (
            <DisclaimerWrap ownerState={ownerState} overrideNested>
              <Disclaimer
                {...sidekick(sidekickLookup, 'disclaimerText')}
                ownerState={ownerState}
                __typename="RichText"
                body={disclaimerText}
              />
            </DisclaimerWrap>
          )}

          {!!copyrightDisclaimer && (
            <CopyrightDisclaimerWrap ownerState={ownerState}>
              <CopyrightDisclaimer
                {...sidekick(sidekickLookup, 'copyrightDisclaimer')}
                __typename="RichText"
                body={copyrightDisclaimer}
                ownerState={ownerState}
              />
            </CopyrightDisclaimerWrap>
          )}

          {!!legalLinks?.length && (
            <LegalLinks ownerState={ownerState}>
              {legalLinks.map((link?: LinkProps) => (
                <LegalLinkWrap key={link?.id} ownerState={ownerState} {...sidekick(sidekickLookup, 'sidekickLookup')}>
                  <LegalLink {...(link as LinkProps)} ownerState={ownerState} />
                </LegalLinkWrap>
              ))}
            </LegalLinks>
          )}
        </LegalSection>
      </ContentOuterGrid>
    </Root>
  );
};

const Root = styled(Box, {
  name: 'Footer',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: FooterOwnerState }>``;

const FooterBackground = styled(Background, {
  name: 'Block',
  slot: 'FooterBackground',
  overridesResolver: (_, styles) => [styles.background]
})<{}>``;

const ContentOuterGrid = styled(Grid, {
  name: 'Footer',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{ ownerState: FooterOwnerState }>``;

const LogoRoot = styled(ContentModule, {
  name: 'Footer',
  slot: 'LogoRoot',
  overridesResolver: (_, styles) => [styles.logoRoot]
})<{ ownerState: FooterOwnerState }>``;

const Logo = styled(ContentModule, {
  name: 'Footer',
  slot: 'Logo',
  overridesResolver: (_, styles) => [styles.logo]
})<{ ownerState: FooterOwnerState }>``;

const DisclaimerWrap = styled(Grid, {
  name: 'Footer',
  slot: 'DisclaimerWrap',
  overridesResolver: (_, styles) => [styles.disclaimerWrap]
})<{ ownerState: FooterOwnerState }>``;

const Disclaimer = styled(ContentModule, {
  name: 'Footer',
  slot: 'Disclaimer',
  overridesResolver: (_, styles) => [styles.disclaimer]
})<{ ownerState: FooterOwnerState }>``;

const SocialLinks = styled(Box, {
  name: 'Footer',
  slot: 'SocialLinks',
  overridesResolver: (_, styles) => [styles.socialLinks]
})<{ ownerState: FooterOwnerState }>``;

const SocialLink = styled(ContentModule, {
  name: 'Footer',
  slot: 'SocialLink',
  overridesResolver: (_, styles) => [styles.socialLink]
})<{ ownerState: FooterOwnerState }>``;

const FooterMenuNav = styled(Box, {
  name: 'Footer',
  slot: 'FooterMenuNav',
  overridesResolver: (_, styles) => [styles.footerMenuNav]
})<{ ownerState: FooterOwnerState }>``;

const FooterMenuNavItems = styled(List, {
  name: 'Footer',
  slot: 'footerMenuNavItems',
  overridesResolver: (_, styles) => [styles.footerMenuNavItems]
})<{ ownerState: FooterOwnerState }>``;

const FooterMenuNavItem = styled(ListItem, {
  name: 'Footer',
  slot: 'FooterMenuNavItem',
  overridesResolver: (_, styles) => [styles.footerMenuNavItem]
})<{ ownerState: FooterOwnerState }>``;

const IntroContentsWrap = styled(Box, {
  name: 'Footer',
  slot: 'IntroContentsWrap',
  overridesResolver: (_, styles) => [styles.introContentsWrap]
})<{ ownerState: FooterOwnerState }>``;

const IntroContent = styled(ContentModule, {
  name: 'Footer',
  slot: 'IntroContent',
  overridesResolver: (_, styles) => [styles.introContent]
})<{ ownerState: FooterOwnerState }>``;

const LegalSection = styled(Box, {
  name: 'Footer',
  slot: 'LegalSection',
  overridesResolver: (_, styles) => [styles.legalSection]
})<{ ownerState: FooterOwnerState }>``;

const CopyrightDisclaimerWrap = styled(Box, {
  name: 'Footer',
  slot: 'CopyrightDisclaimerWrap',
  overridesResolver: (_, styles) => [styles.copyrightDisclaimerWrap]
})<{ ownerState: FooterOwnerState }>``;

const CopyrightDisclaimer = styled(ContentModule, {
  name: 'Footer',
  slot: 'CopyrightDisclaimer',
  overridesResolver: (_, styles) => [styles.copyrightDisclaimer]
})<{ ownerState: FooterOwnerState }>``;

const LegalLinks = styled(List, {
  name: 'Footer',
  slot: 'LegalLinks',
  overridesResolver: (_, styles) => [styles.legalLinks]
})<{ ownerState: FooterOwnerState }>``;

const LegalLinkWrap = styled(ListItem, {
  name: 'Footer',
  slot: 'LegalLinkWrap',
  overridesResolver: (_, styles) => [styles.legalLinkWrap]
})<{ ownerState: FooterOwnerState }>``;

const LegalLink = styled(ContentModule, {
  name: 'Footer',
  slot: 'LegalLink',
  overridesResolver: (_, styles) => [styles.legalLink]
})<{ ownerState: FooterOwnerState }>``;

export default Footer;
