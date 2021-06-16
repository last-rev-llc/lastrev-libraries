import React from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps
} from '@material-ui/core';

interface ButtonProps extends MuiButtonProps {
  // variant: 'contained' | 'text' | 'outlined' | undefined;
  // size: 'large' | 'medium' | 'small';
  // color: 'default' | 'inherit' | 'primary' | 'secondary';
  // disabled: boolean;
  // fullWidth: boolean;
}

export const Button = ({
  children,
  ...restProps
}: ButtonProps) => {
  return (
    <MuiButton
      {...restProps}
    >
      Button
    </MuiButton>
  );
};

export default Button;
