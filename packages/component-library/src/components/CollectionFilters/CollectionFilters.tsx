import React from 'react';
import {
  Grid,
  Chip as MuiChip,
  MenuItem as MuiMenuItem,
  TextField as MuiTextField,
  Button as MuiButton
} from '@mui/material';
import MuiAutocomplete from '@mui/material/Autocomplete';
import styled from '@mui/system/styled';
import capitalize from 'lodash/capitalize';
import { CollectionFiltersProps, Option } from './CollectionFilters.types';

const CollectionFiltersComponent = ({
  id,
  // options,
  allOptions,
  filters,
  filter = {},
  setFilter,
  onClearFilter,
  ...props
}: CollectionFiltersProps) => {
  const handleChange = (id: string) => (event: any) => {
    setFilter({ ...filter, [id]: event.target.value });
  };

  return (
    <CollectionFiltersRoot id={`collection_${id}_filters`} container style={{ justifyContent: 'flex-end' }} {...props}>
      <CollectionFilters item container sx={{ justifyContent: 'flex-end' }} spacing={2}>
        {filters?.map(({ id, label, type, multiple }) => {
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
                  data-testid="CollectionFilters-text"
                />
              );
              break;
            case 'select':
              input = (
                <SelectTextField
                  select
                  id={id}
                  name={id}
                  fullWidth
                  margin="normal"
                  label={`Select a ${label || id}`}
                  value={filter[id] ?? ''}
                  SelectProps={{ MenuProps: { disableScrollLock: true } }}
                  onChange={handleChange(id)}
                  data-testid="CollectionFilters-select">
                  {allOptions
                    ? allOptions[id]?.map(({ label, value }) => (
                        <MenuItem key={label} value={value ?? ''}>
                          {label}
                        </MenuItem>
                      ))
                    : null}
                </SelectTextField>
              );
              break;
            case 'autocomplete':
              input = (
                <Autocomplete
                  id={id}
                  {...({ multiple } as any)}
                  value={filter[id]}
                  onChange={(_event: any, newValue: any) => {
                    if (!newValue) {
                      setFilter({ ...filter, [id]: undefined });
                    } else {
                      setFilter(
                        multiple
                          ? { ...filter, [id]: newValue?.map((x: Option) => x.label) }
                          : { ...filter, [id]: newValue.value }
                      );
                    }
                  }}
                  options={allOptions && allOptions[id]?.length ? allOptions[id] : []}
                  getOptionLabel={(option: any) => capitalize(option.label)}
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option: any, index) => (
                      <Chip label={capitalize(option.label)} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={(params) => (
                    <AutocompleteTextField
                      {...params}
                      label={`Select a ${label || id}`}
                      name={id}
                      fullWidth
                      margin="normal"
                      value={filter[id] ?? ''}
                      data-testid="CollectionFilters-autocomplete"
                    />
                  )}
                />
              );
              break;
            // }
          }
          if (input)
            return (
              <InputRoot key={id} item xs>
                {input}
              </InputRoot>
            );
          return null;
        })}
      </CollectionFilters>
      <ButtonRoot item>
        <Button
          data-testid="CollectionFilters-clear"
          onClick={() => {
            setFilter({});
            if (onClearFilter) onClearFilter();
          }}>
          Clear
        </Button>
      </ButtonRoot>
    </CollectionFiltersRoot>
  );
};

const CollectionFiltersRoot = styled(Grid, {
  name: 'CollectionFilters',
  slot: 'FiltersRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.root]
})``;

const CollectionFilters = styled(Grid, {
  name: 'CollectionFilters',
  slot: 'Filters',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.filters]
})``;

const TextField = styled(MuiTextField, {
  name: 'CollectionFilters',
  slot: 'TextField',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.textField]
})``;

const SelectTextField = styled(MuiTextField, {
  name: 'CollectionFilters',
  slot: 'SelectTextField',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.selectTextField]
})``;

const AutocompleteTextField = styled(MuiTextField, {
  name: 'CollectionFilters',
  slot: 'AutocompleteTextField',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.autocompleteTextField]
})``;

const MenuItem = styled(MuiMenuItem, {
  name: 'CollectionFilters',
  slot: 'MenuItem',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.menuItem]
})``;

const Autocomplete = styled(MuiAutocomplete, {
  name: 'CollectionFilters',
  slot: 'Autocomplete',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.autocomplete]
})``;

const Chip = styled(MuiChip, {
  name: 'CollectionFilters',
  slot: 'Chip',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.chip]
})``;

const InputRoot = styled(Grid, {
  name: 'CollectionFilters',
  slot: 'InputRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.inputRoot]
})``;

const ButtonRoot = styled(Grid, {
  name: 'CollectionFilters',
  slot: 'ButtonRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.buttonRoot]
})``;

const Button = styled(MuiButton, {
  name: 'CollectionFilters',
  slot: 'Button',
  overridesResolver: (_, styles) => [styles.button]
})``;

export default CollectionFiltersComponent;
