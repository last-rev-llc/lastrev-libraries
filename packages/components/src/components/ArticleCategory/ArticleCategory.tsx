import React, { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import MuiButton from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary/ErrorBoundary';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule/ContentModule';
import { Theme } from '@mui/material/styles';
import ChevronIcon from '../ChevronIcon';
import DocumentIcon from '../DocumentIcon';

import { sidekick } from '../../utils/sidekick';

export interface ArticleCategoryProps {
  id?: string;
  title?: string;
  subCategories?: Array<ArticleCategoryProps>;
  articles?: Array<any>;
  isNested?: Boolean;
  sidekickLookup?: any;
}

const Accordion = styled(MuiAccordion)(({ theme }) => ({
  'marginBottom': theme.spacing(3),
  'backgroundColor': 'transparent',

  '&:before': {
    display: 'none'
  },

  '& &': {
    paddingLeft: theme.spacing(4)
  }
}));

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  'minHeight': 0,
  'padding': 0,

  '&.Mui-expanded': {
    minHeight: 0,
    marginBottom: theme.spacing(2)
  },

  '& .MuiAccordionSummary-content': {
    margin: 0
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)({
  padding: 0
});

const Button = styled(MuiButton)(({ theme }) => ({
  textTransform: 'none',
  padding: 0,
  color: theme.palette.primary.dark,
  fontSize: '0.9375rem'
}));

const Root = styled(Box)(({ theme }) => ({
  'borderBottom': `1px solid ${alpha(theme.palette.text.primary, 0.3)}`,

  '&:last-child': {
    border: 'none'
  }
}));

const ArticleCategory = ({
  id,
  title,
  subCategories,
  articles,
  isNested = false,
  sidekickLookup
}: ArticleCategoryProps) => {
  const [expandedSubCategories, setExpandedSubCategories] = useState<{ [key: string]: boolean }>({});

  const toggleExpandSubCategory =
    (subCategoryId: string) => (_event: React.SyntheticEvent<Element, Event>, expanded: boolean) => {
      setExpandedSubCategories((prev: any) => ({
        ...prev,
        [subCategoryId]: expanded
      }));
    };

  const changeAllSubCategoriesExpand = (expanded: boolean) => () => {
    if (!subCategories) return;

    const newExpandedSubCategories = subCategories.reduce((aggr: any, subCategory: any) => {
      aggr[subCategory.id] = expanded;
      return aggr;
    }, {});

    setExpandedSubCategories(newExpandedSubCategories);
  };

  const allSubCategoriesAreExpanded = useMemo(() => {
    if (!subCategories) return false;

    return subCategories.reduce((aggr: boolean, subCategory: any) => {
      return aggr && Boolean(expandedSubCategories[subCategory.id]);
    }, true);
  }, [expandedSubCategories]);

  return (
    <ErrorBoundary>
      <Root mb={1} key={id}>
        {!isNested && (
          <Box display="flex" justifyContent="space-between" mb={3}>
            <Box display="flex" alignItems="center" {...sidekick(sidekickLookup?.title)}>
              <DocumentIcon />
              <Typography variant="h3" component="h3" ml={1} data-testid="ArticleCategory-title">
                {title}
              </Typography>
            </Box>

            {subCategories && (
              <>
                {allSubCategoriesAreExpanded ? (
                  // TODO: Use localization lookup for title (IAS-117)
                  <Button
                    variant="text"
                    color="secondary"
                    onClick={changeAllSubCategoriesExpand(false)}
                    data-testid="ArticleCategory-expand-collapse-button">
                    Collapse all
                  </Button>
                ) : (
                  // TODO: Use localization lookup for title (IAS-117)
                  <Button
                    variant="text"
                    color="secondary"
                    onClick={changeAllSubCategoriesExpand(true)}
                    data-testid="ArticleCategory-expand-collapse-button"
                    sx={{ whiteSpace: 'nowrap' }}>
                    Expand all
                  </Button>
                )}
              </>
            )}
          </Box>
        )}

        {articles &&
          articles.map((article: any) => (
            <Box mb={3} key={article.id} data-testid="ArticleCategory-Article">
              {article.link && (
                <ContentModule
                  {...article.link}
                  variant="h6"
                  sx={{
                    '&': (theme: Theme) => theme.typography.h6
                  }}
                  mb={1}
                  text={article.title}
                  data-testid={`ArticleCategory-${isNested ? 'SubCategory-' : ''}Article-${article.id}-title`}
                />
              )}
              {article.body && (
                <ContentModule
                  data-testid={`ArticleCategory-${isNested ? 'SubCategory-' : ''}Article-${article.id}-summary`}
                  body={article.body}
                  __typename="Text"
                />
              )}
              {article.pubDate && (
                <Typography
                  variant="body2"
                  component="p"
                  data-testid={`ArticleCategory-${isNested ? 'SubCategory-' : ''}Article-${article.id}-pubdate`}>
                  {dayjs(article.pubDate).format('MMM D, YYYY')}
                </Typography>
              )}
            </Box>
          ))}

        {subCategories &&
          subCategories.map((subCategory: any) => (
            <Accordion
              key={`article-category-${subCategory.id}`}
              elevation={0}
              disableGutters
              expanded={Boolean(expandedSubCategories[subCategory.id])}
              onChange={toggleExpandSubCategory(subCategory.id)}
              data-testid="ArticleCategory-SubCategory">
              <AccordionSummary>
                <Box display="flex" alignItems="center">
                  <ChevronIcon open={Boolean(expandedSubCategories[subCategory.id])} />
                  <Typography
                    variant="h5"
                    component="h5"
                    sx={{ ml: 2 }}
                    data-testid={`ArticleCategory-SubCategory-${subCategory.id}-title`}>
                    {subCategory.title}
                  </Typography>
                </Box>
              </AccordionSummary>

              <AccordionDetails>
                <ArticleCategory isNested {...subCategory} />
              </AccordionDetails>
            </Accordion>
          ))}
      </Root>
    </ErrorBoundary>
  );
};

export default ArticleCategory;
