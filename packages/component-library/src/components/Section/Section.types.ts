import { Breakpoint } from '@mui/material';
import { MediaProps } from '../Media';
import { TextProps } from '../Text';

export interface SectionProps {
  __typename?: string;
  introText?: TextProps;
  contents?: Array<{ __typename?: string; id?: string; file?: any }>;
  background?: MediaProps;
  backgroundColor?: string;
  variant?: string;
  testId?: string;
  contentWidth?: false | Breakpoint | undefined;
  contentDirection?: 'row' | 'column' | undefined;
  contentSpacing?: number;
  // Enables exposing inner `sx` prop through content
  styles?: {
    root?: any;
    gridContainer?: any & { spacing: any };
    gridItem?: any & { xs: any; sm: any; md: any };
    gridItems?: Array<any & { xs: any; sm: any; md: any }>;
  };
  sidekickLookup?: any;
}

export interface SectionClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the contentContainer element. */
  contentContainer: string;
  /** Styles applied to the backgroundImage element. */
  backgroundImage: string;
  /** Styles applied to the gridContainer element. */
  gridContainer: string;
  /** Styles applied to every gridItem element. */
  gridItem: string;
  /** Styles applied to the introText element. */
  introText: string;
  /** Styles applied to the content element. */
  content: string;
}

export declare type SectionClassKey = keyof SectionClasses;
declare const accordionClasses: SectionClasses;
export default accordionClasses;
