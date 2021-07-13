/* eslint-disable react/prop-types */
import React, { createContext, useContext } from 'react';

const ContentModuleContext = createContext({});

interface Props { 
  contentMapping: {
    [key:string]: React.ComponentType,
  },
  children: React.ReactElement
}
export const ContentModuleProvider = ({ contentMapping = {}, children }:Props) => (
  <ContentModuleContext.Provider value={contentMapping}>{children}</ContentModuleContext.Provider>
);

export const useContentModuleContext = () => useContext<{[key:string]: any}>(ContentModuleContext);

export default ContentModuleContext;
