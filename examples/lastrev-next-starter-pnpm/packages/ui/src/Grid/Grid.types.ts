import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

export interface GridProps {
  children: React.ReactNode;
  overrideNested?: boolean;
}

interface GridClasses {
  root: string;
}

export declare type GridClassKey = keyof GridClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Grid: GridClassKey;
  }

  export interface ComponentsPropsList {
    Grid: GridProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    Grid?: {
      defaultProps?: ComponentsProps['Grid'];
      styleOverrides?: ComponentsOverrides<Theme>['Grid'];
      variants?: ComponentsVariants['Grid'];
    };
  }
}
