import { addDecorator } from '@storybook/react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import theme from '../src/theme';

const StorybookWrapper = (storyFn) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {storyFn()}
  </MuiThemeProvider>
);

addDecorator(StorybookWrapper);
