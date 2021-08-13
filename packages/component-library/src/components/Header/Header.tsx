import React from 'react';
import { AppBar, Box, Toolbar, Link } from '@material-ui/core';
import styled from '@material-ui/system/styled';
import ErrorBoundary from '../ErrorBoundary';
import Media from '../Media';
import { MediaProps } from '../Media/Media.types';
import { CollectionProps } from '../Collection';
import ContentModule from '../ContentModule';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import sidekick from '../../utils/sidekick';
export interface HeaderProps {
  variant?: 'elevation' | 'outlined' | undefined;
  logo?: MediaProps;
  logoUrl?: string;
  navigationItems?: CollectionProps[];
  sidekickLookup: any;
}

export const Header = ({ variant, logo, logoUrl, navigationItems, sidekickLookup }: HeaderProps) => {
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
              <Link href={logoUrl} sx={{ height: '100%' }} {...sidekick(sidekickLookup?.logo)}>
                <Logo {...logo} />
              </Link>
            ) : null}
            {navigationItems?.map((collection) => (
              <React.Fragment key={collection.id}>
                <Box sx={{ flexGrow: 1 }} />
                <ContentModule {...collection} variant={'navigation-bar'} />
              </React.Fragment>
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
