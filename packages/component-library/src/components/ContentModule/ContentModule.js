import React from 'react';
import dynamic from 'next/dynamic';
import { ThemeProvider } from '@material-ui/core';
import merge from 'lodash/merge';
import ContextComposer from 'react-context-composer';

const mappings = {
  Button: dynamic(() => import('../Button')),
  Card: dynamic(() => import('../Card')),
  Link: dynamic(() => import('../Link')),
};

const getProviders = ({ theme = [] } = {}) => {
  const providers = [];
  const muiTheme = merge({}, ...theme);
  if (muiTheme) {
    providers.push(<ThemeProvider theme={muiTheme} />);
  }
  return providers.filter((x) => !!x);
};

export default function ContentModule( props ) {
  const contentType = props?.variant ? `${props.__typename}${props?.variant}` : props.__typename;
  const Component = mappings[contentType];
  const providers = React.useMemo(() => getProviders(props), [props]);
  // console.log('ContentModule: providers', providers);
  if (!Component) return null;
  return (
    <ContextComposer contexts={providers}>
      <Component {...props} />
    </ContextComposer>
  );
}
