import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';

export interface SearchResultItemProps {
  hit?: HitProps;
  components?: any;
}

export interface HitProps {
  title?: string;
  permalink?: any;
  content?: string;
  categories?: string[];
  categoriesLinks?: string[];
}

export const SearchResultItem = ({ hit, components }: SearchResultItemProps) => {
  return (
    <Root p={2} data-testid="SearchResultItem">
      <a href={hit?.permalink} style={{ textDecoration: 'none' }}>
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
          {hit?.content ? (
            <Typography variant="body1" sx={{ py: [2] }} data-testid="SearchResultItem-content">
              <components.Highlight hit={hit} attribute="content" />
            </Typography>
          ) : (
            <Skeleton animation="wave" height={100} width="100%" />
          )}
          {hit?.categories ? (
            hit?.categories.map((_category, idx) => {
              return (
                <Chip
                  key={idx}
                  clickable
                  component="a"
                  sx={{
                    marginRight: 1,
                    marginTop: 1,
                    borderRadius: '3px',
                    backgroundColor: 'coolGrey.light.main',
                    fontWeight: 'bold',
                    color: 'grey.100'
                  }}
                  href={hit?.categoriesLinks && hit.categoriesLinks[idx]}
                  label={<components.Highlight hit={hit} attribute={['categories', idx]} />}
                  data-testid={`SearchResultItem-category${idx}`}
                />
              );
            })
          ) : (
            <Skeleton animation="wave" height={30} width="10%" />
          )}
          <br />
        </Box>
      </a>
    </Root>
  );
};

const Root = styled(Box, {
  name: 'SearchResultItem',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>(({ theme }) => ({
  '& mark': {
    // TODO: currently throwing: "TypeError: Cannot read properties of undefined (reading 'light')"
    backgroundColor: theme.palette.yellow.light
  },
  '& .MuiTypography-root': {
    color: theme.palette.grey['100']
  }
}));

export default SearchResultItem;
