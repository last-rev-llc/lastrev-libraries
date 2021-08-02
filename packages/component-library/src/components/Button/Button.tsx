import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@material-ui/core';
import ErrorBoundary from '../ErrorBoundary';

interface ButtonProps extends MuiButtonProps {
  text?: string;
  testId?: string;
}

export const Button = ({
  text,
  testId,
  // children,
  ...props
}: ButtonProps) => {
  return (
    <ErrorBoundary>
      <MuiButton {...props} data-testid={testId}>{text}</MuiButton>
    </ErrorBoundary>
  );
};

export default Button;
