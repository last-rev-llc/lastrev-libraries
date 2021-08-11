import React from 'react';
import { Grid, Container, Box, MenuItem, TextField, Button, Typography } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core';
import styled from '@material-ui/system/styled';
import ErrorBoundary from '../ErrorBoundary';
import { MediaProps } from '../Media';
import { CardProps } from '../Card';
import ContentModule from '../ContentModule';
import sidekick from '../../utils/sidekick';
import { isEmpty } from 'lodash';
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
  [key: string]: Option[];
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
  const [error, setError] = React.useState(null);
  let limit: number, offset: number; // TODO: Add support for infinite scroll
  React.useEffect(() => {
    if (fetchItems) {
      const fetch = async () => {
        setLoading(true);
        try {
          const result = await fetchItems({ filter, limit, offset });
          console.log('CollectionFiltered', { result });
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
  const { slug, ...query } = router.query;
  const [state, setState] = React.useState({ ...defaultValue, ...query });
  const handleSetState = (newState: any) => {
    setState(newState);
    router.push({ pathname: router.pathname, query: newState }, undefined, { shallow: true });
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
  sidekickLookup
}: CollectionFilteredProps) => {
  const { filters } = settings || {};
  // const [filter, setFilter] = React.useState(defaultFilter);
  const [filter, setFilter] = useQueryState(defaultFilter);

  const { items, options, loading, error } = useDynamicItems({
    items: defaultItems,
    options: defaultOptions,
    fetchItems,
    filter
  });
  const itemsWithVariant = items?.map((item) => ({ ...item, variant: itemsVariant ?? item?.variant }));
  console.log('Collection', { filters, filter });
  // React.useEffect(() => {
  //   setFilter(defaultFilter);
  // }, [defaultFilter]);
  return (
    <ErrorBoundary>
      <Root {...sidekick(sidekickLookup)} variant={variant}>
        <ContentContainer maxWidth={itemsWidth}>
          <Grid container spacing={4} sx={{ flexDirection: 'column' }}>
            <Grid item container sx={{ justifyContent: 'flex-end' }}>
              <CollectionFilters id={id} filters={filters} options={options} setFilter={setFilter} filter={filter} />
              <Grid item>
                <Button
                  onClick={() => {
                    setFilter({});
                    if (onClearFilter) onClearFilter();
                  }}>
                  Clear
                </Button>
              </Grid>
            </Grid>

            {itemsWithVariant?.length ? (
              <>
                <Grid item container>
                  <Grid item xs={12}>
                    <Typography variant="h4">Showing results for: {JSON.stringify(filter)}</Typography>
                  </Grid>
                  {itemsWithVariant?.map((item) => (
                    <Grid key={item.id} item xs={4}>
                      <ContentModule {...item} />
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : null}
            {!itemsWithVariant?.length && !isEmpty(filter) && !loading ? (
              <Grid item>No results for filter {JSON.stringify(filter)}</Grid>
            ) : null}
            {!itemsWithVariant?.length && error ? <Grid item>Error searching for your terms, try again</Grid> : null}
            {!itemsWithVariant?.length && loading ? <Grid item>Loading...</Grid> : null}
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
}
interface FilterFormData {
  [key: string]: any;
}

const CollectionFilters = ({ id, options, filters, filter = {}, setFilter }: CollectionFiltersProps) => {
  const handleChange = (id: string) => (event: any) => {
    console.log('HandleChange', { id, value: event.target.value });
    setFilter({ ...filter, [id]: event.target.value });
  };

  console.log('Filter', { filter });
  return (
    <form id={`collection_${id}_filters`} style={{ width: '100%' }}>
      <Grid container sx={{ justifyContent: 'flex-end' }} spacing={2}>
        {filters?.map(({ id, label, type }) => {
          if (!id) return null;
          let input;
          switch (type) {
            case 'text':
              input = (
                <TextField
                  id={id}
                  name={id}
                  variant="outlined"
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
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  label={label || id}
                  value={filter[id] ?? ''}
                  onChange={handleChange(id)}>
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
    </form>
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
