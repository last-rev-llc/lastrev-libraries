import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Hidden from '@mui/material/Hidden';
import styled from '@mui/system/styled';

import ErrorBoundary from '../ErrorBoundary';
import Media from '../Media';
import { MediaProps } from '../Media/Media.types';
import { CollectionProps } from '../Collection';
import ContentModule from '../ContentModule';
import useScrollTrigger from '@mui/material/useScrollTrigger';
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
            <Hidden implementation="css" lgUp>
              <IconButton
                edge="end"
                color="secondary"
                aria-label="menu"
                onClick={() => setMenuVisible(!menuVisible)}
                size="large">
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
  overridesResolver: (_, styles) => [styles.root]
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
    @media (max-width: ${theme.breakpoints.values.xl}px) {
      .MuiToolbar-root {
       padding-left: 40px;
       padding-right: 40px;
     }
     .MuiGrid-container {
       flex-wrap: inherit;
     }
     img {
      max-height: 40px;
     }
   }
    
    @media (max-width: ${theme.breakpoints.values.lg}px) {
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
  overridesResolver: (_, styles) => [styles.logo]
})<{ variant?: string }>(() => ({
  height: '100%',
  width: 'auto'
}));

const ContentContainer = styled(Toolbar, {
  name: 'Header',
  slot: 'ContentContainer',
  overridesResolver: (_, styles) => [styles.contentContainer]
})<{ variant?: string }>`
  height: 100%;
`;

export default Header;
