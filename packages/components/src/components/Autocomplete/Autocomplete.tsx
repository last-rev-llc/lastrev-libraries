import React, { createElement, Fragment, useEffect, useRef } from 'react';
import { render } from 'react-dom';
import { autocomplete, AutocompleteOptions } from '@algolia/autocomplete-js';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

export interface AutocompleteProps extends Omit<AutocompleteOptions<any>, 'container'> {
  placeholder?: string;
  detachedMediaQuery?: string;
  openOnFocus?: boolean;
}

const useStyles = makeStyles((theme:Theme) => ({
  panel: {
    'zIndex': 1110,
    'margin': 0,
    'boxShadow': 'transparent',
    'borderRadius': '0px 0px 30px 30px',
    'textDecoration': 'none',

    '& .aa-Item': {
      '&:last-child': {
        borderRadius: '0px 0px 24px 24px'
      }
    },

    '& .aa-Item[aria-selected=true]': {
      backgroundColor: theme.palette.midnight.A06
    }
  }
}));

export const Autocomplete = ({ placeholder, ...props }: AutocompleteProps) => {
  const containerRef = useRef('');
  const classes = useStyles();

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }
    const search = autocomplete({
      ...props,
      placeholder,
      detachedMediaQuery: 'none',
      openOnFocus: false,
      container: containerRef.current,
      classNames: { panel: classes.panel },
      renderer: { createElement, Fragment },
      render({ children }, root) {
        render(children as any, root);
      }
    });
    return () => {
      search.destroy();
    };
  }, [containerRef, classes]);
  return <AutocompleteRoot ref={containerRef} data-testid="Autocomplete" />;
};

const AutocompleteRoot = styled(Box, {
  name: 'Autocomplete',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{}>(() => ({}));

export default Autocomplete;
