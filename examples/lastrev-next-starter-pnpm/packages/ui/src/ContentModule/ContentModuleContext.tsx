/* eslint-disable react/prop-types */
'use client';
import React, { createContext, useContext } from 'react';
import contentMapping from '../contentMapping';

const ContentModuleContext = createContext({});

interface Props {
  // contentMapping: {
  //   [key: string]: React.ComponentType;
  // };
  children: React.ReactElement;
}
export const ContentModuleProvider = ({ children }: Props) => (
  <ContentModuleContext.Provider value={contentMapping}>{children}</ContentModuleContext.Provider>
);

export const useContentModuleContext = () => useContext<{ [key: string]: any }>(ContentModuleContext);

export default ContentModuleContext;
