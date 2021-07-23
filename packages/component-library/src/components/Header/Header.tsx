import React from 'react';
import { Grid, AppBar, Toolbar, Link } from '@material-ui/core';
import styled from '@material-ui/system/styled';
import ErrorBoundary from '../ErrorBoundary';
// import Link from '../Link';
import Media from '../Media';
// import { LinkProps } from '../Link/Link';
import { MediaProps } from '../Media/Media.types';
// import Text, { RichText } from '../Text';
// import { RichTextProps } from '../RichText';
import { Breakpoint } from '@material-ui/core';
import { CollectionProps } from '../Collection';
import ContentModule from '../ContentModule';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

export interface HeaderProps {
  variant?: 'elevation' | 'outlined' | undefined;
  logo?: MediaProps;
  logoUrl?: string;
  contentWidth?: false | Breakpoint | undefined;
  navigationItems?: CollectionProps[];
  theme: any;
}

export const Header = ({ variant, logo, logoUrl, contentWidth, navigationItems, theme }: HeaderProps) => {
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
        <Root variant={variant} elevation={trigger ? 4 : 0}>
          <ContentContainer>
            {logo ? (
              <Link href={logoUrl}>
                <Logo {...logo} />
              </Link>
            ) : null}
            <Grid container spacing={5} sx={{ justifyContent: 'flex-end' }}>
              {navigationItems?.map((collection) => (
                <Grid item xs>
                  <ContentModule {...collection} />
                </Grid>
              ))}
            </Grid>
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
