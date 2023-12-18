import * as React from 'react';
import ThemeRegistry from '../ThemeRegistry/ThemeRegistry';

// import { ContentModuleProvider } from '../ContentModule/ContentModuleContext';

// This appears to have a requirements to be a named export
export const AppProvider = ({ children }: { children: any }) => {
  return (
    <>
      <ThemeRegistry>
        {/* <ContentModuleProvider> */}
        {children}
        {/* </ContentModuleProvider> */}
      </ThemeRegistry>
    </>
  );
};

export default AppProvider;
