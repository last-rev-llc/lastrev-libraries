/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import merge from '../../utils/merge';
import removeEmpty from '../../utils/removeEmpty';
import { ContentThemeProviderProps } from './ContentThemeProvider.types';
import { createTheme, Theme, ThemeOptions, useTheme, ThemeProvider as MuiThemeProvider } from '@mui/system';

// TODO: Extract Theme composition into a separate hook
const getMUITheme = ({
  theme,
  colorScheme,
  contextTheme
}: {
  theme?: Array<Theme>;
  variant?: string;
  colorScheme?: string;
  contextTheme: Theme & { createSchemeTheme?: (colorScheme: string) => Theme };
}) => {
  let schemeTheme;
  if (colorScheme && contextTheme.createSchemeTheme) {
    schemeTheme = contextTheme.createSchemeTheme(colorScheme);
  }
  if (Array.isArray(theme) || schemeTheme) {
    const merged: ThemeOptions = merge(
      {},
      // Prefer schemeTheme over contextTheme to avoid always merging the previous theme
      schemeTheme ?? contextTheme,
      ...(theme?.map(removeEmpty) || [])
    );

    return createTheme(merged);
  }
  return null;
};

function ContentThemeProvider({ children, theme, variant, colorScheme }: ContentThemeProviderProps) {
  const contextTheme = useTheme<Theme>();

  const muiTheme = React.useMemo(
    () => getMUITheme({ contextTheme, theme, variant, colorScheme }),
    [theme, variant, colorScheme, contextTheme]
  );
  if (muiTheme) return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>;
  return children;
}

export default ContentThemeProvider;
