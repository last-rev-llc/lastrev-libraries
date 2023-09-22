/* eslint-disable react/jsx-props-no-spreading */
'use client';
import React from 'react';
import { useContentModuleContext } from './ContentModuleContext';
import { ContentModuleProps } from './ContentModule.types';

function ContentModule({ __typename, theme, ...fields }: ContentModuleProps) {
  const contentMapping = useContentModuleContext();
  const contentType =
    fields?.variant && contentMapping[`${__typename}:${fields?.variant}`]
      ? `${__typename}:${fields?.variant}`
      : __typename;

  const Main = React.useMemo(
    () => (contentType ? contentMapping[contentType] : null),
    [contentType, contentMapping, __typename, fields?.variant]
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

  return <Main {...fields} />;
}

export default ContentModule;
