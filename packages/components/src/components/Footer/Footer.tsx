import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary/ErrorBoundary';
import Media, { MediaProps } from '@last-rev/component-library/dist/components/Media/Media';
import Link, { LinkProps } from '@last-rev/component-library/dist/components/Link/Link';
import { RichText } from '@last-rev/component-library/dist/components/Text/Text';
import { NavigationItemProps } from '@last-rev/component-library/dist/components/NavigationItem/NavigationItem';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule/ContentModule';
import { sidekick } from '../../utils/sidekick';

export interface FooterProps {
  media?: MediaProps[];
  logoUrl?: string;
  navigationItems?: NavigationItemProps[];
  disclaimerText?: RichText;
  actions?: LinkProps[];
  sidekickLookup: any;
}

export const Footer = ({ media, logoUrl, navigationItems, disclaimerText, actions, sidekickLookup }: FooterProps) => {
  return (
    <ErrorBoundary>
      <Root {...sidekick(sidekickLookup)} sx={{ paddingTop: 12.5, paddingBottom: 12.5 }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 6, md: 2 }} sx={{ width: '100%' }}>
            <Grid item xs={12} md={2} sx={{ order: '1' }} data-testid="Footer-Logo">
              {media && !!media.length && (
                <Link
                  href={logoUrl || '/'}
                  {...sidekick(sidekickLookup?.media)}
                  sx={{ height: '100%', width: 'auto', padding: 0 }}>
                  <Media {...media[0]} sx={{ maxWidth: '100%' }} />
                </Link>
              )}
            </Grid>
            <Grid item xs={1} sx={{ order: '1', display: { xs: 'none', md: 'block' } }} /> {/* spacer */}
            {navigationItems &&
              navigationItems?.map((navigationItem) => (
                <Grid item xs={12} md={2} sx={{ order: '3' }} data-testid="Footer-Links-Column" key={navigationItem.id}>
                  <List
                    data-testid="Footer-Navigation"
                    sx={{ width: '100%', display: 'flex', flexDirection: 'row', p: 0 }}>
                    <ListItem
                      data-testid="Footer-Navigation-Item"
                      sx={{ display: 'flex', flexDirection: 'column', p: 0 }}>
                      <ContentModule
                        {...navigationItem}
                        __typename="Link"
                        subNavigation={null}
                        sx={{
                          textTransform: 'uppercase',
                          paddingBottom: 2,
                          marginBottom: 1,
                          borderBottom: 'solid 1px',
                          borderBottomColor: 'background.aquaPearl',
                          color: 'common.white',
                          display: 'block',
                          width: '100%',
                          fontWeight: '700',
                          fontSize: '14px',
                          lineHeight: '16px',
                          textDecoration: 'none'
                        }}
                      />

                      {navigationItem.subNavigation && (
                        <List
                          data-testid="Footer-SubNavigation"
                          sx={{ width: '100%', display: 'flex', flexDirection: 'column', p: 0 }}>
                          {navigationItem.subNavigation?.map((subNavigationItem) => (
                            <ListItem key={subNavigationItem.id} data-testid="Footer-SubNavigation-Item" sx={{ p: 0 }}>
                              <ContentModule
                                {...subNavigationItem}
                                __typename="Link"
                                subNavigation={null}
                                sx={{
                                  color: 'common.white',
                                  display: 'block',
                                  width: '100%',
                                  fontSize: '14px',
                                  lineHeight: '16px',
                                  py: 1,
                                  textDecoration: 'none'
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      )}
                    </ListItem>
                  </List>
                </Grid>
              ))}
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              sx={{
                order: { xs: '2', md: '3' } /* move below logo on mobile */,
                marginLeft: 'auto',
                marginRight: { xs: 'auto', md: '0' }
              }}>
              {actions && (
                <List data-testid="Footer-Actions">
                  {actions?.map((action) => (
                    <ListItem data-testid="Footer-Actions-Item" key={action.id}>
                      <ContentModule {...action} />
                    </ListItem>
                  ))}
                </List>
              )}
            </Grid>
          </Grid>

          {disclaimerText && (
            <>
              <Divider sx={{ my: 6, backgroundColor: 'background.aquaPearl' }} />
              <Box>
                <ContentModule
                  __typename="Text"
                  body={disclaimerText}
                  {...sidekick(sidekickLookup?.disclaimerText)}
                  data-testid="Footer-DisclaimerText"
                  sx={{
                    '.MuiTypography-root': {
                      color: 'background.aquaPearl',
                      fontSize: '12px',
                      lineHeight: '18px'
                    }
                  }}
                />
              </Box>
            </>
          )}
        </Container>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Footer',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})(({ theme }) => ({
  backgroundColor: theme.palette.background.dark
}));

export default Footer;
