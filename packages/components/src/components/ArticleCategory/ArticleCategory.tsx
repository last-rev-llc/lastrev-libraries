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

import ChevronIcon from '../ChevronIcon';
import DocumentIcon from '../DocumentIcon';
import { sidekick } from '../../utils/sidekick';

export interface ArticleCategoryProps {
  name: string;
  subcategories?: Array<any>;
  articles?: Array<any>;
}

const Accordion = styled(MuiAccordion)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  backgroundColor: 'transparent',

  '&:before': {
    display: 'none',
  }
}));

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  minHeight: 0,
  padding: 0,

  '&.Mui-expanded': {
    minHeight: 0,
    marginBottom: theme.spacing(2)
  },

  '& .MuiAccordionSummary-content': {
    margin: 0,
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)({
  padding: 0
});

const Button = styled(MuiButton)({
  textTransform: 'none',
  padding: 0,
  color: '#DC2D1F',
  fontSize: '0.9375rem',
});

const OuterWrap = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.3)}`,

  '&:last-child': {
    border: 'none'
  }
}));

const ArticleCategory = ({
  name,
  subcategories,
  articles
}: ArticleCategoryProps) => {
  const [expandedSubcategories, setExpandedSubcategories] = useState<any>({});

  const toggleExpandSubcategory = (subcategoryId: string) => (event: any, expanded: boolean) => {
    setExpandedSubcategories((prev: any) => ({
      ...prev,
      [subcategoryId]: expanded
    }));
  };

  const changeAllSubcategoriesExpand = (expanded: boolean) => () => {
    const newExpandedSubcategories = subcategories.reduce((aggr: any, subcategory: any) => {
      aggr[subcategory.id] = expanded;
      return aggr;
    }, {});

    setExpandedSubcategories(newExpandedSubcategories);
  };

  const allSubcategoriesAreExpanded = useMemo(() => {
    if (!subcategories) return false;

    return subcategories.reduce((aggr: boolean, subcategory: any) => {
      return aggr && Boolean(expandedSubcategories[subcategory.id]);
    }, true);
  }, [expandedSubcategories]);

  return (
    <ErrorBoundary>
      <OuterWrap mb={5} pb={5}>
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Box display="flex" alignItems="center">
            <DocumentIcon />
            <Typography variant="h3" component="h3" ml={1} data-testid="ArticleCategory-name">
              {name}
            </Typography>
          </Box>

          {subcategories && (
            <>
              {allSubcategoriesAreExpanded ? (
                // TODO: Use localization lookup for title (IAS-117)
                <Button variant="text" color="secondary" onClick={changeAllSubcategoriesExpand(false)} data-testid="ArticleCategory-expand-collapse-button">
                  Collapse all
                </Button>
              ) : (
                // TODO: Use localization lookup for title (IAS-117)
                <Button variant="text" color="secondary" onClick={changeAllSubcategoriesExpand(true)} data-testid="ArticleCategory-expand-collapse-button">
                  Expand all
                </Button>
              )}
            </>
          )}
        </Box>

        {articles && articles.map((article: any) => (
          <Box mb={3} key={article.id} data-testid="ArticleCategory-Article">
            {article.title && (
              <Typography variant="h6" component="h6" mb={1} data-testid={`ArticleCategory-Article-${article.id}-title`}>
                {article.title}
              </Typography>
            )}
            {article.summary && (
              <Typography variant="body1" component="p" mb={1} data-testid={`ArticleCategory-Article-${article.id}-summary`}>
                {article.summary}
              </Typography>
            )}
            {article.pubDate && (
              <Typography variant="body2" component="p" data-testid={`ArticleCategory-Article-${article.id}-pubdate`}>
                {dayjs(article.pubDate).format('MMM D, YYYY')}
              </Typography>
            )}
          </Box>
        ))}

        {subcategories && subcategories.map((subcategory: any) => (
          <Accordion
            key={subcategory.id}
            elevation={0}
            disableGutters
            expanded={Boolean(expandedSubcategories[subcategory.id])}
            onChange={toggleExpandSubcategory(subcategory.id)}
            data-testid="ArticleCategory-Subcategory"
          >
            <AccordionSummary>
              <Box display="flex" alignItems="center">
                <ChevronIcon open={Boolean(expandedSubcategories[subcategory.id])} />
                <Typography variant="h5" component="h5" ml={2} data-testid={`ArticleCategory-Subcategory-${subcategory.id}-name`}>
                  {subcategory.name}
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              {subcategory.articles && subcategory.articles.map((article: any) => (
                <Box key={article.id} mb={3}>
                  {article.title && (
                    <Typography variant="h6" component="h6" mb={1} data-testid={`ArticleCategory-Subcategory-${subcategory.id}-Article-${article.id}-title`}>
                      {article.title}
                    </Typography>
                  )}
                  {article.summary && (
                    <Typography variant="body1" component="p" mb={1} data-testid={`ArticleCategory-Subcategory-${subcategory.id}-Article-${article.id}-summary`}>
                      {article.summary}
                    </Typography>
                  )}
                  {article.pubDate && (
                    <Typography variant="body2" component="p" data-testid={`ArticleCategory-Subcategory-${subcategory.id}-Article-${article.id}-pubdate`}>
                      {dayjs(article.pubDate).format('MMM D, YYYY')}
                    </Typography>
                  )}
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </OuterWrap>
    </ErrorBoundary>
  );
};

export default ArticleCategory;
