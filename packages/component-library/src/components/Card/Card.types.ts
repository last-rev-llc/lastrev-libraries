import { CardProps as MuiCardProps } from '@mui/material';
import { RichText } from '../Text';
import { MediaProps } from '../Media';
import { LinkProps } from '../Link';

export interface CardProps extends Omit<MuiCardProps, 'variant'> {
  variant?: string;
  __typename?: string;
  /** The loading state of the card. */
  loading?: boolean;
  /** The title of the card. */
  title?: string;
  /** The subtitle of the card. */
  subtitle?: string;
  /** The main Media of the card. */
  media?: MediaProps | MediaProps[];
  /** The main rich text content of the card. */
  body?: RichText;
  /** The link of the card. */
  link?: LinkProps;
  /** The link actions of the card. */
  actions?: LinkProps[];
  /** The tags of the card. */
  tags?: LinkProps[];
  /** Sidekick lookup. */
  sidekickLookup?: any;
}

export interface CardClasses {
  /** Styles applied to the Root for the Card element. */
  root: string;
  /** Styles applied to the Link for the Card element. */
  link: string;
  /** Styles applied to the MediaRoot for the Card element. */
  mediaRoot: string;
  /** Styles applied to the Media ContentModule for the Card element. */
  media: string;
  /** Styles applied to the Media Skeleton for the Card element. */
  mediaSkeleton: string;
  /** Styles applied to the Root of the Tags for the Card element. */
  tags: string;
  /** Styles applied to the Chip/Tag Element for the Card element. */
  chip: string;
  /** Styles applied to the CardTagRoot ContentModule for the Card element. */
  tagRoot: string;
  /** Styles applied to the CardContent for the Card element. */
  content: string;
  /** Styles applied to the Typography of the title text for the Card element. */
  title: string;
  /** Styles applied to the Typography of the subtitle text for the Card element. */
  subtitle: string;
  /** Styles applied to the Text of the body for the Card element. */
  body: string;
  /** Styles applied to the CardActions for the Card element. */
  actions: string;
  /** Styles applied to the ButtonHero for the Card element. */
  button: string;
  /** Styles applied to the Skeleton of the title text for the Card element. */
  titleSkeleton: string;
  /** Styles applied to the Skeleton of the subtitle text for the Card element. */
  subtitleSkeleton: string;
  /** Styles applied to the Skeleton of the body text for the Card element. */
  textSkeleton: string;
  /** Styles applied to the Skeleton of the CardActions for the Card element. */
  actionsSkeleton: string;
}

export declare type CardClassKey = keyof CardClasses;
declare const accordionClasses: CardClasses;
export default accordionClasses;
