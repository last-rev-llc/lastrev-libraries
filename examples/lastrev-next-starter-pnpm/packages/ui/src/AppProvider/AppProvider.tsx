import * as React from 'react';
import ThemeRegistry from '../ThemeRegistry/ThemeRegistry';
import { ContentModuleProvider } from '@last-rev/component-library/dist/components/ContentModule/ContentModuleContext';
import contentMapping from '../contentMapping';

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
