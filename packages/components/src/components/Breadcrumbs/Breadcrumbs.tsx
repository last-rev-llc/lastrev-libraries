import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary/ErrorBoundary';
import Link, { LinkProps } from '@last-rev/component-library/dist/components/Link/Link';

export interface BreadcrumbsProps {
  breadcrumbs?: Array<LinkProps>;
  breadcrumbsRoot?: string;
}

export const Breadcrumbs = ({ breadcrumbs, breadcrumbsRoot }: BreadcrumbsProps) => {
  return (
    <ErrorBoundary>
      {breadcrumbs ? (
        <Box p={2}
          sx={{ display: { sm: 'none', md: 'block' }}}
        >
          <Container maxWidth="xl">
            <Grid container>
              <Grid item xs={12}>
                <Root aria-label="breadcrumb" separator="|" data-testid="Breadcrumbs">
                  <Link href="/"
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    data-testid="Breadcrumbs-breadcrumbsRoot"
                  >
                    <ChevronLeftIcon fontSize="small" />
                    {/* TODO: Use localization lookup for title (IAS-117) */}
                    {breadcrumbsRoot || 'Help Center'}
                  </Link>
                  {breadcrumbs?.map(link => (
                    <Link key={link?.id} href={link?.href} data-testid="Breadcrumbs-link">{link?.text}</Link>
                  ))}
                </Root>
              </Grid>
            </Grid>
          </Container>
        </Box>
      ) : null}
    </ErrorBoundary>
  );
};

const Root = styled(MuiBreadcrumbs, {
  name: 'Breadcrumbs',
  slot: 'root'
})<{}>(({ theme }) => ({
  padding: theme.spacing(2, 0),
  fontSize: 15,
  fontWeight: 500,
  lineHeight: 1.125,

  '& [class*=separator]': {
    margin: theme.spacing(0, 3),
    color: theme.palette.midnight.main,
    fontWeight: 600
  },

  '& a': {
    color: theme.palette.midnight.A70,

    '&:hover': {
      color: theme.palette.text.primary,
      textDecoration: 'none'
    },

    '& svg': {
      fill: theme.palette.background.integralOrange
    }
  },

  '& span': {
    cursor: 'default',
    color: theme.palette.midnight.A70,
    fontSize: 15,
    fontWeight: 500
  }
}));

export default Breadcrumbs;
