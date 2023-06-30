import React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';

export interface SearchResultItemProps {
  hit?: HitProps;
  components?: any;
}

interface CategoryProps {
  name: string;
  href: string;
}

export interface HitProps {
  locale: string;
  title?: string;
  path: string;
  summary?: string;
  categories?: string[];
  categoryLinks: Array<CategoryProps>;
}

export const SearchResultItem = ({ hit, components }: SearchResultItemProps) => {
  return (
    <Root p={2} data-testid="SearchResultItem">
      <Link href={hit?.path as any} passHref>
        <a style={{ textDecoration: 'none' }}>
          <Box>
            {hit?.title ? (
              <Typography variant="body1" data-testid="SearchResultItem-title">
                <strong>
                  <components.Highlight hit={hit} attribute="title" />
                </strong>
              </Typography>
            ) : (
              <Skeleton animation="wave" height={30} width="40%" />
            )}
            {hit?.summary ? (
              <Typography variant="body1" sx={{ py: [2] }} data-testid="SearchResultItem-summary">
                <components.Highlight hit={hit} attribute="summary" />
              </Typography>
            ) : (
              <Skeleton animation="wave" height={100} width="100%" />
            )}
            {hit?.categoryLinks?.map((category, idx) => {
              if (hit?.locale !== 'en-US' && !category?.href.includes(hit?.locale)) {
                category.href = `/${hit.locale}${category.href}`;
              }
              return (
                <Link href={category.href} passHref>
                  <Chip
                    key={category.href}
                    clickable
                    component="a"
                    sx={{
                      marginRight: 1,
                      marginTop: 1,
                      borderRadius: '3px',
                      backgroundColor: 'coolGrey.light',
                      fontWeight: 'bold',
                      color: 'grey.100'
                    }}
                    // TODO: Not working but will replace this library very soon
                    // label={<components.Highlight hit={hit} attribute={['categories', 'level-1']} />}
                    label={category.name}
                    data-testid={`SearchResultItem-category${idx}`}
                  />
                </Link>
              );
            })}
            <br />
          </Box>
        </a>
      </Link>
    </Root>
  );
};

const Root = styled(Box, {
  name: 'SearchResultItem',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>(({ theme }) => ({
  '& mark': {
    // TODO: currently throwing: "TypeError: Cannot read properties of undefined"
    // https://lastrev.atlassian.net/browse/IAS-249
    // backgroundColor: theme.palette.yellow.light
    backgroundColor: '#FFE173'
  },

  '& .MuiChip-root': {
    'height': 'auto',
    'padding': theme.spacing(0.5, 0),
    // TODO: currently throwing: "TypeError: Cannot read properties of undefined"
    // https://lastrev.atlassian.net/browse/IAS-249
    // backgroundColor: theme.palette.coolGrey.light,
    'backgroundColor': '#D3EBED',
    'color': theme.palette.text.primary,

    '&:hover': {
      backgroundColor: '#C3DCDE'
    }
  }
}));

export default SearchResultItem;
