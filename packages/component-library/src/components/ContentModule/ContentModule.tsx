/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import dynamic from 'next/dynamic';
import { createTheme, ThemeProvider as MuiThemeProvider, Theme, ThemeOptions, useTheme } from '@mui/material/styles';
import ContextComposer from 'react-context-composer';
import { useContentModuleContext } from './ContentModuleContext';
import merge from 'lodash/merge';
import omitBy from 'lodash/omitBy';
import isNull from 'lodash/isNull';
import { ContentModuleProps } from './ContentModule.types';
const AnimationContext = dynamic(() => import('./AnimationContext'));

// TODO: Extract Theme composition into a separate hook
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
  let schemeTheme;
  if (colorScheme && contextTheme.createSchemeTheme) {
    schemeTheme = contextTheme.createSchemeTheme(colorScheme);
  }
  if (Array.isArray(theme) || schemeTheme) {
    const merged: ThemeOptions = merge(
      {},
      // Prefer schemeTheme over contextTheme to avoid always merging the previous theme
      schemeTheme ?? contextTheme,
      ...(theme?.map((t) => omitBy(t, isNull)) || [])
    );

    return createTheme(merged);
  }
  return null;
};

const getProviders = (
  {
    theme,
    variant,
    colorScheme,
    animation
  }: { theme?: Array<Theme>; variant?: string; colorScheme?: string; animation?: string },
  contextTheme: Theme
) => {
  const providers = [];
  const muiTheme = getMUITheme({ theme, variant, colorScheme, contextTheme });
  if (muiTheme) {
    providers.push(<MuiThemeProvider theme={muiTheme} />);
  }
  if (animation) {
    providers.push(<AnimationContext animation={animation} />);
  }
  return providers.filter((x) => !!x);
};

function ContentModule({ __typename, theme, ...fields }: ContentModuleProps) {
  if (!__typename) return null;
  const contentMapping = useContentModuleContext();
  const contextTheme = useTheme();
  const contentType =
    fields?.variant && contentMapping[`${__typename}:${fields?.variant}`]
      ? `${__typename}:${fields?.variant}`
      : __typename;
  const Main = React.useMemo(() => contentMapping[contentType], [contentType, __typename, fields?.variant]);
  const providers = React.useMemo(
    () => getProviders({ theme, colorScheme: fields?.colorScheme, animation: fields?.animation }, contextTheme),
    [fields, contextTheme]
  );
  if (!Main) {
    // eslint-disable-next-line no-console
    console.info(
      `Did not find mapping for Content Type ${contentType}${
        fields?.variant ? `:${fields?.variant}` : ''
      }. Please add a mapping in the ContentModuleProvider`
    );
    return null;
  }

  Main.displayName = `Content_${contentType}:${fields?.variant}`;
  return (
    <ContextComposer contexts={providers}>
      <Main {...fields} />
    </ContextComposer>
  );
}

export default ContentModule;
