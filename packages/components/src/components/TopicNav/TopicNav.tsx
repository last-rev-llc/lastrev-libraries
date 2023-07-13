import React, { useState, useEffect } from 'react';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary';
import Link from '@last-rev/component-library/dist/components/Link';

import { NavigationItemProps } from '@last-rev/component-library/dist/components/NavigationItem';

import { ScrollSpy } from '../../utils/scrollSpy';
import ChevronIcon from '../ChevronIcon';

export interface TopicNavProps {
  currentCategoryId: string;
  navItems?: Array<NavigationItemProps>;
}

const TopicNav = ({ navItems, currentCategoryId = '' }: TopicNavProps) => {
  const [active, setActive] = useState(currentCategoryId);
  const [expandedCategory, setExpandedCategory] = useState<string>('');

  useEffect(() => {
    // Expand top level nav item, if the initial currentCategoryId is a subnav item
    if (!navItems) return;

    const navItem = navItems.find((navItem) => navItem.id === currentCategoryId);
    if (navItem) return;

    let topLevelNavItem = '';
    navItems.forEach((navItem) => {
      if (topLevelNavItem || !navItem.subNavigation) return;

      const subNavItem = navItem.subNavigation.find((subnav) => subnav.id === currentCategoryId);

      if (subNavItem) {
        topLevelNavItem = navItem.id || '';
      }
    });

    if (topLevelNavItem) {
      setExpandedCategory(topLevelNavItem);
    }
  }, []);

  const onScrollUpdate = (entry: { target: any; boundingClientRect: any }, isInViewPort: any) => {
    const { target, boundingClientRect } = entry;
    if (!target) return;

    const correspondingNavItem = document.querySelector(`[data-scrollspy-id="${target.id}"]`);
    const parentnavItemId = target.attributes['parent-category-id']?.value; // subNavigation will have this custom attr to point to the parent category

    if (!correspondingNavItem && !parentnavItemId) return;

    if (boundingClientRect.y <= 0 && isInViewPort) {
      if (parentnavItemId) {
        setActive(parentnavItemId);
      } else {
        setActive(target.id);
      }
    }
  };

  const expandCategory = (navItemId: string) => (_evt: any, expanded: boolean) => {
    if (expanded) {
      setExpandedCategory(navItemId);
      activateTopCategory(navItemId);
    } else {
      setExpandedCategory('');
    }
  };

  const activateTopCategory = (navItemId: string) => () => {
    setTimeout(() => {
      setActive(navItemId);
    }, 500);
  };

  return (
    <ErrorBoundary>
      <Root data-testid="TopicNav" displayPrint="none">
        <ScrollSpy handleScroll={onScrollUpdate} />
        <List data-testid="TopicNav-list" sx={{ p: 0, listStyle: 'none' }}>
          {navItems &&
            navItems.map((navItem, idx) => (
              <ListItem
                disablePadding
                key={`topicNav-${navItem.id ?? ''}`}
                sx={{ mb: 2.25 }}
                data-scrollspy-id={navItem.id}>
                {navItem.subNavigation ? (
                  <Accordion
                    elevation={0}
                    disableGutters
                    sx={{ width: '100%' }}
                    expanded={navItem.id === expandedCategory}
                    onChange={expandCategory(navItem.id ?? '')}>
                    <AccordionSummary>
                      <AccordionTitle
                        sx={{ display: 'flex', alignItems: 'center', mb: 0 }}
                        data-scrollspy-id={navItem.id}
                        data-testid={`TopicNav-categoryAccordion-${navItem.id}`}>
                        <NavLink
                          {...(navItem as any)}
                          onClick={(evt: any) => {
                            evt.stopPropogation;
                            setActive(navItem.id ?? '');
                          }}
                          sx={{ display: 'flex', alignItems: 'center', pl: 1 }}
                          className={`top-category ${
                            (idx === 0 && !active) ||
                            active === navItem.id ||
                            navItem.subNavigation.map((navItem) => navItem.id).includes(active)
                              ? 'active'
                              : ''
                          }`}
                          data-testid={`TopicNav-categoryLink-${navItem.id}`}
                        />
                        <ChevronIcon sx={{ ml: 'auto' }} open={navItem.id === expandedCategory} />
                      </AccordionTitle>
                    </AccordionSummary>

                    <AccordionDetails>
                      <List data-testid="TopicNav-list" sx={{ p: 0, listStyle: 'none' }}>
                        {navItem.subNavigation.map((subNavItem: any) => (
                          <ListItem disablePadding sx={{ p: 0, listStyle: 'none', mb: 1.5 }} key={subNavItem.id}>
                            <NavLink
                              {...subNavItem}
                              sx={{ pl: 3, mb: 0, mr: 2, display: 'block' }}
                              onClick={() => setActive(subNavItem.id ?? '')}
                              className={subNavItem.id === active ? 'subnav-active' : ''}
                              data-testid={`TopicNav-subCategoryLink-${subNavItem.id}`}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                ) : (
                  <NavLink
                    {...(navItem as any)}
                    onClick={() => setActive(navItem.id ?? '')}
                    sx={{ display: 'flex', alignItems: 'center', pl: 1 }}
                    className={`top-category ${(idx === 0 && !active) || active === navItem.id ? 'active' : ''}`}
                    data-testid={`TopicNav-categoryLink-${navItem.id}`}
                  />
                )}
              </ListItem>
            ))}
        </List>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'TopicNav',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})(({ theme }) => ({
  position: 'sticky',
  top: theme.spacing(19),
  width: '100%'
}));

const NavLink = styled(Link, {
  name: 'TopicNav',
  slot: 'NavLink'
})(({ theme }) => ({
  ...theme.typography.smallText,
  'fontWeight': 500,
  'borderLeft': '2px solid transparent',

  'color': theme.palette.midnight.A100,

  '&:hover': {
    color: theme.palette.secondary.main,
    textDecoration: 'none'
  },

  '&.active': {
    borderLeftColor: theme.palette.secondary.main,
    color: theme.palette.secondary.main,
    fontWeight: 600
  },

  '&.subnav-active': {
    color: theme.palette.secondary.main,
    fontWeight: 600
  }
}));

const AccordionTitle = styled(Box)(({ theme }) => ({
  ...theme.typography.smallText,
  'width': '100%',

  '& > div': {
    width: '100%'
  },

  '& > svg': {
    marginLeft: 'auto',
    maxWidth: '7.16px',
    minHeight: '1rem'
  }
}));

const Accordion = styled(MuiAccordion)({
  'backgroundColor': 'transparent',

  '&:before': {
    display: 'none'
  }
});

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  ...theme.typography.smallText,
  'minHeight': 0,
  'padding': 0,
  'color': theme.palette.midnight.A70,
  'fontWeight': 500,
  'width': '100%',

  '&.Mui-expanded': {
    minHeight: 0,
    marginBottom: theme.spacing(2)
  },

  '& .MuiAccordionSummary-content': {
    margin: 0
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)({
  'padding': 0,

  '& > a:last-child': {
    marginBottom: 0
  }
});

export default TopicNav;
