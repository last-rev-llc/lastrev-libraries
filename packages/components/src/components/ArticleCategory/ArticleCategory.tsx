import React, { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import MuiButton from '@mui/material/Button';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule';
import { NavigationItemProps } from '@last-rev/component-library/dist/components/NavigationItem';
import ChevronIcon from '../ChevronIcon';
import DocumentIcon from '../DocumentIcon';

import sidekick from '@last-rev/contentful-sidekick-util';

import { useLocalizationContext } from '../LocalizationContext';

export interface ArticleCategoryProps {
  id?: string;
  title?: string;
  subCategories?: Array<ArticleCategoryProps>;
  categoryHierarchyLinks?: Array<NavigationItemProps>;
  articles?: Array<any>;
  isNested?: Boolean;
  sidekickLookup?: any;
  level: number;
}

const Accordion = styled(MuiAccordion)(({ theme }) => ({
  'marginBottom': theme.spacing(2),
  'backgroundColor': 'transparent',

  '&:not(:last-child)': {
    paddingBottom: theme.spacing(2),
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.midnight.A20
  },

  '& .MuiAccordion-root': {
    borderBottom: 0
  },

  '&:before': {
    display: 'none'
  },

  '& &': {
    paddingLeft: theme.spacing(1)
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
    paddingLeft: theme.spacing(1)
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

const ArticleCategoryTitle = styled(Typography, {
  name: 'ArticleCategory',
  slot: 'ArticleCategoryTitle'
})<TypographyProps<React.ElementType>>(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginBottom: 0
  }
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
  level = -1,
  subCategories,
  articles,
  isNested = false,
  sidekickLookup,
  categoryHierarchyLinks
}: ArticleCategoryProps) => {
  const [expandedSubCategories, setExpandedSubCategories] = useState<{ [key: string]: boolean }>({});
  const localization = useLocalizationContext();

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

  const isExpanded = (subCat: any) => {
    return Boolean(expandedSubCategories[subCat.id]);
  };

  const allSubCategoriesAreExpanded = useMemo(() => {
    if (!subCategories) return false;

    return subCategories.reduce((aggr: boolean, subCategory: any) => {
      return aggr && isExpanded(subCategory);
    }, true);
  }, [expandedSubCategories]);

  return (
    <ErrorBoundary>
      <Root mb={3} key={id}>
        {!isNested && (
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            {level !== 1 && (
              <Box display="flex" ml={-0.75} {...sidekick(sidekickLookup?.title)}>
                <DocumentIcon />
                <ArticleCategoryTitle variant="h3" component="h3" ml={2} data-testid="ArticleCategory-title">
                  {title}
                </ArticleCategoryTitle>
              </Box>
            )}
            {subCategories && (
              <Box ml="auto">
                {allSubCategoriesAreExpanded ? (
                  <Button
                    variant="text"
                    color="secondary"
                    disableRipple
                    onClick={changeAllSubCategoriesExpand(false)}
                    data-testid="ArticleCategory-expand-collapse-button">
                    {localization['articleCategory.collapseAll.label']?.shortTextValue ?? 'Collapse all'}
                  </Button>
                ) : (
                  <Button
                    variant="text"
                    color="secondary"
                    disableRipple
                    onClick={changeAllSubCategoriesExpand(true)}
                    data-testid="ArticleCategory-expand-collapse-button"
                    sx={{ whiteSpace: 'nowrap' }}>
                    {localization['articleCategory.expandAll.label']?.shortTextValue ?? 'Expand all'}
                  </Button>
                )}
              </Box>
            )}
          </Box>
        )}

        {articles?.map((article: any) => (
          <Box
            key={article.id}
            data-testid="ArticleCategory-Article"
            sx={{
              '&:not(:first-child)': {
                marginTop: 3
              }
            }}>
            {article.link && (
              <ContentModule
                {...article.link}
                sx={{
                  '&': (theme: Theme) => theme.typography.body2Bold
                }}
                mb={1}
                text={article.title}
                data-testid={`ArticleCategory-${isNested ? 'SubCategory-' : ''}Article-${article.id}-title`}
              />
            )}
            {article.body && (
              <ContentModule
                sx={{ color: 'midnight.A80', mt: 1 }}
                data-testid={`ArticleCategory-${isNested ? 'SubCategory-' : ''}Article-${article.id}-summary`}
                body={article.body}
                __typename="Text"
              />
            )}
            {article.pubDate && (
              <Typography
                variant="body2"
                component="p"
                sx={{
                  '&': (theme: Theme) => theme.typography.articleDate
                }}
                data-testid={`ArticleCategory-${isNested ? 'SubCategory-' : ''}Article-${article.id}-pubdate`}>
                {dayjs(article.pubDate).format('MMM D, YYYY')}
              </Typography>
            )}
          </Box>
        ))}

        {subCategories?.map((subCategory: any) => (
          <Accordion
            key={`article-category-${subCategory.id}`}
            elevation={0}
            disableGutters
            expanded={isExpanded(subCategory)}
            onChange={toggleExpandSubCategory(subCategory.id)}
            data-testid="ArticleCategory-SubCategory">
            <AccordionSummary
              sx={{
                '& .MuiAccordionSummary-content.Mui-expanded span + svg': {
                  transform: level === 2 ? 'rotate(0deg)' : 'none'
                }
              }}>
              <Box display="flex" alignItems="center" justifyContent="flex-start" sx={{ width: '100%' }}>
                {level === 2 && (
                  <>
                    <span />
                    <ChevronIcon open={isExpanded(subCategory)} sx={{ mr: 2 }} />
                  </>
                )}
                {categoryHierarchyLinks && level === 1 ? (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    sx={{
                      width: '100%',
                      marginBottom: isExpanded(subCategory) ? 1 : 0
                    }}>
                    <Box
                      sx={{
                        '& svg': {
                          width: (theme: Theme) => theme.spacing(5),
                          ml: -1
                        }
                      }}>
                      <DocumentIcon />
                    </Box>
                    <Typography
                      variant="h3"
                      component="h3"
                      sx={{
                        'ml': 2,
                        '@media (min-width: 1024px)': {
                          mb: 0
                        }
                      }}
                      data-testid={`ArticleCategory-SubCategory-${subCategory.id}-title`}>
                      {subCategory.title}
                    </Typography>
                    <ChevronIcon open={Boolean(expandedSubCategories[subCategory.id])} sx={{ ml: 'auto' }} />
                  </Box>
                ) : (
                  <Typography
                    variant="h5"
                    component="h4"
                    sx={{
                      '@media (min-width: 1024px)': {
                        mb: 0
                      }
                    }}
                    data-testid={`ArticleCategory-SubCategory-${subCategory.id}-title`}>
                    {subCategory.title}
                  </Typography>
                )}
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
