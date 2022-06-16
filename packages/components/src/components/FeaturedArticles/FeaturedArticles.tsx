import React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { styled, alpha } from '@mui/material/styles';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary';
import Card, { CardProps } from '@last-rev/component-library/dist/components/Card';

import { useLocalizationContext } from '../LocalizationContext';

export interface FeaturedArticlesProps {
  articles?: Array<CardProps>;
}

const FeaturedArticles = ({ articles }: FeaturedArticlesProps) => {
  const localization = useLocalizationContext();
  return (
    <ErrorBoundary>
      <Typography variant="h4" component="h4" mb={3} data-testid="FeaturedArticles-title">
        {localization['articles.featuredTitle.label']?.shortTextValue ?? 'Featured Articles'}
      </Typography>

      {articles && (
        <List
          sx={{
            'paddingTop': 0,
            'display': 'block',

            'li:first-of-type': {
              paddingTop: 0
            },

            'li:last-of-type': {
              borderBottom: 'none',
              paddingBottom: 0
            }
          }}>
          {articles.map((card) => (
            <ListItem
              key={card.id}
              data-testid="FeaturedArticles-articleCard"
              sx={{
                padding: (theme) => theme.spacing(3, 0),
                borderBottom: (theme) => `1px solid ${alpha(theme?.palette?.midnight?.A40 ?? 'midnight.A40', 0.3)}`
              }}>
              <ArticleCard elevation={0} {...card} />
            </ListItem>
          ))}
        </List>
      )}
    </ErrorBoundary>
  );
};

const ArticleCard = styled(Card)(({ theme }) => ({
  'background': theme.palette.background.default,

  '& .MuiCardContent-root': {
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    margin: 0,

    [theme.breakpoints.up('md')]: {
      '&:last-child': {
        padding: 0
      }
    }
  },

  '& .MuiTypography-root': {
    ...theme.typography.body2
  },

  '& .MuiTypography-h3': {
    ...theme.typography.body2Bold,
    marginBottom: theme.spacing(1)
  },

  '& .MuiTypography-body1': {
    ...theme.typography.body2,
    marginBottom: 0
  }
}));

export default FeaturedArticles;
