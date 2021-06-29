import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@material-ui/core';
import ErrorBoundary from '../ErrorBoundary';

interface ButtonProps extends MuiButtonProps {
  text?: string
}

export const Button = ({
  text,
  // children,
  ...props
}: ButtonProps) => {
  return (
    <ErrorBoundary>
      <MuiButton
        {...props}
      >
        {text}
      </MuiButton>
    </ErrorBoundary>
  );
};

export default Button;
