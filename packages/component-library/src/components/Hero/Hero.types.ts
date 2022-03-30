import { MediaProps } from '../Media';
import { Breakpoint, SystemCssProperties } from '@mui/system';
import { Palette } from '@mui/material/styles';

import { RichText } from '../Text';

type Color = keyof Palette;

export interface HeroProps {
  id: string;
  __typename?: string;
  overline?: string;
  title?: string;
  subtitle?: string;
  body?: RichText;
  actions?: any[];
  /**
   * @deprecated use `images` instead
   */
  image?: MediaProps | MediaProps[];
  images?: MediaProps[];
  background?: MediaProps;
  backgroundColor?: Color | 'white' | 'black';
  contentWidth?: false | Breakpoint | undefined;
  contentHeight?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: any;
  theme?: any;
  styles?: {
    root?: SystemCssProperties;
    gridContainer?: SystemCssProperties & { spacing: any };
    gridItem?: SystemCssProperties & { xs: any; sm: any; md: any };
    gridItems?: Array<SystemCssProperties & { xs: any; sm: any; md: any }>;
  };
  sidekickLookup?: any;
  disableGutters?: boolean;
}

export interface HeroClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the mediaRoot element. */
  mediaRoot: string;
  /** Styles applied to the backgroundRoot element. */
  backgroundRoot: string;
  /** Styles applied to the actionsRoot element. */
  actionsRoot: string;
  /** Styles applied to the contentContainer element. */
  contentContainer: string;
  /** Styles applied to the root element when contentHeigh is sm. */
  contentHeightSM: string;
  /** Styles applied to the root element when contentHeigh is md. */
  contentHeightMD: string;
  /** Styles applied to the root element when contentHeigh is lg. */
  contentHeightLG: string;
  /** Styles applied to the root element when contentHeigh is xl. */
  contentHeightXL: string;
}

export declare type HeroClassKey = keyof HeroClasses;
declare const accordionClasses: HeroClasses;
export default accordionClasses;
