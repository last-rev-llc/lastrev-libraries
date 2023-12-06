'use client';
import React from 'react';
import { useHierarchicalMenu, type UseHierarchicalMenuProps } from 'react-instantsearch-core';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Collapse from '@mui/material/Collapse';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

type HierarchicalListProps = {
  items: any[]; // Replace 'any' with the actual type of your 'items' array
  createURL: (value: string) => string;
  onNavigate: (value: string) => void;
  onChangeCb: (event: any) => void;
};

const HierarchicalList = ({ onChangeCb, items, createURL, onNavigate }: HierarchicalListProps) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <List>
      {items.map((item) => (
        <ListItem
          key={item.value}
          onClick={() => onNavigate(item.value)}
          sx={{ alignItems: 'flex-start', flexDirection: 'column', padding: 0 }}>
          <FormControlLabel
            label={item.label}
            control={
              <Checkbox
                size="small"
                sx={{
                  'fontSize': '8px',
                  '*': {
                    paddingTop: '0px',
                    paddingBottom: '0px'
                  }
                }}
                checked={item.isRefined}
                value={item.value}
                onChange={onChangeCb}
              />
            }
          />

          {item.data && (
            <Collapse in={item.isRefined} sx={{ paddingLeft: 2 }}>
              <HierarchicalList
                onChangeCb={onChangeCb}
                items={item.data}
                onNavigate={onNavigate}
                createURL={createURL}
              />
            </Collapse>
          )}
        </ListItem>
      ))}
    </List>
  );
};

const HierarchicalMenu = (props: UseHierarchicalMenuProps) => {
  const { items, refine, canToggleShowMore, toggleShowMore, isShowingMore, createURL } = useHierarchicalMenu(props);

  const onChange = (event: any) => {
    // refine(event.target.value);
    // console.log(event.target.value);
  };

  return (
    <>
      <HierarchicalList onChangeCb={onChange} items={items} onNavigate={refine} createURL={createURL} />
      {/* {props.showMore && (
        <Button disabled={!canToggleShowMore} onClick={toggleShowMore} variant="outlined">
          {isShowingMore ? 'Show less' : 'Show more'}
        </Button>
      )} */}
    </>
  );
};

export default HierarchicalMenu;
