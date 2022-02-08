import React, { useState } from 'react';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary/ErrorBoundary';
import Link from '@last-rev/component-library/dist/components/Link/Link';

import { ScrollSpy } from '../../utils/scrollSpy';
import ChevronIcon from '../ChevronIcon';

export interface TopicNavProps {
  categories?: Array<any>;
}

const Root = styled(Box, {
  name: 'ArticleNav',
  slot: 'Root',
})<{}>(({ theme }) => ({
  position: 'sticky',
  top: 25,
  padding: theme.spacing(3, 0),
}));

const NavLink = styled(Typography, {
  name: 'ArticleNav',
  slot: 'NavLink',
})<TypographyProps<React.ElementType>>(({ theme }) => ({
  fontSize: 15,
  lineHeight: '18px',
  
  '& .top-category': {
    borderLeft: '2px solid transparent',
    paddingLeft: theme.spacing(1),

    '&.active': {
      // TODO: Move all hex colors to theme (IAS-85)
      borderLeftColor: '#FF574A',
      color: theme.palette.text.primary,
      fontWeight: 600
    }
  },

  '& .active-subcategory': {
    color: theme.palette.text.primary,
    fontWeight: 600
  },

  '& .MuiLink-root': {
    textDecoration: 'none'
  },

  '& a': {
    // TODO: Move all hex colors to theme (IAS-85)
    color: '#4D7080',
    fontWeight: 500,

    '&:hover': {
      color: theme.palette.text.primary,
      textDecoration: 'none'
    }
  },
}));

const AccordionTitle = styled(Box)(({ theme }) => ({
  fontSize: 15,
  lineHeight: '18px',

  '& > svg': {
    marginLeft: theme.spacing(2)
  }
}));

const Accordion = styled(MuiAccordion)({
  backgroundColor: 'transparent',

  '&:before': {
    display: 'none',
  }
});

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  minHeight: 0,
  padding: 0,
  fontSize: 15,
  lineHeight: '18px',
  // TODO: Move all hex colors to theme (IAS-85)
  color: '#4D7080',
  fontWeight: 500,

  '&.Mui-expanded': {
    minHeight: 0,
    marginBottom: theme.spacing(2)
  },

  '& .MuiAccordionSummary-content': {
    margin: 0,
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)({
  padding: 0,

  '& > a:last-child': {
    marginBottom: 0
  }
});

const TopicNav = ({ categories }: TopicNavProps) => {
  const [active, setActive] = useState('');
  const [activeSubcategory, setActiveSubcategory] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string>('');

  const onScrollUpdate = (entry: { target: any; boundingClientRect: any; }, isInViewPort: any) => {
    const { target, boundingClientRect } = entry;

    const correspondingNavItem = document.querySelector(`[data-scrollspy-id="${target.id}"]`);
    const parentCategoryId = target.attributes['parent-category-id']?.value; // Subcategories will have this custom attr to point to the parent category

    if (!correspondingNavItem && !parentCategoryId) return;

    if (boundingClientRect.y <= 0 && isInViewPort) {
      if (parentCategoryId) {
        setActiveSubcategory(target.id);
        setActive(parentCategoryId);
      } else {
        setActive(target.id);
      }
    }
  };

  const expandCategory = (categoryId: string) => () => {
    setExpandedCategory(categoryId);
  };

  const clearExpandedCategory = () => {
    setExpandedCategory('');
    setActiveSubcategory('');
  };

  const activateTopCategory = (categoryId: string) => () => {
    setTimeout(() => {
      setActive(categoryId);
    }, 500);
  };

  const activateSubcategory = (subcategoryId: string) => () => {
    setActiveSubcategory(subcategoryId);
  };

  return (
    <ErrorBoundary>
      {categories && (
        <>
          <ScrollSpy handleScroll={onScrollUpdate} />

          <Root data-testid="TopicNav">
            <Box component="ul" p={0}
              data-testid="TopicNav-list"
              sx={{ listStyle: 'none' }}
            >
              {categories.map((category, idx) => (
                <NavLink
                  key={category.id}
                  component="li"
                  mb={2}
                  data-scrollspy-id={category.id}
                  onClick={activateTopCategory(category.id)}
                >
                  {category.articles && (
                    <Link
                      href={`#${category.id}`}
                      className={`top-category ${(idx === 0 && !active) || active === category.id ? 'active' : ''}`}
                      data-testid={`TopicNav-categoryLink-${category.id}`}
                      onClick={clearExpandedCategory}
                    >
                      {category.name}
                    </Link>
                  )}

                  {category.subcategories && (
                    <Accordion
                      elevation={0}
                      disableGutters
                      expanded={category.id === expandedCategory}
                      onChange={expandCategory(category.id)}
                    >
                      <AccordionSummary
                        className={`top-category ${(idx === 0 && !active) || active === category.id ? 'active' : ''}`}
                      >
                        <AccordionTitle display="flex" justifyContent="space-between" alignItems="center" data-testid={`TopicNav-categoryAccordion-${category.id}`}>
                          {category.name}
                          <ChevronIcon open={category.id === expandedCategory} right />
                        </AccordionTitle>
                      </AccordionSummary>

                      <AccordionDetails>
                        {category.subcategories.map((subcategory: any) => (
                          <Link
                            key={subcategory.id}
                            href={`#${subcategory.id}`}
                            mb={2}
                            pl={3}
                            display="block"
                            onClick={activateSubcategory(subcategory.id)}
                            className={`${activeSubcategory === subcategory.id ? 'active-subcategory' : ''}`}
                            data-testid={`TopicNav-subcategoryLink-${subcategory.id}`}
                          >
                            {subcategory.name}
                          </Link>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  )}
                </NavLink>
              ))}
            </Box>
          </Root>
        </>
      )}
    </ErrorBoundary>
  );
};

export default TopicNav;
