import { MediaProps } from '../Media';
import { Breakpoint, SystemCssProperties } from '@mui/system';
import { Palette } from '@mui/material/styles';

import { RichText } from '../Text';

type Color = keyof Palette;

export interface HeroProps {
  variant?: any;
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
  divider?: MediaProps;
  contentWidth?: false | Breakpoint | undefined;
  contentHeight?: 'sm' | 'md' | 'lg' | 'xl';
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
  /** Styles applied to the Root element. */
  root: string;
  /** Styles applied to the BackgroundRoot element. */
  backgroundRoot: string;
  /** Styles applied to the BackgroundMedia ContentModule element. */
  backgroundMedia: string;
  /** Styles applied to the ContentContainer element.. */
  contentContainer: string;
  /** Styles applied to the ContentRoot element. */
  contentRoot: string;
  /** Styles applied to the TextsContainer element. */
  textsContainer: string;
  /** Styles applied to the TextsRoot element. */
  textsRoot: string;
  /** Styles applied to the Typography of the overline text element. */
  overlineHero: string;
  /** Styles applied to the Typography of the title text the element. */
  titleHero: string;
  /** Styles applied to the Typography of the subtitle text the element. */
  subtitleHero: string;
  /** Styles applied to the Text of the body element. */
  bodyHero: string;
  /** Styles applied to the ActionsRoot element. */
  actionsRoot: string;
  /** Styles applied to the ButtonHero element. */
  buttonHero: string;
  /** Styles applied to the mediaRoot element. */
  mediaRoot: string;
  /** Styles applied to the MediaHero ContentModule element. */
  mediaHero: string;
  /** Styles applied to the MediaDivider element. */
  mediaDivider: string;
  /** Styles applied to the root element when contentHeigh is sm element.*/
  contentHeightSM: string;
  /** Styles applied to the root element when contentHeigh is md element. */
  contentHeightMD: string;
  /** Styles applied to the root element when contentHeigh is lg element. */
  contentHeightLG: string;
  /** Styles applied to the root element when contentHeigh is xl element. */
  contentHeightXL: string;
}

export declare type HeroClassKey = keyof HeroClasses;
declare const heroClasses: HeroClasses;
export default heroClasses;
