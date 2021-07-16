/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ThemeOptions } from '@material-ui/core';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import ContextComposer from 'react-context-composer';
import { useContentModuleContext } from './ContentModuleContext';
import merge from 'lodash/merge';
import omitBy from 'lodash/omitBy';
import isNull from 'lodash/isNull';
import { Theme } from '@material-ui/core/styles/createTheme';

const getMUITheme = (theme?: Array<Theme>) => {
  if (Array.isArray(theme)) {
    const merged: ThemeOptions = omitBy(merge({}, ...theme), isNull);
    // console.log('ThemeMerged', merged);
    return createTheme(merged);
  }
  return null;
};

const getProviders = ({ theme }: { theme?: Array<Theme> }) => {
  // console.log('getProviders', theme);
  const providers = [];
  const muiTheme = getMUITheme(theme);
  if (muiTheme) {
    providers.push(<MuiThemeProvider theme={muiTheme} />);
  }
  return providers.filter((x) => !!x);
};
interface Props {
  __typename: string;
  variant?: string;
  theme?: Array<Theme>;
}
function ContentModule({ __typename, ...fields }: Props) {
  const contentMapping = useContentModuleContext();
  const contentType =
    fields?.variant && contentMapping[`${__typename}${fields?.variant}`]
      ? `${__typename}${fields?.variant}`
      : __typename;
  const Main = React.useMemo(() => contentMapping[contentType], [contentType, __typename, fields?.variant]);
  const providers = React.useMemo(() => getProviders(fields), [fields]);
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
