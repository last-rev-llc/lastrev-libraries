import React from 'react';
import { useToggleRefinement, type UseToggleRefinementProps } from 'react-instantsearch-core';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

type ToggleRefinementProps = {
  attribute: string;
  others?: UseToggleRefinementProps;
};

const toTitleCase = (str: string) => {
  return str
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .trim() // Remove leading and trailing spaces
    .replace(/\b\w/g, (match) => match.toUpperCase()); // Capitalize first letter of each word
};

const ToggleRefinement = ({ attribute, others }: ToggleRefinementProps) => {
  const { value, refine } = useToggleRefinement({ attribute, ...others });

  const handleCheckboxChange = () => {
    refine({ isRefined: !value.isRefined });
  };

  const handleLabelClick = () => {
    handleCheckboxChange();
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value.isRefined}
          sx={{ display: 'none' }}
          onChange={(event) => {
            refine({ isRefined: !event.target.checked });
          }}
          inputProps={{
            'aria-label': 'Toggle Refinement'
          }}
        />
      }
      label={toTitleCase(attribute)}
      sx={{
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        paddingRight: 'var(--grid-gap-double)',
        paddingLeft: 0,
        whiteSpace: 'nowrap',
        opacity: value.isRefined ? 1 : 0.3,
        textTransform: 'unset',
        ...(theme) => ({
          'typography': {
            h5: {
              ...theme.typography.h5
            }
          },
          '& .Mui-checked': {
            opacity: 1,
            color: 'var(--mui-palette-text-primary)'
          }
        })
      }}
    />
  );
};

export default ToggleRefinement;
