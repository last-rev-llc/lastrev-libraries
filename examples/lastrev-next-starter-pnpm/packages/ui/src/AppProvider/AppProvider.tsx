'use client';
import * as React from 'react';
import ThemeRegistry from '../ThemeRegistry/ThemeRegistry';

import contentMapping from '../contentMapping';
import { ContentModuleProvider } from '../ContentModule/ContentModuleProvider';

export const AppProvider = ({ children }: { children: any }) => {
  return (
    <>
      <ThemeRegistry>
        <ContentModuleProvider contentMapping={contentMapping}>{children}</ContentModuleProvider>
      </ThemeRegistry>
    </>
  );
};

export default AppProvider;
