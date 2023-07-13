import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary';
import Media, { MediaProps } from '@last-rev/component-library/dist/components/Media';
import { LinkProps } from '@last-rev/component-library/dist/components/Link';
import { RichText } from '@last-rev/component-library/dist/components/Text';
import { NavigationItemProps } from '@last-rev/component-library/dist/components/NavigationItem';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule';
import sidekick from '@last-rev/contentful-sidekick-util';
import Link from '../Link';

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
      <Root {...sidekick(sidekickLookup)} sx={{ paddingTop: 12.5, paddingBottom: 12.5 }} component="footer">
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 6, md: 2 }} sx={{ width: '100%' }} displayPrint="none">
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
                <Grid
                  item
                  xs={12}
                  md={2}
                  sx={{ order: '3' }}
                  displayPrint="none"
                  data-testid="Footer-Links-Column"
                  key={navigationItem.id}>
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
                          borderBottomColor: 'background.darkGreen',
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
              md={4}
              sx={{
                display: 'flex',
                order: { xs: '2', md: '3' } /* move below logo on mobile */,
                marginLeft: 'auto',
                marginRight: { xs: 'auto', md: '0' }
              }}>
              {actions && (
                <List data-testid="Footer-Actions" sx={{ ml: { xs: '0', md: 'auto' }, pt: 0 }}>
                  {actions?.map((action) => (
                    <ListItem
                      data-testid="Footer-Actions-Item"
                      key={action.id}
                      sx={{
                        'pt': 0,
                        'pl': 0,
                        'pr': 0,
                        '& .MuiButton-contained': {
                          'whiteSpace': 'nowrap',
                          'border': '1px solid transparent',
                          'backgroundColor': 'common.white',

                          '&:hover': {
                            backgroundColor: 'midnight.main',
                            borderColor: 'common.white',
                            color: 'common.white'
                          }
                        }
                      }}>
                      <ContentModule {...action} />
                    </ListItem>
                  ))}
                </List>
              )}
            </Grid>
          </Grid>

          {disclaimerText && (
            <Box displayPrint="none">
              <Divider sx={{ my: 6, backgroundColor: 'background.aquaPearl' }} />
              <Box>
                <ContentModule
                  __typename="Text"
                  body={disclaimerText}
                  {...sidekick(sidekickLookup?.disclaimerText)}
                  data-testid="Footer-DisclaimerText"
                  sx={{
                    '.MuiTypography-root': {
                      color: 'common.white',
                      fontSize: '12px',
                      lineHeight: '18px'
                    }
                  }}
                />
              </Box>
            </Box>
          )}
        </Container>
        <Box sx={{ display: 'none', displayPrint: 'block' }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              {!!media?.length && (
                <Media
                  {...media[0]}
                  file={{
                    url: 'https://images.ctfassets.net/huigsvblbo3y/6BCOaREwhseaz9hucUuzez/85a55243d1c73ea8b058e52174870d0e/IAS_Product_Resource_Center_Footer_1590x496.png?h=250'
                  }}
                  sx={{ '@media print': { maxWidth: 150 } }}
                />
              )}
            </Grid>
            <Grid item>Integralads.com | @integralads</Grid>
          </Grid>
        </Box>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Footer',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})(({ theme }) => ({
  'backgroundColor': theme.palette.background.dark,

  '@media print': {
    position: 'relative',
    marginTop: '40px',
    width: '100%',
    padding: '8px 0.5cm',
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 14
  }
}));

export default Footer;
