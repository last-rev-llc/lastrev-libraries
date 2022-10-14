import React, { useEffect } from 'react';
import { Configure, RefinementList, MenuSelect, connectRefinementList } from 'react-instantsearch-dom';
import { useRouter } from 'next/router';
import aa from 'search-insights';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule';
import { CollectionProps } from '@last-rev/component-library/dist/components/Collection';
import sidekick from '@last-rev/contentful-sidekick-util';

import { useLocalizationContext } from '../LocalizationContext';

interface FilterItem {
  label: string;
  count?: number;
}

const RefinementListTest = (props: any) => {
  React.useEffect(() => {
    if (props.currentRefinement.length === 2) {
      props.refine(['false']);
    } else if (props.currentRefinement.length === 0) {
      props.refine(['true']);
    }
  }, [props.currentRefinement]);

  return <Filters {...props} />;
};

const CustomRefinementList = connectRefinementList(RefinementListTest);

export const CollectionSearchFilters = ({ introText, sidekickLookup, ...props }: CollectionProps) => {
  const router = useRouter();
  const localization = useLocalizationContext();
  const { locale, defaultLocale } = router;

  let userToken = '';
  useEffect(() => {
    aa('getUserToken', null, (err: any, algoliaUserToken: string) => {
      if (err) {
        console.error(err);
        return;
      }
      userToken = algoliaUserToken;
    });
  }, []);

  return (
    <ErrorBoundary>
      <Box
        data-testid="CollectionSearchFilters"
        sx={{
          'marginTop': { xs: 3, md: 0 },

          '& [class*="Text-root"] b': {
            fontWeight: 500
          }
        }}
        {...sidekick(sidekickLookup)}>
        <Box
          sx={{
            'display': 'flex',
            'alignItems': 'center',

            '& [class*="Text-root"] p': {
              'marginBottom': { xs: 0, md: 1 },

              '@media (max-width: 1024px)': {
                fontSize: 14,
                textTransform: 'uppercase'
              }
            }
          }}>
          {introText ? (
            <ContentModule
              {...introText}
              {...sidekick(sidekickLookup?.introText)}
              data-testid="CollectionSearchFilters-introText"
            />
          ) : null}
          <Box
            sx={{
              'display': { xs: 'flex', md: 'none' },
              'alignItems': 'center',
              'marginLeft': 3,

              '& svg': {
                zIndex: 1,
                width: 14,
                height: 14,
                marginRight: -3,
                color: 'midnight.A40'
              },

              '& select': {
                width: '100%',
                padding: 1,
                paddingLeft: 3,
                border: 0,
                borderRadius: 6,
                backgroundColor: 'midnight.A06',
                color: 'midnight.A90',
                fontSize: 14,
                appearance: 'none'
              }
            }}>
            <FilterAltIcon />
            <MenuSelect attribute="categories.level-1" />
          </Box>
        </Box>
        <Filters
          attribute="categories.level-1"
          transformItems={(items: Array<FilterItem>) =>
            items.map((item) => {
              return {
                ...item,
                'label': item.label,
                'count': `(${item.count})`,
                'data-insights-filter': `categories: ${item.label}`
              };
            })
          }
        />
        {locale !== defaultLocale && (
          <CustomRefinementList
            attribute="translatedInLocale"
            defaultRefinement={['true']}
            transformItems={(items: Array<FilterItem>) =>
              items
                .filter((item) => item.label !== 'true')
                .map((item) => {
                  return {
                    ...item,
                    label:
                      localization['search.untranslatedResults.label']?.shortTextValue ?? 'View unstranslated results',
                    count: `(${item.count})`
                  };
                })
            }
          />
        )}
        <Configure
          hitsPerPage={8}
          facetingAfterDistinct={true}
          filters={`locale:${locale}`}
          clickAnalytics={true}
          userToken={userToken}
        />
        {/* Locale switcher */}
        {props.items?.map((item) => {
          if (item.__typename === 'NavigationItem') {
            return (
              <LocaleSwitcher>
                <ContentModule {...item} />
              </LocaleSwitcher>
            );
          }
          return null;
        })}
      </Box>
    </ErrorBoundary>
  );
};

const Filters = styled(RefinementList, {
  name: 'CollectionSearchFilters',
  slot: 'RefinementList'
})(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none'
  },
  '& .ais-RefinementList-list': {
    listStyle: 'none',
    margin: `0 0 ${theme.spacing(2)}`,
    padding: 0
  },
  '& .ais-RefinementList-item': {
    marginBottom: theme.spacing(1)
  },
  '& .ais-RefinementList-label': {
    ...theme.typography.body3,
    lineHeight: 1.1425
  },
  '& .ais-RefinementList-checkbox': {
    width: theme.spacing(2),
    height: theme.spacing(2),
    marginLeft: 0,
    marginRight: theme.spacing(1),
    accentColor: theme.palette.midnight.A20
  }
}));

const LocaleSwitcher = styled(Box, {
  name: 'CollectionSearchFilters',
  slot: 'LocaleSwitcher'
})(({ theme }) => ({
  'display': 'flex',

  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(2)
  },

  '& [class*=NavigationItem-root]': {
    '&:hover': {
      'cursor': 'pointer',
      'backgroundColor': 'transparent',

      '& [class*=NavigationItem-menuRoot]': {
        display: 'block'
      }
    },

    '& a': {
      ...theme.typography.body2,
      'fontWeight': 500,

      '&:hover': {
        textDecoration: 'none'
      },

      [theme.breakpoints.down('md')]: {
        fontSize: 14
      }
    },

    '& [class*=NavigationItem-menuRoot]': {
      'right': 'auto',
      'width': '100%',
      'margin': 0,
      'padding': 0,
      'borderRadius': 0,
      'backgroundColor': theme.palette.midnight.A03,

      '& button': {
        'display': 'block',
        'padding': theme.spacing(1),
        'textAlign': 'left',
        ...theme.typography.body3,

        '&:hover': {
          textDecoration: 'none'
        }
      }
    },

    '& svg': {
      fill: theme.palette.midnight.main,
      marginLeft: theme.spacing(0.5)
    }
  }
}));

export default CollectionSearchFilters;
