import React from 'react';
import {Autocomplete, Grid, Chip, MenuItem, TextField, Button } from '@material-ui/core';
import styled from '@material-ui/system/styled';

interface FilterSetting {
  id: string;
  label?: string;
  key: string;
  type: 'select' | 'text' | 'autocomplete';
  multiple?: boolean;
}
interface Option {
  label: string;
  value: string;
}

interface Options {
  [key: string]: Array<Option>;
}



export interface CollectionFiltersProps {
  id: string;
  options?: Options;
  allOptions?: Options;
  filter?: FilterFormData;
  filters?: FilterSetting[];
  setFilter: any;
  onClearFilter: any;
}
interface FilterFormData {
  [key: string]: any;
}

const CollectionFilters = ({
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
      <Grid item container sx={{ justifyContent: 'flex-end' }} spacing={2}>
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
                />
              );
              break;
            case 'select':
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
                    Select a {label?.toLocaleLowerCase()}
                  </MenuItem>
                  {allOptions
                    ? allOptions[id]?.map(({ label, value }) => (
                        <MenuItem key={label} value={value ?? ''}>
                          {label}
                        </MenuItem>
                      ))
                    : null}
                </TextField>
              );
              break;
            case 'autocomplete':
              input = (
                <Autocomplete
                  id={id}
                  multiple={multiple}
                  value={filter[id]}
                  onChange={(_event, newValue) => {
                    console.log("Change filter", newValue);
                    if(!newValue) {
                      setFilter({ ...filter, [id]: undefined });
                    }else{
                      setFilter(multiple ? { ...filter, [id]: newValue?.map((x:Option) => x.label) } : { ...filter, [id]: newValue.value });
                    }
                  }}
                  options={allOptions && allOptions[id]?.length ? allOptions[id] : []}
                  getOptionLabel={(option) => option.label}
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                      <Chip
                        label={option.label}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField {...params} 
                      placeholder={`Select a ${label}`} 
                      label={label || id}
                      name={id}
                      fullWidth
                      margin="normal"
                      value={filter[id] ?? ''}  
                    />
                  )}
                />
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

const CollectionFiltersRoot = styled(Grid, {
  name: 'CollectionFiltered',
  slot: 'FiltersRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})<{ variant?: string }>(() => ({}));

export default CollectionFilters;
