import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Hidden from '@material-ui/core/Hidden';
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
  const [menuVisible, setMenuVisible] = React.useState(false);
  const handleClose = () => {
    console.log('HANDLECLOSE');
    setMenuVisible(false);
  };
  return (
    <ErrorBoundary>
      <>
        <Root {...sidekick(sidekickLookup)} variant={variant} elevation={trigger ? 4 : 0} menuVisible={menuVisible}>
          <ContentContainer>
            {logo ? (
              <Link href={logoUrl} sx={{ height: '100%', py: 3 }} {...sidekick(sidekickLookup?.logo)}>
                <Logo {...logo} />
              </Link>
            ) : null}
            {navigationItems?.map((collection) => (
              <React.Fragment key={collection.id}>
                <Box sx={{ flexGrow: 1 }} />
                <ContentModule {...collection} variant={'navigation-bar'} onRequestClose={handleClose} />
              </React.Fragment>
            ))}
            <Hidden implementation="css" smUp>
              <IconButton edge="end" color="inherit" aria-label="menu" onClick={() => setMenuVisible(!menuVisible)}>
                {menuVisible ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Hidden>
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
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'menuVisible',
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})<{ variant?: string; menuVisible: boolean }>`
  ${({ theme, menuVisible }) => `
    &::before {
      display: block;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${theme.palette.background.paper};
    }
    
    @media (max-width: ${theme.breakpoints.values.sm}px) {
      [class$='NavigationBar-root'] {
        position: fixed;
        top: ${theme.components?.Header?.height}px;
        left: 0;
        z-index: -1;
        width: 100%;
        
        max-height: calc(100vh - 62px); // Not sure why using the header height doesnt work 
        overflow-y: auto;

        background: ${theme.palette.background.paper};
        transition: 300ms ease-in-out;
        transform: ${menuVisible ? 'translateY(0)' : 'translateY(-130%)'};
        opacity: ${menuVisible ? 1 : 0};

        > .MuiGrid-container {
          flex-direction: column;
          align-items: flex-start;
          margin: 0;
          width: 100%;
          .MuiGrid-item {
            padding: 0;
            width: 100%;
            justify-content: center;
            display: flex;
            flex-direction: column;
          }
        }
        .MuiLink-root {
          padding: ${theme.spacing(3)};
          display: block;
        }
      }
    }
    `}
`;

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
})<{ variant?: string }>`
  height: 100%;
`;

export default Header;
