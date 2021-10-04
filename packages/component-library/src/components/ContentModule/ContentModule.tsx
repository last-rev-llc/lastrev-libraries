/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, Theme, ThemeOptions, useTheme } from '@mui/material/styles';
import ContextComposer from 'react-context-composer';
import { useContentModuleContext } from './ContentModuleContext';
import merge from 'lodash/merge';
import omitBy from 'lodash/omitBy';
import isNull from 'lodash/isNull';

// declare module '@mui/styles/defaultTheme' {
//   // eslint-disable-next-line @typescript-eslint/no-empty-interface
//   interface DefaultTheme extends Theme {}
// }

// declare module '@mui/styles/defaultTheme' {
//   // eslint-disable-next-line @typescript-eslint/no-empty-interface
//   interface DefaultTheme extends Theme {}
// }

const getMUITheme = ({
  theme,
  colorScheme,
  contextTheme
}: {
  theme?: Array<Theme>;
  variant?: string;
  colorScheme?: string;
  contextTheme: Theme;
}) => {
  const schemePalette = colorScheme && contextTheme?.palette?.schemes ? contextTheme.palette.schemes[colorScheme] : undefined;
  // console.log('schemePallete', schemePalette, colorScheme);
  // TODO inject custom theme depending on variant ?
  if (Array.isArray(theme)) {
    const merged: ThemeOptions = omitBy(merge({ palette: schemePalette }, ...theme), isNull);
    // console.log('ThemeMerged', merged);
    return createTheme(merged);
  }
  return null;
};

const getProviders = ({ theme, variant, colorScheme }: { theme?: Array<Theme>; variant?: string, colorScheme?: string }, contextTheme: Theme) => {
  // console.log('getProviders', theme);
  const providers = [];
  const muiTheme = getMUITheme({ theme, variant, colorScheme, contextTheme });
  if (muiTheme) {
    providers.push(<MuiThemeProvider theme={muiTheme} />);
  }
  return providers.filter((x) => !!x);
};

interface Props {
  __typename?: string;
  theme?: Array<Theme>;
  variant?: string;
  colorScheme?: string;
  loading?: boolean;
  [key: string]: any;
}

function ContentModule({ __typename, ...fields }: Props) {
  if (!__typename) return null;
  const contentMapping = useContentModuleContext();
  const contextTheme = useTheme();
  const contentType =
    fields?.variant && contentMapping[`${__typename}:${fields?.variant}`]
      ? `${__typename}:${fields?.variant}`
      : __typename;
  const Main = React.useMemo(() => contentMapping[contentType], [contentType, __typename, fields?.variant]);
  const providers = React.useMemo(() => getProviders(fields, contextTheme), [fields, contextTheme]);
  if (fields.id === 'homepage hero') {
    console.log('provs', fields.id, providers, contextTheme);
  }
  if (!Main) {
    // eslint-disable-next-line no-console
    console.info(
      `Did not find mapping for Content Type ${__typename}. Please add a mapping in the ContentModuleProvider`
    );
    return null;
  }

  return (
    <ContextComposer contexts={providers}>
      <Main {...fields} />
    </ContextComposer>
  );
}

export default ContentModule;
