import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import ErrorBoundary from '../ErrorBoundary';

export interface ButtonProps extends MuiButtonProps {
  text?: string;
}

const Button = ({
  text,
  // children,
  ...props
}: ButtonProps) => {
  return (
    <ErrorBoundary>
      <MuiButton {...props} data-testid="Button">
        {text}
      </MuiButton>
    </ErrorBoundary>
  );
};

export default Button;
