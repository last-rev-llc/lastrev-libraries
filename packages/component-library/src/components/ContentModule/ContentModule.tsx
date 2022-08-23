/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useContentModuleContext } from './ContentModuleContext';
import { ContentModuleProps } from './ContentModule.types';
import ContentThemeProvider from '../ContentThemeProvider';

function ContentModule({ __typename, theme, ...fields }: ContentModuleProps) {
  if (!__typename) return null;
  const contentMapping = useContentModuleContext();
  const contentType =
    fields?.variant && contentMapping[`${__typename}:${fields?.variant}`]
      ? `${__typename}:${fields?.variant}`
      : __typename;
  const Main = React.useMemo(() => contentMapping[contentType], [contentType, __typename, fields?.variant]);

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
    <ContentThemeProvider theme={theme} {...fields}>
      <Main {...fields} />
    </ContentThemeProvider>
  );
}

export default ContentModule;
