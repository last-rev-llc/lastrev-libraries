import React from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps
} from '@material-ui/core';
import ErrorBoundary from '../ErrorBoundary';

interface ButtonProps extends MuiButtonProps {}

export const Button = ({
  children,
  ...props
}: ButtonProps) => {
  return (
    <ErrorBoundary>
      <MuiButton
        {...props}
      >
        Button
      </MuiButton>
    </ErrorBoundary>
  );
};

export default Button;
