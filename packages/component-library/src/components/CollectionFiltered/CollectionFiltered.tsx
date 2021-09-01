import React from 'react';
import { Skeleton, Grid, Container, Box, MenuItem, TextField, Button, Typography } from '@material-ui/core';

import { Breakpoint } from '@material-ui/core';
import styled from '@material-ui/system/styled';
import ErrorBoundary from '../ErrorBoundary';
import Section from '../Section';
import { MediaProps } from '../Media';
import { CardProps } from '../Card';
import sidekick from '../../utils/sidekick';
import { isEmpty, range } from 'lodash';
import { useRouter } from 'next/router';

interface Settings {
  filters: FilterSetting[];
}

interface FilterSetting {
  id: string;
  label?: string;
  key: string;
  type: 'select' | 'text';
}
interface Option {
  label: string;
  value: string;
}
interface Options {
  [key: string]: Array<Option>;
}
export interface CollectionFilteredProps {
  id: string;
  items?: CardProps[];
  settings?: Settings;
  options?: Options;
  filter?: FilterFormData;
  fetchItems?: (filter: any) => Promise<{ items?: CardProps[]; options?: Options } | null>;
  onClearFilter?: () => void;
  background?: MediaProps;
  variant?: string;
  itemsVariant?: string;
  itemsSpacing?: number;
  theme: any;
  itemsWidth?: false | Breakpoint | undefined;
  sidekickLookup?: string;
}
export interface UseDynamicItemsInterface {
  items?: CardProps[];
  options?: Options;
  fetchItems?: (filter: any) => Promise<{ items?: CardProps[]; options?: Options } | null>;
  filter: any;
}
const useDynamicItems = ({
  items: defaultItems,
  options: defaultOptions,
  fetchItems,
  filter
}: UseDynamicItemsInterface) => {
  const [items, setItems] = React.useState(defaultItems);
  const [options, setOptions] = React.useState(defaultOptions);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(true);
  let limit: number, offset: number; // TODO: Add support for infinite scroll
  React.useEffect(() => {
    if (fetchItems) {
      const fetch = async () => {
        setLoading(true);
        try {
          const result = await fetchItems({ filter, limit, offset });
          // console.log('CollectionFiltered', { result });
          setItems(result?.items);
          setOptions(result?.options);
        } catch (error) {
          console.log('Error', error);
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetch();
    }
  }, [fetchItems, filter, setItems, setOptions]);

  return { items, options, loading, error };
};

const useQueryState = (defaultValue: any): [any, any] => {
  const router = useRouter();
  const { slug, ...query } = router?.query ?? {};
  const [state, setState] = React.useState({ ...defaultValue, ...query });
  const handleSetState = (newState: any) => {
    setState(newState);
    // router.push({ pathname: router.pathname, query: { ...query, slug, ...newState } }, undefined, { shallow: true });
  };
  return [state, handleSetState];
};
export const CollectionFiltered = ({
  id,
  items: defaultItems,
  options: defaultOptions,
  filter: defaultFilter,
  onClearFilter,
  fetchItems,
  settings,
  itemsWidth,
  variant,
  itemsVariant,
  itemsSpacing,
  sidekickLookup
}: CollectionFilteredProps) => {
  const { filters } = settings || {};
  // const [filter, setFilter] = React.useState(defaultFilter);
  const [filterQuery, setFilter] = useQueryState(defaultFilter);
  const filter = React.useMemo<FilterFormData>(() => {
    if (!filters) return {};
    // Filter the filterQuery to only include the keys that are in the options
    return filters?.reduce(
      (acc, { id }) => ({
        ...acc,
        [id]: filterQuery[id]
      }),
      {}
    );
  }, [filterQuery, filters]);

  let { items, options, loading, error } = useDynamicItems({
    items: defaultItems,
    options: defaultOptions,
    fetchItems,
    filter
  });
  const itemsWithVariant = items?.map((item) => ({ ...item, variant: itemsVariant ?? item?.variant }));

  const parseValue = ({ filterId, value }: { filterId: string; value: string }) => {
    return options && options[filterId]
      ? options[filterId]?.find((option) => option.value === value || value?.includes(option.value))?.label
      : value;
  };

  const parsedFilters = filters
    ?.map(({ id }) => (filter[id] ? parseValue({ filterId: id, value: filter[id] }) : null))
    .filter((x) => !!x)
    .join(', ');

  return (
    <ErrorBoundary>
      <Root {...sidekick(sidekickLookup)} variant={variant}>
        <ContentContainer maxWidth={itemsWidth}>
          <Grid container spacing={itemsSpacing} sx={{ flexDirection: 'column' }}>
            <Grid item container sx={{ justifyContent: 'flex-end' }}>
              <CollectionFilters
                id={id}
                filters={filters}
                options={options}
                setFilter={setFilter}
                filter={filter}
                onClearFilter={onClearFilter}
              />
            </Grid>
            {!itemsWithVariant?.length && !isEmpty(filter) && !loading ? (
              <Grid item>
                <Typography variant="h4">
                  No results for filter: {parsedFilters ? parsedFilters : <Skeleton width={100} />}
                </Typography>
              </Grid>
            ) : null}
            {!itemsWithVariant?.length && error ? (
              <Grid item>
                <Typography variant="h4">Error searching for: {parsedFilters}, try again!</Typography>
              </Grid>
            ) : null}
            {itemsWithVariant?.length ? (
              <>
                <Grid item container>
                  <Grid item xs={12}>
                    <Typography variant="h4">
                      {parsedFilters ? `Showing results for: ${parsedFilters}` : 'Showing results for: All'}
                    </Typography>
                  </Grid>
                  <Section
                    contents={itemsWithVariant}
                    // background={background}
                    variant={'three-per-row'}
                    contentSpacing={itemsSpacing}
                  />
                </Grid>
              </>
            ) : null}
            {loading ? (
              <>
                <Grid item container>
                  {!itemsVariant?.length ? (
                    <Grid item xs={12}>
                      <Typography variant="h4">
                        Showing results for: {parsedFilters ? parsedFilters : <Skeleton width={100} />}
                      </Typography>
                    </Grid>
                  ) : null}
                  <Section
                    contents={range(9).map((_: any, idx: number) => ({
                      __typename: 'Card',
                      id: `${idx}`,
                      variant: itemsVariant,
                      loading: true
                    }))}
                    variant={'three-per-row'}
                    contentSpacing={itemsSpacing}
                  />
                </Grid>
              </>
            ) : null}
            <Grid item>
              <Button variant="contained">LOAD MORE</Button>
            </Grid>
          </Grid>
        </ContentContainer>
      </Root>
    </ErrorBoundary>
  );
};

interface CollectionFiltersProps {
  id: string;
  options?: Options;
  filter?: FilterFormData;
  filters?: FilterSetting[];
  setFilter: any;
  onClearFilter: any;
}
interface FilterFormData {
  [key: string]: any;
}

const CollectionFilters = ({ id, options, filters, filter = {}, setFilter, onClearFilter }: CollectionFiltersProps) => {
  const handleChange = (id: string) => (event: any) => {
    setFilter({ ...filter, [id]: event.target.value });
  };

  return (
    <CollectionFiltersRoot id={`collection_${id}_filters`} container style={{ justifyContent: 'flex-end' }}>
      <Grid item container sx={{ justifyContent: 'flex-end' }} spacing={2}>
        {filters?.map(({ id, label, type }) => {
          if (!id) return null;
          let input;
          switch (type) {
            case 'text':
              input = (
                <TextField
                  id={id}
                  name={id}
                  fullWidth
                  margin="normal"
                  label={label || id}
                  value={filter[id] ?? ''}
                  onChange={handleChange(id)}
                />
              );
              break;
            case 'select':
              // if (options && options[id]?.length) {
              input = (
                <TextField
                  select
                  id={id}
                  name={id}
                  fullWidth
                  margin="normal"
                  label={label || id}
                  value={filter[id] ?? ''}
                  SelectProps={{ MenuProps: { disableScrollLock: true } }}
                  onChange={handleChange(id)}>
                  <MenuItem value={-1} disabled>
                    Select a filter
                  </MenuItem>
                  {options
                    ? options[id]?.map(({ label, value }) => (
                        <MenuItem key={label} value={value ?? ''}>
                          {label}
                        </MenuItem>
                      ))
                    : null}
                </TextField>
              );
              break;
            // }
          }
          if (input)
            return (
              <Grid key={id} item xs>
                {input}
              </Grid>
            );
          return null;
        })}
      </Grid>
      <Grid item>
        <Button
          onClick={() => {
            setFilter({});
            if (onClearFilter) onClearFilter();
          }}>
          Clear
        </Button>
      </Grid>
    </CollectionFiltersRoot>
  );
};

const Root = styled(Box, {
  name: 'CollectionFiltered',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})<{ variant?: string }>(() => ({
  display: 'flex',
  justifyContent: 'center'
}));

const CollectionFiltersRoot = styled(Grid, {
  name: 'CollectionFiltered',
  slot: 'FiltersRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})<{ variant?: string }>(() => ({}));

const ContentContainer = styled(Container, {
  name: 'CollectionFiltered',
  slot: 'ContentContainer',
  overridesResolver: (_, styles) => ({
    ...styles.contentContainer
  })
})<{ variant?: string }>(() => ({
  display: 'flex'
}));

export default CollectionFiltered;
