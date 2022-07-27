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
  /** Styles applied to the Root for the Hero element. */
  root: string;
  /** Styles applied to the BackgroundRoot for the Hero element. */
  backgroundRoot: string;
  /** Styles applied to the BackgroundMedia ContentModule for the Hero element. */
  backgroundMedia: string;
  /** Styles applied to the ContentContainer for the Hero element.. */
  contentContainer: string;
  /** Styles applied to the ContentRoot for the Hero element. */
  contentRoot: string;
  /** Styles applied to the TextsContainer for the Hero element. */
  textsContainer: string;
  /** Styles applied to the TextsRoot for the Hero element. */
  textsRoot: string;
  /** Styles applied to the Typography of the overline text for the Hero element. */
  overlineHero: string;
  /** Styles applied to the Typography of the title text the for the Hero element. */
  titleHero: string;
  /** Styles applied to the Typography of the subtitle text the for the Hero element. */
  SubtitleHero: string;
  /** Styles applied to the Text of the body for the Hero element. */
  bodyHero: string;
  /** Styles applied to the ActionsRoot for the Hero element. */
  actionsRoot: string;
  /** Styles applied to the ButtonHero for the Hero element. */
  ButtonHero: string;
  /** Styles applied to the mediaRoot for the Hero element. */
  mediaRoot: string;
  /** Styles applied to the MediaHero ContentModule for the Hero element. */
  mediaHero: string;
  /** Styles applied to the MediaDivider for the Hero element. */
  mediaDivider: string;
  /** Styles applied to the root element when contentHeigh is sm for the Hero element.*/
  contentHeightSM: string;
  /** Styles applied to the root element when contentHeigh is md for the Hero element. */
  contentHeightMD: string;
  /** Styles applied to the root element when contentHeigh is lg for the Hero element. */
  contentHeightLG: string;
  /** Styles applied to the root element when contentHeigh is xl for the Hero element. */
  contentHeightXL: string;
}

export declare type HeroClassKey = keyof HeroClasses;
declare const accordionClasses: HeroClasses;
export default accordionClasses;
