import React from 'react';
import { Button } from '@material-ui/core';

interface DummyComponent {
  variant: 'contained' | 'text' | 'outlined' | undefined;
}

export const DummyComponent = ({ variant }: DummyComponent) => {
  return (
    <Button variant={variant} color="primary">
      Test
    </Button>
  );
};

export default DummyComponent;
