import React from 'react';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import MuiContainer from '@mui/material/Container';

import sidekick from '@last-rev/contentful-sidekick-util';

import ContentModule from '../ContentModule';
import Link from '../Link';

import { FooterProps } from './Footer.types';
import { NavigationItemProps } from '../NavigationItem/NavigationItem.types';
import { MediaProps } from '../Media/Media.types';
import { LinkProps } from '../Link/Link.types';

const Footer = ({
  logo,
  logoUrl,
  disclaimer,
  socialLinks,
  navigationItems,
  introContents,
  copyrightDisclaimer,
  legalLinks,
  sidekickLookup
}: FooterProps) => {
  return (
    <Root {...sidekick(sidekickLookup)} component="footer">
      {!!introContents?.length && (
        <IntroContents>
          {introContents?.map((content, index) => (
            // @ts-ignore: TODO: ContentModule doesn't work with custom components (can we extend props?)
            <IntroContent key={`footer-intro-contents-${index}-${content?.id}`} {...(content as any)} />
          ))}
        </IntroContents>
      )}

      <FooterContent>
        <Container>
          <MainSection>
            {!!logo && !!logoUrl && (
              <LogoUrl noLinkStyle {...(logoUrl as LinkProps)}>
                <Logo {...(logo as MediaProps)} />
              </LogoUrl>
            )}
            {!!disclaimer && (
              <Disclaimer {...sidekick(sidekickLookup, 'disclaimer')} __typename="Text" body={disclaimer} />
            )}
            {!!socialLinks?.length && (
              <SocialLinks>
                {socialLinks.map((link) => (
                  <SocialLink key={link?.id} {...sidekick(sidekickLookup, 'sidekickLookup')} {...(link as LinkProps)} />
                ))}
              </SocialLinks>
            )}
          </MainSection>

          {!!navigationItems?.length && (
            <NavigationItems>
              {navigationItems.map((item) => (
                <NavigationItem key={item?.id} {...(item as NavigationItemProps)} variant={`${item?.variant}Footer`} />
              ))}
            </NavigationItems>
          )}
        </Container>

        <Container>
          <LegalSection>
            {!!copyrightDisclaimer && (
              <CopyrightDisclaimer
                {...sidekick(sidekickLookup, 'copyrightDisclaimer')}
                __typename="Text"
                body={copyrightDisclaimer}
              />
            )}
            {!!legalLinks?.length && (
              <LegalLinks>
                {legalLinks.map((link?: LinkProps) => (
                  <LegalLink key={link?.id} {...sidekick(sidekickLookup, 'sidekickLookup')} {...(link as LinkProps)} />
                ))}
              </LegalLinks>
            )}
          </LegalSection>
        </Container>
      </FooterContent>
    </Root>
  );
};

const Root = styled(Box, {
  name: 'Footer',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})(() => ({}));

const FooterContent = styled(Box, {
  name: 'Footer',
  slot: 'FooterContent',
  overridesResolver: (_, styles) => [styles.footerContent]
})(() => ({}));

const Container = styled(MuiContainer, {
  name: 'Footer',
  slot: 'Container',
  overridesResolver: (_, styles) => [styles.container]
})(() => ({}));

const MainSection = styled(Box, {
  name: 'Footer',
  slot: 'MainSection',
  overridesResolver: (_, styles) => [styles.mainSection]
})(() => ({}));

const Logo = styled(ContentModule, {
  name: 'Footer',
  slot: 'Logo',
  overridesResolver: (_, styles) => [styles.logo]
})(() => ({}));

const LogoUrl = styled(Link, {
  name: 'Footer',
  slot: 'LogoUrl',
  overridesResolver: (_, styles) => [styles.logoUrl]
})(() => ({}));

const Disclaimer = styled(ContentModule, {
  name: 'Footer',
  slot: 'Disclaimer',
  overridesResolver: (_, styles) => [styles.disclaimer]
})(() => ({}));

const SocialLinks = styled(Box, {
  name: 'Footer',
  slot: 'SocialLinks',
  overridesResolver: (_, styles) => [styles.socialLinks]
})(() => ({}));

const SocialLink = styled(ContentModule, {
  name: 'Footer',
  slot: 'SocialLink',
  overridesResolver: (_, styles) => [styles.socialLink]
})(() => ({}));

const NavigationItems = styled(Box, {
  name: 'Footer',
  slot: 'NavigationItems',
  overridesResolver: (_, styles) => [styles.navigationItems]
})(() => ({}));

const NavigationItem = styled(ContentModule, {
  name: 'Footer',
  slot: 'NavigationItem',
  overridesResolver: (_, styles) => [styles.navigationItem]
})(() => ({}));

const IntroContents = styled(Box, {
  name: 'Footer',
  slot: 'IntroContents',
  overridesResolver: (_, styles) => [styles.introContents]
})(() => ({}));

const IntroContent = styled(ContentModule, {
  name: 'Footer',
  slot: 'IntroContent',
  overridesResolver: (_, styles) => [styles.introContent]
})(() => ({}));

const LegalSection = styled(Box, {
  name: 'Footer',
  slot: 'LegalSection',
  overridesResolver: (_, styles) => [styles.legalSection]
})(() => ({}));

const CopyrightDisclaimer = styled(ContentModule, {
  name: 'Footer',
  slot: 'CopyrightDisclaimer',
  overridesResolver: (_, styles) => [styles.copyrightDisclaimer]
})(() => ({}));

const LegalLinks = styled(Box, {
  name: 'Footer',
  slot: 'LegalLinks',
  overridesResolver: (_, styles) => [styles.legalLinks]
})(() => ({}));

const LegalLink = styled(ContentModule, {
  name: 'Footer',
  slot: 'LegalLink',
  overridesResolver: (_, styles) => [styles.legalLink]
})(() => ({}));

export default Footer;
