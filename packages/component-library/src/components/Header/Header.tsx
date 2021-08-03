import React from 'react';
import { AppBar, Box, Toolbar, Link } from '@material-ui/core';
import styled from '@material-ui/system/styled';
import ErrorBoundary from '../ErrorBoundary';
// import Link from '../Link';
import Media from '../Media';
// import { LinkProps } from '../Link/Link';
import { MediaProps } from '../Media/Media.types';
// import Text, { RichText } from '../Text';
// import { RichTextProps } from '../RichText';
// import { Breakpoint } from '@material-ui/core';
import { CollectionProps } from '../Collection';
import ContentModule from '../ContentModule';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import sidekick from '../../utils/sidekick';
export interface HeaderProps {
  variant?: 'elevation' | 'outlined' | undefined;
  logo?: MediaProps;
  logoUrl?: string;
  // contentWidth?: false | Breakpoint | undefined;
  navigationItems?: CollectionProps[];
  // theme: any;
  sidekickLookup: any;
}

export const Header = ({ variant, logo, logoUrl, navigationItems, sidekickLookup }: HeaderProps) => {
  // console.log('Header', {
  //   logo,
  //   logoUrl,
  //   navigationItems,
  //   contentWidth,
  //   theme
  // });
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return (
    <ErrorBoundary>
      <>
        <Root {...sidekick(sidekickLookup)} variant={variant} elevation={trigger ? 4 : 0}>
          <ContentContainer>
            {logo ? (
              <Link href={logoUrl} sx={{ height: '100%' }}>
                <Logo {...logo} />
              </Link>
            ) : null}
            {navigationItems?.map((collection) => (
              <>
                <Box sx={{ flexGrow: 1 }} />
                <ContentModule {...collection} variant={'navigation-bar'} />
              </>
            ))}
          </ContentContainer>
        </Root>
        <ContentContainer />
      </>
    </ErrorBoundary>
  );
};

const Root = styled(AppBar, {
  name: 'Header',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})<{ variant?: string }>(() => ({}));

const Logo = styled(Media, {
  name: 'Header',
  slot: 'Logo',
  overridesResolver: (_, styles) => ({
    ...styles.logo,
    height: '100%',
    width: 'auto'
  })
})<{ variant?: string }>(() => ({}));

const ContentContainer = styled(Toolbar, {
  name: 'Header',
  slot: 'ContentContainer',
  overridesResolver: (_, styles) => ({
    ...styles.contentContainer
  })
})<{ variant?: string }>(() => ({}));

export default Header;
