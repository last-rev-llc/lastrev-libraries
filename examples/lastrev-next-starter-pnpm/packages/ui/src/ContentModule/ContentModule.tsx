/* eslint-disable react/jsx-props-no-spreading */
'use client';
import React, { useMemo } from 'react';
import { useContentModuleContext } from './ContentModuleContext';
import type { ContentModuleProps } from './ContentModule.types';
import ErrorBoundary from '../ErrorBoundary';
import { css } from '@mui/material/styles';

const getComponentForContentType = (
  contentType: string,
  contentMapping: { [x: string]: any; hasOwnProperty?: any }
) => {
  // Try regex match for keys in contentMapping
  for (const key in contentMapping) {
    if (new RegExp(`^${key}$`).test(contentType)) {
      return contentMapping[key];
    }
  }

  // Check if the contentMapping has the key directly
  if (contentMapping.hasOwnProperty(contentType)) {
    return contentMapping[contentType];
  }

  return null;
};

const ContentModule = React.forwardRef(function ContentModule(
  { __typename, theme, ...fields }: ContentModuleProps,
  ref: any
) {
  const contentMapping = useContentModuleContext();

  const contentMappingKey =
    fields?.variant && getComponentForContentType(`${__typename}:${fields?.variant}`, contentMapping)
      ? `${__typename}:${fields?.variant}`
      : __typename;

  const Main = useMemo(
    () => contentMappingKey && getComponentForContentType(contentMappingKey, contentMapping),
    [contentMappingKey, contentMapping]
  );

  if (!Main) {
    console.info(
      `Did not find mapping for Content Type "${__typename}"${
        fields?.variant ? ` with a variant "${fields?.variant}"` : ``
      }. Please add a mapping in the ContentModuleProvider`
    );
    return null;
  }

  Main.displayName = `Content_${contentMappingKey}`;

  const StyleTag = ({ styles }) => <style dangerouslySetInnerHTML={{ __html: styles }} />;

  // console.log('--', fields.title, fields.backgroundColor);

  return (
    <ErrorBoundary>
      <Main {...fields} ref={ref} />
    </ErrorBoundary>
  );
});

export default ContentModule;
