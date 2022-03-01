import React from 'react';
import Box from '@mui/material/Box';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary/ErrorBoundary';
import Link from '@last-rev/component-library/dist/components/Link/Link';
import { NavigationItemProps } from '@last-rev/component-library/dist/components/NavigationItem/NavigationItem';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export interface TopicNavHorizontalProps {
  navItems?: Array<NavigationItemProps>;
}

const TopicNavHorizontal = ({ navItems }: TopicNavHorizontalProps) => {
  if (!navItems) return null;

  return (
    <ErrorBoundary>
      <Box p={2} sx={{ backgroundColor: 'background.neutralGrey' }} data-testid="TopicNav-Horizontal">
        <Container maxWidth={'xl'}>
          <Grid container>
            <Grid item xs={12}>
              <Stack direction="row" spacing={4} py={2} data-testid="TopicNav-Horizontal-List">
                {navItems.map((navItem, idx) => (
                  <Link
                    data-testid={`TopicNav-Horizontal-List-Link-${navItem.id as string}`}
                    key={navItem.id as string}
                    {...navItem}
                    activeClassName="active"
                    sx={{
                      'fontSize': (theme) => theme.typography.smallText.fontSize,
                      'fontWeight': 500,
                      'lineHeight': (theme) => theme.typography.smallText.lineHeight,
                      'paddingBottom': 0.5,
                      '&:hover': {
                        color: 'background.integralOrange',
                        textDecoration: 'none',
                        transition: 'color 0.18s ease'
                      },
                      '@media (max-width: 768px)': {
                        display: idx !== 0 ? 'none' : 'block'
                      },
                      '&.active': {
                        cursor: 'default',
                        borderBottom: '2px solid',
                        borderBottomColor: 'background.integralOrange'
                      }
                    }}>
                    {navItem.text}
                    {idx === 5 && (
                      <ChevronLeftIcon
                        fontSize="small"
                        sx={{
                          fill: 'background.integralOrange',
                          margin: '-2px 0 0 4px',
                          verticalAlign: 'top',
                          transform: 'rotate(-90deg)'
                        }}
                      />
                    )}
                  </Link>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ErrorBoundary>
  );
};

export default TopicNavHorizontal;
